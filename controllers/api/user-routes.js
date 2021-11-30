const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");
// this route is not needed as we don't need to get all users/ just the user who has logged in
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Vehicle,
          attributes: [
            "make",
            "model",
            "kms",
            "color",
            "year",
            "cost_price",
            "sell_price",
            "location",
            "rego number",
          ],
        },
        {
          model: Warehouse,
          attributes: ["name", "phone", "address", "manager"],
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//creating a user with email and password
router.post("/signup", async (req, res) => {
  try {
    const UserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.name = UserData.name;
      req.session.loggedIn = true;

      res.status(200).json(UserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!UserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.name = dbUserData.name;

      req.session.loggedIn = true;

      res.json({ user: UserData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const UserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!UserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.status(200).json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
