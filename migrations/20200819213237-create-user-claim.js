'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userClaims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gpu: {
        type: Sequelize.INTEGER
      },
      cpu: {
        type: Sequelize.INTEGER
      },
      psu: {
        type: Sequelize.INTEGER
      },
      memory: {
        type: Sequelize.INTEGER
      },
      motherboard: {
        type: Sequelize.INTEGER
      },
      storage: {
        type: Sequelize.INTEGER
      },
      fullBuild: {
        type: Sequelize.INTEGER
      },
      misc: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userClaims');
  }
};