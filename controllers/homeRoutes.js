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

router.get("/sell/:rego_number", async (req, res) => {
  try {
    const vehicleData = await Vehicle.findOne({
      where: {
        rego_number: req.params.rego_number,
      },
      include: [
        {
          attributes: ["model", "make", "cost_price", "rego_number"],
        },
      ],
      exclude: ["kms", "location", "color", "year"],
    });
    console.log(vehicleData);
    const vehicle = vehicleData.get({ plain: true });

    res.render("sell", {
      ...vehicle,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
