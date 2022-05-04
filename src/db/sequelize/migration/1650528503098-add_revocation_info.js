'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn('transactions', 'revocation_date', {
                type: "timestamp(3)",
                allowNull: true,
                comment: "the revocation date when user refund the subscription",
            })
            await queryInterface.addColumn('transactions', 'revocation_reason', {
                type: Sequelize.STRING(16),
                allowNull: true,
                comment: "the revocation reason code",
            })
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    },

    down: async (queryInterface) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('transactions', 'revocation_date');
            await queryInterface.removeColumn('transactions', 'revocation_reason');
            transaction.commit();

        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }
};
