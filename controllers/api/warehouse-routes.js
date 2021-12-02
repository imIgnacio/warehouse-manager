const router = require("express").Router();
const { Warehouse, Vehicle, User } = require("../../models");
const withAuth = require("../../utils/auth");

// router.get("/inventory", withAuth, async (req, res) => {
//   try {
//     const warehouseData = await Warehouse.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       include: [
//         {
//           model: Vehicle,
//           attributes: [
//             "make",
//             "model",
//             "kms",
//             "color",
//             "year",
//             "cost_price",
//             "sell_price",
//             "location",
//             "rego number",
//           ],
//         },
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });
//     if (!warehouseData) {
//       res.status(404).json({ message: "No data found" });
//     }

//     res.status(200).render("inventory");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;
