import { verifyToken } from "../utils/jwt";

export default async function authRequired(req, res, next) {
  try {
    const token = req.cookies.uuidt || req.headers.authorization || "";

    if (token.startsWith("Bearer ")) {
      const toke = token.substring(7, token.length);
      const decoded = await verifyToken(toke);

      req.user = decoded;
      return next();
    } else {
      const decoded = await verifyToken(token);
      req.user = decoded;
      return next();
    }
  } catch (error) {
    return res.status(401).send({
      msg: "Your session is not valid!",
    });
  }
}
