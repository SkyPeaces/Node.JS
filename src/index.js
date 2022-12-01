import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import connectDB from "./configs/connectDB";
// import initAPIRoute from "./route/api";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
// initAPIRoute(app);

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
