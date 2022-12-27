import * as jwt from "jsonwebtoken";
import constants from "../configs/constants";

const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

require("dotenv").config();
const config = process.env;

const refreshToken = async (req, res, next) => {};

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    // const token = req.cookies.accessToken;

    try {
        const decoded = await verify(token, config.ACCESS_TOKEN_SECRET);
        req.jwtDecoded = decoded;
    } catch (err) {
        return res.status("401").json({
            errCode: constants.errCodeTokenExpired,
            errMsg: constants.errMsgTokenExpired,
            isLoggedIn: false,
        });
    }
    return next();
};

const generateToken = async (payload) => {
    try {
        return await sign(
            {
                payload,
            },
            config.ACCESS_TOKEN_SECRET,
            {
                algorithm: "HS256",
                expiresIn: config.ACCESS_TOKEN_LIFE,
            }
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

export default {
    verifyToken,
    generateToken,
    refreshToken,
};
