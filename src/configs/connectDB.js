// import Sequelize from "sequelize";

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize("database", "username", "password", {
//   host: "localhost",
//   dialect: "mysql",
// });
// let connection = require("mysql2-promise")();

// // async function main() {
// //   try {
// // create the connection
// connection.configure({
//   host: "localhost",
//   user: "root",
//   database: "node.js",
// });
// //     console.log("Successfully connected to mySQL Database");
// //   } catch (err) {
// //     console.error(err);
// //   } finally {
// //     if (connection) {
// //       try {
// //         await connection.close();
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     }
// //   }
// // }

// export default connection;
const { Sequelize } = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../configs/config.json")[env];

// Option 3: Passing parameters separately (other dialects)
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// const sequelize = new Sequelize("khaxqjrl_root", "khaxqjrl_hoant", "", {
//   host: "103.97.126.21",
//   dialect: "mysql",
//   logging: false,
// });

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
