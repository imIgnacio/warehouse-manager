const sequelize = require('../config/connection');
const { Warehouse, Vehicle } = require('../models');

const WarehouseData = require('./warehouseData.json');
const VehicleData = require('./vehicleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Warehouses = await Warehouse.bulkCreate(WarehouseData, {
    individualHooks: true,
    returning: true,
  });

  for (const Vehicle of VehicleData) {
    await Vehicle.create({
      ...Vehicle,
      Warehouse_id: Warehouses[Math.floor(Math.random() * Warehouses.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();