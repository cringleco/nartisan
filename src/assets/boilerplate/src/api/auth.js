import express from "express";

import { validateRegister } from "../validators/authValidators";
import hasRefreshToken from "../middlewares/hasRefreshToken";
import {
  createUser,
  loginUser,
  refreshToken,
  loginApp,
  logout,
} from "../controllers/AuthController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hello: "Hi from auth" });
});

router.post("/register", validateRegister, createUser);

router.post("/login", loginUser);

router.post("/login/app", loginApp);

router.post("/refresh", hasRefreshToken, refreshToken);

router.post("/logout", hasRefreshToken, logout);

module.exports = router;
