import { verifyToken } from '../utils/jwt';

export default async function authMobile(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      const decoded = await verifyToken(token);
      req.user = decoded;
      return next();
    }
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
  } catch (error) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
  }
}
