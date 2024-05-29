const handleLogin = (req, res) => {

  if (req.session.user && req.session.user.username) {

    res.json({ loggedIn: true, username: req.session.user.username });
    console.log('is good, залогинен!')
  } else {
    res.json({ loggedIn: false });
    console.log('is not good, не залогинен!')
  }

};

module.exports = handleLogin;
