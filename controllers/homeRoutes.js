const router = require("express").Router();
const { User, Vehicle, Warehouse } = require("../models");
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
    res.render("homepage", { logged_in: true });
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

// Render inventory endpoint
router.get("/inventory", async (req, res) => {
  try {
    const vehicleData = await Vehicle.findAll({
      include: [
        {
          model: Warehouse,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data
    const vehicles = vehicleData.map((vehicle) => vehicle.get({ plain: true }));

    console.log(vehicles);
    res.render("inventory", {
      vehicles,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/receive", async (req, res) => {
  try {
    res.render("receive", {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sell", async (req, res) => {
  try {
    res.render("sell", {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/update", async (req, res) => {
//   try {
//     res.render("update", {
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;
