import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./errorMiddlewares";
import cors from "./middlewares/cors";

import api from "./api";

require("dotenv").config();

const app = express();

cors(app);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "🌈✨"
  });
});

app.use("/api", api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
