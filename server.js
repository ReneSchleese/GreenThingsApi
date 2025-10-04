import express from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

function checkAuthentication(req, res, next) {
    const clientSecret = req.header("x-api-key");
    if (!clientSecret || clientSecret !== process.env.API_SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}

app.use("/api", checkAuthentication);
app.use("/files", checkAuthentication, express.static("public"));

app.get("/api/bottled-messages", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./data/bottled-messages.json", "utf8"));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});