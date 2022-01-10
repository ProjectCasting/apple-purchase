'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.STRING(40),
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: "primary key",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Reference Name of product",
      },
      pricing: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Reference Name of product",
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "product type: Consumable/Non-Consumable/Non-Renewing/Auto-Renewable",
      },
      created_at: {
        type: "timestamp(3)",
        allowNull: false,
        defaultValue: Sequelize.literal("current_timestamp(3)"),
        comment: "created date time",
      },
      updated_at: {
        type: "timestamp(3)",
        allowNull: false,
        defaultValue: Sequelize.literal("current_timestamp(3)"),
        comment: "last updated date time",
      },
      deleted_at: {
        type: "timestamp(3)",
        allowNull: true,
        comment: "last deleted date time",
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('products');
  }
};
