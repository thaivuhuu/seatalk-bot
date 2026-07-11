const express = require("express");

const api = require("./routes/api");
const callback = require("./routes/callback");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", api);
app.use("/", callback);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
