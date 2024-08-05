const express = require("express");
const cors = require('cors');
const path = require("path");

const app = express();

app.use(cors({
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],  // Allow 'X-CSRF-Token' header
  }));

app.use("/router", express.static(path.resolve(__dirname, ".", "router")));
app.use("/views", express.static(path.resolve(__dirname, ".", "views")));
app.use("/style", express.static(path.resolve(__dirname, ".", "style")));
app.use("/script", express.static(path.resolve(__dirname, ".", "script")));
app.use("/images", express.static(path.resolve(__dirname, ".", "images")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,".", "index.html"));
});

app.listen(process.env.PORT || 8080 , () => console.log("server running ..."));