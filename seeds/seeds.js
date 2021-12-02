const sequelize = require("../config/connection");
const { Warehouse, Vehicle, User } = require("../models");

const warehouseData = require("./warehouseData.json");
const vehicleData = require("./vehicleData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const Warehouses = await Warehouse.bulkCreate(warehouseData);
    const vehicles = await Vehicle.bulkCreate(vehicleData);

  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedDatabase();
