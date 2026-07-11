const express = require("express");

const router = express.Router();

router.post("/callback", (req, res) => {

    console.log("================================");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("================================");

    // Verify
    const challenge = req.body?.event?.seatalk_challenge;

    if (challenge) {
        return res.json({
            seatalk_challenge: challenge
        });
    }

    res.json({
        success: true
    });

});

module.exports = router;
