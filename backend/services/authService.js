const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;

function hashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

function comparePasswords(plainTextPassword, hash) {
  return bcrypt.compare(plainTextPassword, hash);
}

function createToken(data) {
  console.log(data);
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

module.exports = { hashPassword, comparePasswords, createToken };
