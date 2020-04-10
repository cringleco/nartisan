import bcrypt from "bcryptjs";
// eslint-disable-next-line
import db from "../models";
const User = db.User;
import {
  userInfos,
  signRefreshToken,
  signToken,
  sendCookies,
  signTokenMobile,
} from "../utils/jwt";

export const createUser = async (req, res, next) => {
  try {
    const today = new Date();
    const { body } = req;

    const userData = {
      username: body.username,
      email: body.email,
      password: body.password,
      created: today,
    };

    const checkIfUserExists = await User.findOne({
      where: { email: userData.email },
    });

    if (checkIfUserExists) {
      res.status(400);
      const err = new Error("User with given email already exists");
      next(err);
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      userData.password = hash;
      const user = await User.create(userData);
      const userInfo = userInfos(user);
      const refreshToken = await signRefreshToken(user);
      const token = await signToken(user);

      await user.update({ refreshToken });

      const response = await sendCookies(
        res,
        false,
        false,
        token,
        refreshToken
      );

      response.json({
        user: userInfo,
        isLogged: true,
        token,
        refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (bcrypt.compareSync(body.password, user.password)) {
        const userInfo = userInfos(user);
        const token = await signToken(user);
        const refreshToken = await signRefreshToken(user);
        await user.update({ refreshToken });
        const response = await sendCookies(
          res,
          false,
          false,
          token,
          refreshToken
        );
        return response.json({
          user: userInfo,
          isLogged: true,
          token,
          refreshToken,
        });
      }
    } else {
      res.status(400);
      const err = new Error("No user found with the given email address");
      return next(err);
    }
    // eslint-disable-next-line
    return;
  } catch (error) {
    return next(error);
  }
};

export const loginMobile = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      if (bcrypt.compareSync(body.password, user.password)) {
        const userInfo = userInfos(user);
        const token = await signTokenMobile(user);

        return res.json({
          user: userInfo,
          isLogged: true,
          token,
        });
      }
    } else {
      res.status(400);
      const err = new Error("No user found with the given email address");
      return next(err);
    }
    // eslint-disable-next-line
    return;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ where: { email } });

    if (req.token == user.refreshToken) {
      const token = signToken(user);
      const tokenstamp = new Date(Date.now() + 900000);
      const domain =
        process.env.NODE_ENV == "production"
          ? process.env.DOMAIN_FOR_COOKIES
          : "localhost";
      const secure = process.env.NODE_ENV == "production" ? true : false;

      res.cookie("uuidt", token, {
        expires: tokenstamp,
        secure,
        domain,
        httpOnly: true,
      });

      const userInfo = userInfos(user);

      return res.json({ token, user: userInfo });
    } else {
      return res.status(401).send({
        msg: "Your Refresh Token doesn't match our records!",
      });
    }
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ where: { email } });

    await user.update({ refreshToken: null });

    const ress = await sendCookies(res, true, false, null, null);

    return ress.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
