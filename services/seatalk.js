const axios = require("axios");

let token = "";
let expireTime = 0;

async function getAccessToken() {

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

    // hết hạn sau gần 2 giờ, trừ 60 giây dự phòng
    expireTime = Date.now() + (res.data.expire * 1000) - 60000;

    return token;

}

module.exports = {
    getAccessToken
};
