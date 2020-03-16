import express from "express";

import auth from "./auth";
import users from "./users";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello from api - 👋"
  });
});

router.use("/auth", auth);

router.use("/users", users);

module.exports = router;
