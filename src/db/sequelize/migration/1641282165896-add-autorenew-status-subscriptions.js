'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('subscriptions', 'auto_renew_status', {
      type: "tinyint",
      allowNull: false,
      defaultValue: "0",
      comment: "auto renew status",
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('subscriptions', 'auto_renew_status');
  }
};
