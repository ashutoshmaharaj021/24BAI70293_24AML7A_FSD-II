const authenticateToken =
  require("../middleware/authMiddleware");
  const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

/*
 * Mock user database
 *
 * In a real application this would come
 * from MongoDB / PostgreSQL / MySQL etc.
 */

const users = [
  {
    id: 1,
    name: "Ashutosh",
    email: "student@example.com",

    // Password:
    // demo123
    passwordHash:
      "$2b$10$4N5Zq0Z8bQhQWfY1dM8nHe6j8r7Xv7x9Lh9n9V7zV5xY3uG7xJQ6S",

    role: "student",
  },
];

/*
 * LOGIN
 */

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required.",
      });
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    /*
     * Generate JWT
     */

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          process.env.JWT_EXPIRES_IN ||
          "1h",
      }
    );

    res.json({
      message: "Login successful.",

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Internal server error.",
    });
  }
});

/*
 * PROTECTED PROFILE ROUTE
 */

router.get(
  "/profile",
  authenticateToken,
  (req, res) => {
    res.json({
      message:
        "Protected profile accessed successfully.",

      user: req.user,
    });
  }
);

module.exports = router;