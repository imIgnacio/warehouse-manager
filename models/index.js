const Warehouse = require('./Warehouse');
const Vehicle = require('./Vehicle');

Warehouse.hasMany(Vehicle, {
  foreignKey: 'location',
  onDelete: 'SET NULL'
});

Vehicle.belongsTo(Warehouse, {
  foreignKey: 'location'
});

module.exports = { Warehouse, Vehicle };