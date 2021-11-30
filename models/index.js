const Warehouse = require("./Warehouse");
const Vehicle = require("./Vehicle");
const User = require("./User");

Warehouse.hasMany(Vehicle, {
  foreignKey: "location",
  onDelete: "SET NULL", //To be checked
});

Vehicle.belongsTo(Warehouse, {
  foreignKey: "location",
});

module.exports = { Warehouse, Vehicle, User };
