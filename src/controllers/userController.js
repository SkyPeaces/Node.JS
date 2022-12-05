import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let { email, password } = req.body;
  // console.log(`email: ${email}, password: ${password}`);
  if (!email || !password) {
    return res.status(500).json({
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
    return res.status(500).json({
      errCode: constants.errCodeException,
      errMsg: `${constants.errMsgException} ${error}`,
    });
  }
};

let getUserById = async (req, res) => {
  try {
    let results = await userService.getUserById(req.body.id);
    return res.status(results.service).json({
      errCode: results.errCode,
      errMsg: results.errMsg,
      user: results.user,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: constants.errCodeException,
      errMsg: `${constants.errMsgException} ${error}`,
    });
  }
};

export default {
  handleLogin,
  getUserById,
};
