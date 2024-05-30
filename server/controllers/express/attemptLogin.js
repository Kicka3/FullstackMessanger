const pool = require("../../db");
const bcrypt = require("bcrypt");

const attemptLogin = async (req, res) => {

  const potentialLogin = await pool.query(
    "SELECT id, username, passhash, userid FROM users u WHERE u.username=$1",
    [req.body.username]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      req.session.user = {
        username: req.body.username,
        id: potentialLogin.rows[0].id,
        userid: potentialLogin.rows[0].userid,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
      console.log("Не залогинен");
    }
  } else {
    console.log("Не залогинен");
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
};

module.exports = attemptLogin;

//Проблема с доступом:
// const User = require("../../models/user/user.model");
// const bcrypt = require("bcrypt");
//
// const attemptLogin = async (req, res) => {
//   try {
//     console.log(req.body.username);
//
//     const potentialLogin = await User.findOne({
//       where: { username: req.body.username.toLowerCase() },
//     });
//     console.log('Username: ', potentialLogin); // Выводим потенциального пользователя
//     if (potentialLogin) {
//       console.log('Потенциальный пользователь найден:', potentialLogin.username);
//       const isSamePass = await bcrypt.compare(
//          req.body.password,
//          potentialLogin.passhash
//       );
//
//       if (isSamePass) {
//         console.log('Пароли совпадают');
//         req.session.user = {
//           username: req.body.username,
//           id: potentialLogin.id,
//           userid: potentialLogin.userid,
//         };
//         res.json({ loggedIn: true, username: req.body.username });
//       } else {
//         console.log("Пароли не совпадают");
//         res.json({ loggedIn: false, status: "Wrong username or password!" });
//       }
//     } else {
//       console.log("Пользователь не найден");
//       res.json({ loggedIn: false, status: "Wrong username or password!" });
//     }
//   } catch (error) {
//     console.error("Ошибка при попытке входа:", error);
//     res.status(500).json({ loggedIn: false, status: "Internal server error" });
//   }
// };
//
// module.exports = attemptLogin;