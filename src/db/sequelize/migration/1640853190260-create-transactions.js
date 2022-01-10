'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.STRING(40),
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: "primary key",
      },
      original_transaction_id: {
        type: Sequelize.STRING(40),
        allowNull: false,
        comment: "original transaction id",
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
      subscription_id: {
        type: Sequelize.STRING(40),
        allowNull: false,
        comment: "related subscription id",
      },
      purchase_date: {
        type: "timestamp(3)",
        allowNull: false,
        comment: "purchase date",
      },
      expires_date: {
        type: "timestamp(3)",
        allowNull: true,
        comment: "purchase date",
      },
      is_trial_period: {
        type: "tinyint",
        allowNull: false,
        defaultValue: 0,
        comment: "is trial period",
      },
      ownership_type: {
        type: Sequelize.STRING(40),
        allowNull: false,
        comment: "ownership type: FAMILY_SHARED/PURCHASED",
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
    return queryInterface.dropTable('transactions');
  }
};
