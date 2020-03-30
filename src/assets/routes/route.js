import express from "express";
import {
  create<%=modelName%>,
  all<%=modelName%>,
  get<%=modelName%>,
  update<%=modelName%>,
  delete<%=modelName%>
} from "../controllers/<%=modelName%>Controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hello: "Hi from <%=modelPluralized.toLowerCase()%>" });
});

router.get("/all",all<%=modelName%>);

router.post("/",create<%=modelName%>);

router.get("/:id", get<%=modelName%>);

router.post("/:id", update<%=modelName%>);

router.get("/delete/:id", delete<%=modelName%>);

module.exports = router;
