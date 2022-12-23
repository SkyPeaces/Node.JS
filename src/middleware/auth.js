import * as jwt from "jsonwebtoken";

const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

require("dotenv").config();
const config = process.env;

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = await verify(token, config.ACCESS_TOKEN_SECRET);
        req.jwtDecoded = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
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
};
