const { google } = require("googleapis");

const credentials = JSON.parse(
    process.env.GOOGLE_CREDENTIALS
);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly"
    ]
});

module.exports = {
    google,
    auth
};
