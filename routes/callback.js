const express = require("express");
const router = express.Router();

const { sendGroupMessage } = require("../services/seatalk");


router.post("/callback", async (req, res) => {

    try {

        console.log(
            JSON.stringify(req.body,null,2)
        );


        const eventType =
            req.body.event_type;


        if(
            eventType === 
            "new_mentioned_message_received_from_group_chat"
        ){

            const event =
                req.body.event;


            const groupId =
                event.group.group_id;


            const messageId =
                event.message.message_id;


            let text =
                event.message.text.plain_text || "";


            text =
                text.replace(
                    /@\w+/,
                    ""
                ).trim();



            const reply =
`🚚 THÔNG TIN XE

Biển số: ${text}

Trạng thái: RUNNING
Động cơ: ON
GPS: OK
Địa chỉ:
Đang test reply thread`;



            await sendGroupMessage(
                groupId,
                reply,
                messageId
            );

        }


        res.sendStatus(200);


    }
    catch(error){

        console.error(error);

        res.sendStatus(500);

    }

});


module.exports = router;
