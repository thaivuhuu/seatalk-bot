const express = require("express");

const router = express.Router();

router.post("/callback", (req, res) => {

    console.log("SeaTalk Callback:");
    console.log(req.body);

    // Connection Verification
    if (req.body.challenge) {
        return res.json({
            challenge: req.body.challenge
        });
    }

    // Tạm thời chỉ trả OK
    res.json({
        success: true
    });

});

module.exports = router;
