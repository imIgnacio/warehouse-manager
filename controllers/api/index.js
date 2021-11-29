const router = require("express").Router();

const userRoutes = require("./user-routes");
//const vehicleRoutes = require('./vehicle-routes');
//const warehouseRoutes = require("./warehouse-routes");

router.use("/users", userRoutes);
//router.use('/vehicles', vehicleRoutes);
////router.use("/warehouse", warehouseRoutes);

module.exports = router;
