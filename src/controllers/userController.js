import constants from "../configs/constants";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    // console.log(`email: ${email}, password: ${password}`);
    if (!email || !password) {
        return res.status(constants.serviceFail).json({
            errCode: "03",
            errMsg: `Email address or Password is not input`,
        });
    }
    try {
        let results = await userService.handleLogin(req.body);
        return res.status(results.service).json({
            errCode: results.errCode,
            errMsg: results.errMsg,
            user: results.user,
        });
    } catch (error) {
        return res.status(constants.serviceFail).json({
            errCode: constants.errCodeException,
            errMsg: `${constants.errMsgException} ${error}`,
        });
    }
};

let getUserById = async (req, res) => {
    let { id } = req.query;
    try {
        let results = await userService.getUserById(id);
        return res.status(results.service).json({
            errCode: results.errCode,
            errMsg: results.errMsg,
            user: results.user,
        });
    } catch (error) {
        return res.status(constants.serviceFail).json({
            errCode: constants.errCodeException,
            errMsg: `${constants.errMsgException} ${error}`,
        });
    }
};

let delUserById = async (req, res) => {
    let { id } = req.query;
    try {
        let results = await userService.delUserById(id);
        return res.status(results.service).json({
            errCode: results.errCode,
            errMsg: results.errMsg,
        });
    } catch (error) {
        return res.status(constants.serviceFail).json({
            errCode: constants.errCodeException,
            errMsg: `${constants.errMsgException} ${error}`,
        });
    }
};

let createUser = async (req, res) => {
    let user = req.body;
    try {
        let results = await userService.createUser(user);
        return res.status(results.service).json({
            errCode: results.errCode,
            errMsg: results.errMsg,
        });
    } catch (error) {
        return res.status(constants.serviceFail).json({
            errCode: constants.errCodeException,
            errMsg: `${constants.errMsgException} ${error}`,
        });
    }
};

let updateUser = async (req, res) => {
    let user = req.body;
    try {
        let results = await userService.updateUser(user);
        return res.status(results.service).json({
            errCode: results.errCode,
            errMsg: results.errMsg,
        });
    } catch (error) {
        return res.status(constants.serviceFail).json({
            errCode: constants.errCodeException,
            errMsg: `${constants.errMsgException} ${error}`,
        });
    }
};

export default {
    handleLogin,
    getUserById,
    delUserById,
    createUser,
    updateUser,
};
