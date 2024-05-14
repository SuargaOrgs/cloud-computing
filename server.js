const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const isProduction = process.env.NODE_ENV === "production";

app.get("/", (_req, res) => {
    res.status(200).json({ message: "This Api for Suarga App" });
});

app.get("*", (_req, res) => {
	res.status(404).send("Not found");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});