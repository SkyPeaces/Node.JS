import db from "../models/index";
import bcrypt from "bcryptjs";

let salt = bcrypt.genSaltSync(10);

let getUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findOne({
        where: {
          id: req.id,
        },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let passWordHash = bcrypt.hashSync(data.password, salt);
      await db.User.create({
        email: data.email,
        password: passWordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.sex,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
        positionId: data.positionId,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: {
          id: data.id,
        },
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let passWordHash = bcrypt.hashSync(data.password, salt);
      await db.User.update(
        {
          email: data.email,
          // password: passWordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.sex,
          roleId: data.roleId,
          phoneNumber: data.phoneNumber,
          positionId: data.positionId,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let handleLogin = () => {};

export default {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getDetailUser,
  handleLogin,
};
