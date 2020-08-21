'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shipment.hasMany(models.user)
      models.shipment.hasMany(models.product)
    }
  };
  shipment.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    trackingNumber: DataTypes.STRING,
    label: DataTypes.STRING,
    trackingEmbed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shipment',
  });
  return shipment;
};