import bcrypt from 'bcryptjs';
// eslint-disable-next-line
import db from "../models";
import User from '../models/User';
import {
  userInfos,
  signRefreshToken,
  signToken,
  sendCookies
} from '../utils/jwt';

export const createUser = async (req, res, next) => {
  try {
    const today = new Date();
    const { body } = req;

    const userData = {
      username: body.username,
      email: body.email,
      password: body.password,
      created: today
    };

    const checkIfUserExists = await User.findOne({
      where: { email: userData.email }
    });

    if (checkIfUserExists) {
      res.status(400);
      const err = new Error('User with given email already exists');
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
        refreshToken
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
        email: body.email
      }
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
          refreshToken
        });
      }
    } else {
      res.status(400);
      const err = new Error('No user found with the given email address');
      return next(err);
    }
    // eslint-disable-next-line
    return;
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { email } = req.user;

    const uuidr = req.cookies.uuidr || req.query.uuidr;

    const user = await User.findOne({ where: { email } });

    if (uuidr === user.refreshToken) {
      const token = signToken(user);

      const ress = await sendCookies(res, false, true, token, null);

      const userInfo = userInfos(user);

      return ress.json({ token, user: userInfo });
    }
    return res.status(401).send({
      msg: "Your Refresh Token doesn't match our records!"
    });
  } catch (error) {
    return next(error);
  }
};
