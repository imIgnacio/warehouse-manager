const router = require("express").Router();
const { Vehicle } = require("../models");
const withAuth = require("../utils/auth");

router.get("/currentstock", withAuth, async (req, res) => {
  try {
    const vehicleData = await Vehicle.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Warehouse,
          attributes: ["name", "phone", "address", "manager"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    if (!vehicleData) {
      res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(vehicleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/receive", withAuth, async (req, res) => {
//   try {
//     const newVehicle = await Vehicle.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     if (!vehicleData) {
//       res.status(404).json({ message: "No Vehicle data found!" });
//       return;
//     }
//     res.status(200).json(newVehicle);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put("/update/:id", withAuth, async (req, res) => {
//   try {
//     const updatedVehicle = await Vehicle.update({
//       ...req.body,
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });
//     if (!vehicleData) {
//       res.status(404).json({ message: "No Vehicle found" });
//       return;
//     }
//     res.status(200).json(updatedVehicle);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete("/sellvehicle/:id", withAuth, async (req, res) => {
//   try {
//     const vehicleData = await Vehicle.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!vehicleData) {
//       res.status(404).json({ message: "No vehicle found with this id!" });
//       return;
//     }

//     res.status(200).json(vehicleData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
