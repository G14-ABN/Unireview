import jwt from "jsonwebtoken";
import "../loadEnvironment.js";
const secretKey = process.env.JWT_SECRET;

const accessProtectionMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token mancante, autorizzazione negata" });
  }

  // Usare la forma Authorization: <token> e non Authorization: Bearer <token>
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token non valido, autorizzazione negata" });
    }

    req.user = decoded;
    next();
  });
};

export default accessProtectionMiddleware;
