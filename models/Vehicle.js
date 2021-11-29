const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Vehicle extends Model {}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost_price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
    },
    sell_price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
    },
    location: {
      type: DataTypes.INTEGER,
      references: {
        model: "warehouse",
        key: "id",
      },
    },
    rego_number: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "vehicle",
  }
);

module.exports = Vehicle;
