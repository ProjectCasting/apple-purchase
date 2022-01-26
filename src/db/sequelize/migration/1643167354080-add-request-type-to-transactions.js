'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'request_type', {
      type: Sequelize.STRING(40),
      allowNull: true,
      comment: "request type: FRONTEND/WEBHOOK",
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('transactions', 'request_type');
  }
};
