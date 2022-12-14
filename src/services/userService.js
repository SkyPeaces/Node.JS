import db from "../models";
import bcrypt from "bcryptjs";
import constants from "../configs/constants";
import authMethod from "../middleware/auth";
// import db from "../middleware/auth";
import randToken from "rand-token";

let salt = bcrypt.genSaltSync(10);

let handleLogin = (_user) => {
    return new Promise(async (resolve, reject) => {
        // console.log(`email: ${user.email}, password: ${user.password}`);
        let results = {};
        try {
            let userDB = await db.User.findOne({
                where: {
                    email: _user.email,
                },
            });
            if (userDB) {
                let check = await bcrypt.compareSync(_user.password, userDB.password);
                const accessToken = await authMethod.generateToken({ username: _user.email });
                if (check && accessToken) {
                    // await authMethod.generateToken({ username: _user.email });
                    // if (!accessToken) {
                    //     return res.status(401).send("Đăng nhập không thành công, vui lòng thử lại.");
                    // }
                    // let refreshToken = randToken.generate(100); // tạo 1 refresh token ngẫu nhiên
                    // if (!user.refreshToken) {
                    //     // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
                    //     await userModel.updateRefreshToken(user.username, refreshToken);
                    // } else {
                    //     // Nếu user này đã có refresh token thì lấy refresh token đó từ database
                    //     refreshToken = user.refreshToken;
                    // }

                    // return res.json({
                    //     msg: "Đăng nhập thành công.",
                    //     accessToken,
                    //     refreshToken,
                    //     user,
                    // });

                    results.service = constants.serviceSuccess;
                    results.errCode = constants.errCodeSuccess;
                    results.errMsg = constants.errMsgSuccess;
                    results.isLoggedIn = true;
                    results.accessToken = accessToken;
                    delete userDB.password;
                    results.user = userDB;
                } else {
                    results.service = constants.serviceSuccess;
                    results.errCode = "02";
                    results.errMsg = "Wrong email address or password";
                }
            } else {
                results.service = constants.serviceSuccess;
                results.errCode = "02";
                results.errMsg = "Email address or password is not found";
            }
        } catch (error) {
            results.service = constants.serviceSuccess;
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
            try {
                // let userDB = await db.User.findOne({
                //     attributes: { exclude: ["password"] },
                //     where: {
                //         id: userId,
                //     },
                //     raw: true,
                // });
                let userDB = await db.sequelize.query(`SELECT t1.*, @RankRow := @RankRow+ 1 AS rank FROM users t1 JOIN (SELECT @RankRow := 0) r WHERE t1.id = ${userId}`, {
                    model: db.User,
                    mapToModel: true,
                });
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeSuccess;
                results.errMsg = constants.errMsgSuccess;
                results.user = userDB ? userDB : {};
            } catch (error) {
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeException;
                results.errMsg = `${constants.errMsgException} ${error}`;
            }
        } else {
            try {
                // let userDB = await db.User.findAll({
                //     attributes: { exclude: ["password"] },
                //     raw: true,
                // });
                let userDB = await db.sequelize.query(`SELECT t1.*, @RankRow := @RankRow+ 1 AS rank FROM users t1 JOIN (SELECT @RankRow := 0) r`, {
                    model: db.User,
                    mapToModel: true,
                });
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeSuccess;
                results.errMsg = constants.errMsgSuccess;
                results.user = userDB ? userDB : {};
            } catch (error) {
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeException;
                results.errMsg = `${constants.errMsgException} ${error}`;
            }
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
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeExisted;
                results.errMsg = constants.errMsgExisted;
            }
        } catch (error) {
            results.service = constants.serviceSuccess;
            results.errCode = constants.errCodeException;
            results.errMsg = `${constants.errMsgException} ${error}`;
        }
        resolve(results);
    });
};

let delUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        let results = {};
        if (userId) {
            try {
                const res = await db.User.findByPk(userId);
                if (res === null) {
                    results.service = constants.serviceSuccess;
                    results.errCode = constants.errCodeNotExisted;
                    results.errMsg = constants.errMsgNotExisted;
                } else {
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
                        results.service = constants.serviceSuccess;
                        results.errCode = constants.errCodeException;
                        results.errMsg = `${constants.errMsgException} ${error}`;
                    }
                }
            } catch (error) {
                results.service = constants.serviceSuccess;
                results.errCode = constants.errCodeException;
                results.errMsg = `${constants.errMsgException} ${error}`;
            }
        } else {
            results.service = constants.serviceSuccess;
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
            results.service = constants.serviceSuccess;
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
