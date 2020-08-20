'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.product.belongsTo(models.user)
    }
  };
  product.init({
    productName: DataTypes.STRING,
    productDesc: DataTypes.STRING,
    productType: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    productWeight: DataTypes.FLOAT,
    fullName: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    streetAddress2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    shipmentId: DataTypes.INTEGER,
    claimId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};