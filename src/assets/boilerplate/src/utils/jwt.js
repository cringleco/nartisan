const jwt = require("jsonwebtoken");

const options = { expiresIn: "15min" };
const optionsMobile = { expiresIn: "999d" };
const refreshOptions = { expiresIn: "14d" };
const { SECRET_KEY, REFRESH_KEY } = require("../config").keys;

const userInfos = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
});

const signToken = (user) => {
  const userInfo = userInfos(user);
  const token = jwt.sign(userInfo, SECRET_KEY, options);
  return token;
};

const signTokenMobile = (user) => {
  const userInfo = userInfos(user);
  const token = jwt.sign(userInfo, SECRET_KEY, optionsMobile);
  return token;
};

const signRefreshToken = (user) => {
  const userInfo = userInfos(user);
  const token = jwt.sign(userInfo, REFRESH_KEY, refreshOptions);
  return token;
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      const verify = jwt.verify(token, SECRET_KEY);
      resolve(verify);
    } catch (error) {
      reject(error);
    }
  });

const verifyRefreshToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      const verify = jwt.verify(token, REFRESH_KEY);
      resolve(verify);
    } catch (error) {
      reject(error);
    }
  });

const sendCookies = (res, logout, refresh, accesstoken, refreshtoken) =>
  new Promise((resolve) => {
    const refreshstamp = new Date(Date.now() + 60 * 60 * 24 * 14 * 1000);
    const deletestamp = new Date(Date.now() - 900000);
    const tokenstamp = new Date(Date.now() + 900000);

    const token = logout ? null : accesstoken;
    const refreshToken = logout ? null : refreshtoken;
    const refreshexpires = logout ? deletestamp : refreshstamp;
    const tokenexpires = logout ? deletestamp : tokenstamp;
    const domain =
      process.env.NODE_ENV == "production"
        ? process.env.DOMAIN_FOR_COOKIES
        : "localhost";
    const secure = process.env.NODE_ENV == "production" ? true : false;

    res.cookie("uuidt", token, {
      expires: tokenexpires,
      secure,
      domain,
      httpOnly: true,
    });

    if (!refresh) {
      res.cookie("uuidr", refreshToken, {
        expires: refreshexpires,
        secure,
        domain,
        httpOnly: true,
      });
    }

    resolve(res);
  });

module.exports = {
  signToken,
  signRefreshToken,
  verifyToken,
  userInfos,
  verifyRefreshToken,
  sendCookies,
  signTokenMobile,
};
