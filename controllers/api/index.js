const router = require("express").Router();

const userRoutes = require("./user-routes");
const vehicleRoutes = require("./vehicle-routes");

router.use("/user", userRoutes);
router.use("/vehicles", vehicleRoutes);

module.exports = router;
