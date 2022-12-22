import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import db from "./models/index";
import cors from "cors";

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// const corsOptions = {
//     origin: process.env.URL_REACT,
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);

db.connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
