import express from "express";
import authRequired from "../middlewares/authRequired";

const router = express.Router();

router.get("/", authRequired, (req, res) => {
  res.json({ message: "Hello this is a protected route" });
});

router.get("/no-auth", (req, res) => {
  res.json({ message: "Hello this is a non protected route" });
});

module.exports = router;
