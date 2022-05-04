// Verification des authorisations
const User = require("../models/user");

const verifyUserRole = async (req, res, next) => {
  let userId = req.user.data.email;
  let confirmUser = await User.findOne({ _id: userId }, { email: 1 });

  console.log(confirmUser._id, confirmUser.email);
  if (!confirmUser) return res.status(404).send({ message: "User not found!" });
  if (confirmUser.email !== userId)
    return res.status(401).send({ message: "Unauthorized Access!" });
  next();
};

module.exports = verifyUserRole;
