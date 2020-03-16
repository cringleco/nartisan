import express from "express";
import cors from "../middlewares/cors";
import {
  create<%=modelName%>,
  all<%=modelName%>,
  get<%=modelName%>,
  update<%=modelName%>,
  delete<%=modelName%>
} from "../controllers/<%=modelName%>Controller";

const router = express.Router();
cors(router);

router.get("/", (req, res) => {
  res.json({ hello: "Hi from <%=modelPluralized.toLowerCase()%>" });
});

router.get("/all-<%=modelPluralized.toLowerCase()%>",all<%=modelName%>);

router.post("/<%=modelName.toLowerCase()%>",create<%=modelName%>);

router.get("/<%=modelName.toLowerCase()%>/:id", get<%=modelName%>);

router.post("/update-<%=modelName.toLowerCase()%>/:id", update<%=modelName%>);

router.get("/delete-<%=modelName.toLowerCase()%>/:id", delete<%=modelName%>);

module.exports = router;
