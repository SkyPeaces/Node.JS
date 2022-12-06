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
  let userId = req.params.id;
  try {
    let results = await userService.getUserById(userId);
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
  try {
    let results = await userService.delUserById(userId);
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
};
