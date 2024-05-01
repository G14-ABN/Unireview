import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

const accessProtectionMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token mancante, autorizzazione negata" });
  }

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
