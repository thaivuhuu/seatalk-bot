const express = require("express");

const { sendGroupMessage } = require("../services/seatalk");
const { findVehicle } = require("../services/sheets");

const router = express.Router();

router.post("/callback", async (req, res) => {

    console.log("======================================");
    console.log("SeaTalk Callback");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("======================================");

    try {

        // Verify Callback
        const challenge = req.body?.event?.seatalk_challenge;

        if (challenge) {

            console.log("Verify Success");

            return res.json({
                seatalk_challenge: challenge
            });

        }

        // Khi Bot được @ trong Group
        if (
            req.body.event_type ===
            "new_mentioned_message_received_from_group_chat"
        ) {

            const groupId = req.body.event.group_id;

            const text =
                req.body.event.message.text.plain_text;

            console.log("========== VERSION 2 ==========");
            console.log("Message :", text);

            // Bỏ phần @Bot
            const plate = text
                .replace("@Transportation SW", "")
                .trim()
                .toUpperCase();

            console.log("Plate :", plate);

            const vehicle = await findVehicle(plate);

            if (!vehicle) {

                await sendGroupMessage(
                    groupId,
                    `❌ Không tìm thấy xe ${plate}`
                );

                return res.json({
                    success: true
                });

            }

            const reply =
`🚚 ${vehicle.plate}

👤 ${vehicle.driver}

🚦 Trạng thái : ${vehicle.status}
🔌 Động cơ : ${vehicle.engine}
🛰 GPS : ${vehicle.gps}

⏱ Dừng : ${vehicle.stopTime}

⛽ Nhiên liệu : ${vehicle.fuel}%

📍 ${vehicle.address}

🕒 Cập nhật : ${vehicle.updateTime}`;

            await sendGroupMessage(
                groupId,
                reply
            );

            console.log("Reply sent.");

        }

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

module.exports = router;
