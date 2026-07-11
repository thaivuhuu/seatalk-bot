const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
});

const sheets = google.sheets({
    version: "v4",
    auth
});

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = "Adsun";

async function getRows() {

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAME
    });

    const values = res.data.values;

    if (!values || values.length < 2) {
        return [];
    }

    const rows = values.slice(1);

    return rows.map(r => ({
        plate: r[0] || "",
        driver: r[1] || "",
        lat: Number(r[2]) || 0,
        lng: Number(r[3]) || 0,
        speed: r[4] || "",
        engine: r[5] || "",
        status: r[6] || "",
        stopTime: r[7] || "",
        fuel: r[8] || "",
        group: r[9] || "",
        updateTime: r[10] || "",
        gps: r[11] || "",
        overspeed: r[12] || "",
        address: r[13] || ""
    }));

}

async function findVehicle(plate) {

    const rows = await getRows();

    plate = plate
        .replace(/\s/g, "")
        .toUpperCase();

    return rows.find(r =>
        r.plate.replace(/\s/g, "").toUpperCase() === plate
    );

}

module.exports = {
    getRows,
    findVehicle
};
