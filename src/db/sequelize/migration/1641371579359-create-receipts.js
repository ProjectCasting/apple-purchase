'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receipts', {
      id: {
        type: Sequelize.STRING(40),
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: "primary key",
      },
      user_id: {
        type: Sequelize.STRING(40),
        allowNull: false,
        comment: "related user id",
      },
      payload: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "receipt string",
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
    return queryInterface.dropTable('receipts');
  }
};
