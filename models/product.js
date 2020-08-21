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
      models.product.hasOne(models.claimed)
      models.product.hasOne(models.shipment)
    }
  };
  product.init({
    productName: DataTypes.STRING,
    productDesc: DataTypes.STRING,
    productType: DataTypes.STRING,
    available: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    productWeight: DataTypes.FLOAT,
    fullName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be 1 to 99 characters'
        }
      }
    },
    streetAddress: DataTypes.STRING,
    streetAddress2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2],
          msg: 'Please enter your state abbreviation'
        }
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5],
          msg: 'Please enter a 5 digit zipcode'
        }
      }
    },
    country: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [9],
          msg: 'Please enter a 9 digit phone number'
        }
      }
    },
    shipmentId: DataTypes.INTEGER,
    claimId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};