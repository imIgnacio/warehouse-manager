const router = require("express").Router();
const { User } = require("../../models");

// Creating a user with email and password
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Send information to be able to log in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    req.session.save(() => {
      // declare session variables
      req.session.user_id = userData.id;
      req.session.name = userData.name;

      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post request to sign out
router.post("/signout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(500).json({ message: "Something went wrong"});
  }
});

module.exports = router;
