const router = require("express").Router();
const { Warehouse } = require("../models");
const withAuth = require("../utils/auth");

router.get("/currentstock", async (req, res) => {
  try {
    const warehouseData = await Warehouse.findAll({
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
          model: User,
          attributes: ["name"],
        },
      ],
    });
    if (!warehouseData) {
      res.status(404).json({ message: "No data found" });
    }
    const warehouse = warehouseData.map((user) => user.get({ plain: true }));
    res.status(200).json("currentstock", {
      warehouse,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get();
