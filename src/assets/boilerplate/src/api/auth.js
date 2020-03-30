import express from "express";
import { validateRegister } from "../validators/authValidators";
import {
  createUser,
  loginUser,
  refreshToken
} from "../controllers/AuthController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hello: "Hi from auth" });
});

router.post("/register", [validateRegister, createUser]);

router.post("/login", loginUser);

router.post("/refresh", refreshToken);

module.exports = router;
