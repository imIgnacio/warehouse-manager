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

    const warehouses = await Warehouse.bulkCreate(warehouseData);
    for (const vehicleObject of vehicleData) {
      await Vehicle.bulkCreate({
        ...vehicleObject,
        warehouse_id:
          warehouses[Math.floor(Math.random() * warehouses.length)].id,
      });
    }
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedDatabase();
