const router = require("express").Router();
const { User, Vehicle, Warehouse } = require("../models");
const withAuth = require("../utils/auth");

// Render entry point, login page
router.get("/", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render main page, where we find menu
router.get("/homepage", withAuth, (req, res) => {
  try {
    res.render("homepage", { logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Render inventory endpoint
router.get("/inventory", withAuth, async (req, res) => {
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

// Route to go to page where user can add a vehicle
router.get("/receive", withAuth, async (req, res) => {
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

// router.get("/sell/:id", async (req, res) => {
//   try {
//     const vehicleData = await Vehicle.findByPk(req.params.id, {
//       include: [
//         {
//           attributes: ["model", "make", "cost_price", "sell_price"],
//         },
//       ],
//       exclude: ["kms", "location", "color", "year"],
//     });
//     console.log(vehicleData);
//     const vehicle = vehicleData.get({ plain: true });

//     res.render("sell/:id", {
//       ...vehicle,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;
