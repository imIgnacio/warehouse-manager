const sequelize = require("../config/connection");
const { Warehouse, Vehicle, User } = require("../models");

const WarehouseData = require("./warehouseData.json");
const VehicleData = require("./vehicleData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const Warehouses = await Warehouse.bulkCreate(WarehouseData);
    // for (const vehicleObject of VehicleData) {
    //   await Vehicle.bulkCreate({
    //     ...vehicleObject,
    //     Warehouse_id:
    //       Warehouses[Math.floor(Math.random() * Warehouses.length)].id,
    //   });
    // }
    const vehicles = await Vehicle.bulkCreate(VehicleData);

  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedDatabase();
