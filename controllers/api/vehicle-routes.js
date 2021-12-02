const router = require("express").Router();
const { Vehicle } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all vehicles .../api/vehicles
router.get("/", withAuth, async (req, res) => {
  try {
    console.log("hahahah");
    const vehicleData = await Vehicle.findAll();

    if(!vehicleData){
      res.status(400).json({ message: "No vehicles were found"});
      return;
    }

    res.status(200).json(vehicleData);
  }catch(err) {
    res.status(500).json(err);
  }
});

// Get info for a specific vehicle
router.get("/:id", withAuth, async (req, res) => {
  try {
    const vehicleData = await Vehicle.findByPk({
      where: {
        vehicle_id: req.params.id,
      },
    });

    if (!vehicleData) {
      res.status(404).json({ message: "No vehicle found" });
      return;
    }

    res.status(200).json(vehicleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new vehicle
router.post("/receive", withAuth, async (req, res) => {
  try {
    const newVehicle = await Vehicle.create({
      ...req.body,
    });

    res.status(200).json(newVehicle);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a vehicle
router.put("/update/:id", withAuth, async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.update({
      ...req.body,
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!vehicleData) {
      res.status(404).json({ message: "No Vehicle found" });
      return;
    }
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sell or Destroy a vehicle
router.delete("/sell/:id", withAuth, async (req, res) => {
  try {
    const vehicleData = await Vehicle.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!vehicleData) {
      res.status(404).json({ message: "No vehicle found with this id!" });
      return;
    }

    res.status(200).json(vehicleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
