const router = require("express").Router();
const {  User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homepage", withAuth, (req, res) => {
  try {
 
    res.render("homepage",{logged_in: true});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
 
  res.render("signup");
});

router.get("/user/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const currentUser = userData.get({ plain: true });

    res.render("homepage", {
      ...currentUser,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/inventory", withAuth, (req, res) => {
  console.log("hitting");
  try {
    res.render("inventory",{logged_in: true});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
