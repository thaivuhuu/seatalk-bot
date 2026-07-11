const express = require("express");
const { sendGroupMessage } = require("../services/seatalk");

const router = express.Router();

router.post("/callback", async (req, res) => {

    console.log("========================================");
    console.log("SeaTalk Callback");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("========================================");

    try {

        // ==================================================
        // 1. Verify Callback
        // ==================================================
        const challenge = req.body?.event?.seatalk_challenge;

        if (challenge) {

            console.log("Verify Success:", challenge);

            return res.json({
                seatalk_challenge: challenge
            });

        }

        // ==================================================
        // 2. Khi Bot được @ trong Group
        // ==================================================
        if (
            req.body.event_type ===
            "new_mentioned_message_received_from_group_chat"
        ) {

            const groupId = req.body.event.group_id;

            const senderId =
                req.body.event.message.sender.seatalk_id;

            const text =
                req.body.event.message.text.plain_text;

            console.log("========================================");
            console.log("Group ID :", groupId);
            console.log("Sender   :", senderId);
            console.log("Message  :", text);
            console.log("========================================");

            // Gửi tin nhắn trả lời
            await sendGroupMessage(
                groupId,
                "Xin chào! Tôi đã nhận được tin nhắn của bạn."
            );

            console.log("Reply sent.");

        }

        return res.json({
            success: true
        });

    } catch (err) {

        console.error("Callback Error:");
        console.error(err.response?.data || err.message);

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

module.exports = router;
