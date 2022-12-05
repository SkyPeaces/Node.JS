import db from "../models/index";
import bcrypt from "bcryptjs";
import constants from "../configs/constants";

let handleLogin = (user) => {
  return new Promise(async (resolve, reject) => {
    // console.log(`email: ${user.email}, password: ${user.password}`);
    let results = {};
    try {
      let userDB = await db.User.findOne({
        where: {
          email: user.email,
        },
        raw: true,
      });
      console.log(`userDB: ${userDB.password}`);
      if (userDB) {
        let check = await bcrypt.compareSync(user.password, userDB.password);
        if (check) {
          results.service = constants.serviceSuccess;
          results.errCode = constants.errCodeSuccess;
          results.errMsg = constants.errMsgSuccess;
          delete userDB.password;
          results.user = userDB;
        } else {
          results.service = constants.serviceFail;
          results.errCode = "02";
          results.errMsg = "Wrong email address or password";
        }
      } else {
        results.service = constants.serviceFail;
        results.errCode = "02";
        results.errMsg = "Email address or password is not found";
      }
    } catch (error) {
      results.errCode = constants.errCodeException;
      results.errMsg = `${constants.errMsgException} ${error}`;
    }
    resolve(results);
  });
};

let getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    let results = {};
    if (userId) {
      console.log(`id1: ${userId}`);
      try {
        let userDB = await db.User.findOne({
          // attributes: { exclude: ["password"] },
          where: {
            id: userId,
          },
          raw: true,
        });
        console.log(`user: ${userDB}`);
        results.service = constants.serviceSuccess;
        results.errCode = constants.errCodeSuccess;
        results.errMsg = constants.errMsgSuccess;
        results.user = userDB ? userDB : {};
      } catch (error) {
        results.errCode = constants.errCodeException;
        results.errMsg = `${constants.errMsgException} ${error}`;
      }
    } else {
      console.log(`id2: ${userId}`);
      try {
        let userDB = await db.User.findAll({
          attributes: { exclude: ["password"] },
          raw: true,
        });
        results.service = constants.serviceSuccess;
        results.errCode = constants.errCodeSuccess;
        results.errMsg = constants.errMsgSuccess;
        results.user = userDB ? userDB : {};
      } catch (error) {
        results.errCode = constants.errCodeException;
        results.errMsg = `${constants.errMsgException} ${error}`;
      }
    }
    resolve(results);
  });
};

export default {
  handleLogin,
  getUserById,
};
