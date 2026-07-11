const { google, auth } = require("../config/google");

const spreadsheetId = process.env.SPREADSHEET_ID;

async function getRows() {

    const client = await auth.getClient();

    const sheets = google.sheets({
        version: "v4",
        auth: client
    });

    const result = await sheets.spreadsheets.values.get({

        spreadsheetId,

        range: "Adsun"

    });

    return result.data.values || [];

}

module.exports = {

    getRows

};
