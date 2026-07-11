const express = require("express");

const router = express.Router();

router.get("/callback", (req, res) => {
    res.send("Callback OK");
});

router.post("/callback", (req, res) => {

    console.log("========== SeaTalk Callback ==========");
    console.log("Headers:");
    console.log(req.headers);

    console.log("Body:");
    console.log(req.body);

    console.log("Query:");
    console.log(req.query);

    // Thử tất cả các trường challenge phổ biến
    const challenge =
        req.body.challenge ||
        req.body.seatalk_challenge ||
        req.query.challenge ||
        req.query.seatalk_challenge;

    if (challenge) {
        console.log("Verification:", challenge);

        return res.json({
            challenge: challenge,
            seatalk_challenge: challenge
        });
    }

    return res.json({
        success: true
    });
});

module.exports = router;
