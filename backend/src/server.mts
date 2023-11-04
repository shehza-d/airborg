import express from "express";
import { PORT } from "./config/index.js";
import { middlewareRouter } from "./middleware/index.mjs";
import { linksRouter } from "./routes/index.js";

const app = express();
const version = "/api/v1";

app.use(version, middlewareRouter);
app.use(version, linksRouter);

app.get("/testing", (req, res) => res.send("Airborg server testing"));

// app.get("/", express.static(path.join(__dirname, "./public/index.html")));
app.use((req, res) => res.send("No route matched"));

app.listen(PORT, () => console.log(`app listening on ===>>> ${PORT}`));

// import path from "path";
// const __dirname = path.resolve();
