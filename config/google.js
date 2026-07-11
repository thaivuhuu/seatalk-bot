const { google } = require("googleapis");

if (!process.env.GOOGLE_CREDENTIALS) {
  throw new Error("Missing GOOGLE_CREDENTIALS environment variable");
}

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

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
