'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
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
      product_id: {
        type: Sequelize.STRING(40),
        allowNull: false,
        comment: "related product id",
      },
      start_date: {
        type: "timestamp(3)",
        allowNull: false,
        comment: "subscription start date",
      },
      expires_date: {
        type: "timestamp(3)",
        allowNull: true,
        comment: "subscription expires date",
      },
      is_trial_period: {
        type: "tinyint",
        allowNull: false,
        defaultValue: 0,
        comment: "is trial period",
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
    return queryInterface.dropTable('subscriptions');
  }
};
