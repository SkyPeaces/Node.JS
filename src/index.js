import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import db from "./models/index";
import cors from "cors";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     next();
// });
const corsOptions = {
    origin: process.env.URL_REACT,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoute(app);

db.connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
