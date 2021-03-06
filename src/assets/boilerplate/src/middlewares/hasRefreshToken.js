import { verifyRefreshToken } from "../utils/jwt";

const hasRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.uuidr || req.query.uuidr || "";
    const decoded = await verifyRefreshToken(token);
    req.user = decoded;
    req.token = token;
    return next();
  } catch (err) {
    return res.status(401).send({
      msg: "Your session is not valid!",
    });
  }
};

export default hasRefreshToken;
