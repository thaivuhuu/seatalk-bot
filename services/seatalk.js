const axios = require("axios");


let token = "";
let expireTime = 0;



/**
 * Lấy SeaTalk App Access Token
 */
async function getAccessToken() {

    // Dùng lại token nếu còn hạn
    if (token && Date.now() < expireTime) {
        return token;
    }


    const res = await axios.post(
        "https://openapi.seatalk.io/auth/app_access_token",
        {
            app_id: process.env.SEATALK_APP_ID,
            app_secret: process.env.SEATALK_APP_SECRET
        }
    );


    token = res.data.app_access_token;


    // Trừ 60 giây để tránh token hết hạn trong lúc gửi message
    expireTime =
        Date.now() +
        (res.data.expire * 1000) -
        60000;


    return token;
}



/**
 * Gửi message vào Group Chat SeaTalk
 */
async function sendGroupMessage(groupId, text) {

    const accessToken = await getAccessToken();


    const res = await axios.post(
        "https://openapi.seatalk.io/messaging/v2/group_chat",
        {
            group_id: groupId,

            message: {
                tag: "text",

                text: {
                    format: 2,
                    content: text
                }
            }
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );


    return res.data;
}



module.exports = {
    getAccessToken,
    sendGroupMessage
};
