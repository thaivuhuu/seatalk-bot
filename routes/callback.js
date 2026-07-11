const express = require("express");
const router = express.Router();

const { sendGroupMessage } = require("../services/seatalk");
const { findVehicle } = require("../services/vehicle");


router.post("/callback", async (req, res) => {

    try {

        console.log("========== SEATALK CALLBACK ==========");
        console.log(JSON.stringify(req.body, null, 2));


        // SeaTalk challenge verify
        if (req.body.event?.seatalk_challenge) {

            return res.json({
                seatalk_challenge: req.body.event.seatalk_challenge
            });

        }


        const eventType = req.body.event_type;


        /**
         * User mention bot trong group
         */
        if (eventType === "new_mentioned_message_received_from_group_chat") {


            const event = req.body.event;


            const groupId =
                event.group.group_id;


            const messageId =
                event.message.message_id;


            let text =
                event.message.text.plain_text || "";


            console.log("GROUP:", groupId);
            console.log("MESSAGE ID:", messageId);
            console.log("TEXT:", text);



            // Remove bot mention
            text = text
                .replace(/@Transportation SW/gi, "")
                .trim();



            // Lấy biển số
            const plate =
                text
                .replace(/\s+/g, "")
                .toUpperCase();



            let reply;


            if (!plate) {

                reply =
`⚠️ Vui lòng nhập biển số xe

Ví dụ:
@Transportation SW 50H11201`;

            }
            else {


                const vehicle =
                    await findVehicle(plate);



                if (vehicle) {


                    reply =
`🚚 THÔNG TIN XE

Biển số: ${vehicle.plate}
Tài xế: ${vehicle.driver || "-"}
Nhóm: ${vehicle.group || "-"}
Trạng thái: ${vehicle.status || "-"}
Tốc độ: ${vehicle.speed || 0} km/h
Địa chỉ:
${vehicle.address || "-"}`;


                }
                else {


                    reply =
`❌ Không tìm thấy xe:

${plate}`;

                }

            }



            /**
             * Reply vào thread
             */
            await sendGroupMessage(
                groupId,
                reply,
                messageId
            );


        }


        res.sendStatus(200);


    }
    catch(error){

        console.error(
            "Callback error:",
            error
        );

        res.sendStatus(500);

    }

});


module.exports = router;
