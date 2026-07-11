const express = require("express");

const router = express.Router();

router.post("/callback", (req, res) => {

    console.log("SeaTalk Callback:");
    console.log(JSON.stringify(req.body, null, 2));

    const challenge =
        req.body?.event?.seatalk_challenge ||
        req.body?.seatalk_challenge;

    if (challenge) {

        return res.json({
            seatalk_challenge: challenge
        });

    }

    return res.json({
        success: true
    });

});

module.exports = router;
