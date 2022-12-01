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

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("node.js", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
