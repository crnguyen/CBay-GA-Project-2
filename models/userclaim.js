'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userClaim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userClaim.init({
    gpu: DataTypes.INTEGER,
    cpu: DataTypes.INTEGER,
    psu: DataTypes.INTEGER,
    memory: DataTypes.INTEGER,
    motherboard: DataTypes.INTEGER,
    storage: DataTypes.INTEGER,
    fullBuild: DataTypes.INTEGER,
    misc: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userClaim',
  });
  return userClaim;
};