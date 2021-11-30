const router = require("express").Router();
const { Warehouse, User, Vehicle } = require("../models");
//const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
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

// Use withAuth middleware to prevent access to route
router.get("/homepage", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
