const router = require("express").Router();
const {  User, Vehicle, Warehouse } = require("../models");
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
 
    res.render("homepage",{logged_in: true});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render sign up page
router.get("/signup", (req, res) => {
 
  res.render("signup");
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
    })

    // Serialize data
    const vehicles = vehicleData.map((vehicle) => vehicle.get({ plain: true }));

    console.log(vehicles);
    res.render("inventory",{
      vehicles,
      logged_in: true});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
