const express = require("express");

const { getRows } = require("../services/sheets");

const router = express.Router();

router.get("/", (req, res) => {

    res.send("Seatalk Bot");

});

router.get("/vehicles", async (req, res) => {

    try {

        const rows = await getRows();

        res.json(rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({

            error: err.message

        });

    }

});

module.exports = router;
