const { google, auth } = require("../config/google");

const spreadsheetId = process.env.SPREADSHEET_ID;

async function getVehicles() {

    const client = await auth.getClient();

    const sheets = google.sheets({
        version: "v4",
        auth: client
    });

    const result = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Adsun"
    });

    const rows = result.data.values || [];

    if (rows.length <= 1) return [];

    return rows.slice(1).map(r => ({

        plate: r[0] || "",
        driver: r[1] || "",

        lat: Number(r[2]) || 0,
        lng: Number(r[3]) || 0,

        speed: Number(r[4]) || 0,

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

module.exports = {
    getVehicles
};


async function findVehicle(plate) {

    const rows = await getRows();

    return rows.find(r =>
        r.plate.replace(/\s/g, "").toUpperCase() ===
        plate.replace(/\s/g, "").toUpperCase()
    );

}

module.exports = {
    getRows,
    findVehicle
};
