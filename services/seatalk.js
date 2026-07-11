const axios = require("axios");


let accessToken = null;



async function getAccessToken(){

    // giữ nguyên code lấy token của bạn
    // phần này không cần đổi

}



async function sendGroupMessage(
    groupId,
    text,
    quotedMessageId = null
){

    if(!accessToken){

        accessToken =
            await getAccessToken();

    }


    const payload = {

        group_id: groupId,

        message: {

            tag: "text",

            text: {

                content: text

            }

        }

    };



    /**
     * Reply trong thread
     */
    if(quotedMessageId){

        payload.message.quoted_message_id =
            quotedMessageId;

    }



    console.log(
        "SEND MESSAGE:",
        JSON.stringify(payload,null,2)
    );



    const response =
        await axios.post(

            "https://openapi.seatalk.io/messaging/v2/group_chat",

            payload,

            {

                headers: {

                    Authorization:
                    `Bearer ${accessToken}`,

                    "Content-Type":
                    "application/json"

                }

            }

        );



    return response.data;

}



module.exports = {

    sendGroupMessage,
    getAccessToken

};
