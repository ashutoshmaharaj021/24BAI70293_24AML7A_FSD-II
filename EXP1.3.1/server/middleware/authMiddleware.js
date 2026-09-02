const jwt = require("jsonwebtoken");

const authenticateToken = (
  req,
  res,
  next
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message:
        "Access denied. No token provided.",
    });
  }

  const parts =
    authHeader.split(" ");

  if (
    parts.length !== 2 ||
    parts[0] !== "Bearer"
  ) {
    return res.status(401).json({
      message:
        "Invalid authorization format.",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Token has expired.",
      });
    }

    return res.status(403).json({
      message: "Invalid token.",
    });
  }
};

module.exports =
  authenticateToken;