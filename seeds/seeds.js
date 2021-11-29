const sequelize = require("../config/connection");
const { Warehouse, Vehicle } = require("../models");

const WarehouseData = require("./warehouseData.json");
const VehicleData = require("./vehicleData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    const Warehouses = await Warehouse.bulkCreate(WarehouseData);
    for (const vehicleObject of VehicleData) {
      await Vehicle.bulkCreate({
        ...vehicleObject,
        Warehouse_id:
          Warehouses[Math.floor(Math.random() * Warehouses.length)].id,
      });
    }
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedDatabase();
