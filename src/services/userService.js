import db from "../models/index";
import bcrypt from "bcryptjs";
import constants from "../configs/constants";

let salt = bcrypt.genSaltSync(10);

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
        if (userId && userId !== "undefined") {
            console.log("userId: ", userId);
            try {
                let userDB = await db.User.findOne({
                    attributes: { exclude: ["password"] },
                    where: {
                        id: userId,
                    },
                    raw: true,
                });
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeSuccess;
                results.errMsg = constants.errMsgSuccess;
                results.user = userDB ? userDB : {};
            } catch (error) {
                results.service = constants.serviceFail;
                results.errCode = constants.errCodeException;
                results.errMsg = `${constants.errMsgException} ${error}`;
            }
        } else {
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
                results.service = constants.serviceFail;
                results.errCode = constants.errCodeException;
                results.errMsg = `${constants.errMsgException} ${error}`;
            }
        }
        resolve(results);
    });
};

let delUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        let results = {};
        if (userId) {
            try {
                await db.User.destroy({
                    where: {
                        id: userId,
                    },
                    raw: true,
                });
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeSuccess;
                results.errMsg = constants.errMsgSuccess;
            } catch (error) {
                results.service = constants.serviceFail;
                results.errCode = constants.errCodeException;
                results.errMsg = `${constants.errMsgException} ${error}`;
            }
        } else {
            results.service = constants.serviceFail;
            results.errCode = constants.errCodeException;
            results.errMsg = `${constants.errMsgException} ${error}`;
        }
        resolve(results);
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let results = {};
        try {
            await db.User.update(
                {
                    email: data.email,
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
            results.service = constants.serviceSuccess;
            results.errCode = constants.errCodeSuccess;
            results.errMsg = constants.errMsgSuccess;
        } catch (error) {
            results.service = constants.serviceFail;
            results.errCode = constants.errCodeException;
            results.errMsg = `${constants.errMsgException} ${error}`;
        }
        resolve(results);
    });
};

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let results = {};
        try {
            let passWordHash = bcrypt.hashSync(data.password, salt);
            let [user, created] = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    password: passWordHash,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.positionId,
                },
            });
            if (created) {
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeSuccess;
                results.errMsg = constants.errMsgSuccess;
            } else {
                results.service = constants.serviceFail;
                results.errCode = constants.errCodeExisted;
                results.errMsg = constants.errMsgExisted;
            }
        } catch (error) {
            results.service = constants.serviceFail;
            results.errCode = constants.errCodeException;
            results.errMsg = `${constants.errMsgException} ${error}`;
        }
        resolve(results);
    });
};

export default {
    handleLogin,
    getUserById,
    delUserById,
    updateUser,
    createUser,
};
