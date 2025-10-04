import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use("/files", express.static("public"));

// JSON endpoint for metadata
app.get("/api/bottled-messages", (req, res) => {
    const data = JSON.parse(fs.readFileSync("./data/bottled-messages.json", "utf8"));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});