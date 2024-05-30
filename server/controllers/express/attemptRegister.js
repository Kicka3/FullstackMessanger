const User = require("../../models/user/user.model");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const attemptRegister = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (!existingUser) {
      // Регистрация нового пользователя
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        username: req.body.username,
        passhash: hashedPass,
        userid: uuidv4(),
      });

      req.session.user = {
        username: req.body.username,
        id: newUser.id,
        userid: newUser.userid,
      };

      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Username already exists, please choose another name" });
    }
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ loggedIn: false, status: "Internal server error" });
  }
};

module.exports = attemptRegister;
