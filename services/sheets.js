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

    if (rows.length === 0) return [];

    const headers = rows[0];

    return rows.slice(1).map(row => {

        const obj = {};

        headers.forEach((header, index) => {

            obj[header] = row[index] || "";

        });

        return obj;

    });

}

module.exports = {
    getVehicles
};
