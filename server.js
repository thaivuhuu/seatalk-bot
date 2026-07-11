const express = require("express");

const api = require("./routes/api");

const app = express();

app.use(express.json());

app.use("/", api);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
