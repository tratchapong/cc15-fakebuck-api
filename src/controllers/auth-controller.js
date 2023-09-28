const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema } = require('../validators/auth-validator');
const prisma = require('../models/prisma');

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value
    });
    const payload = { userId: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || '1q2w3e4r5t6y7u8i9o0p', {
      expiresIn: process.env.JWT_EXPIRE
    });
    res.status(201).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // const {value, error} = loginSchema.validate(req.body)
    // if (error) {}
  } catch (err) {
    next(err);
  }
};
