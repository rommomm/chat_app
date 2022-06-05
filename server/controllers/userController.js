const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res
        .status(300)
        .json({ message: "Username already exists", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(300)
        .json({ message: "Email already exists", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatar,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(403)
        .json({ message: "Incorrect username or password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(403)
        .json({ message: "Incorrect username or password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatar",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
    console.log("error", error);
  }
};
