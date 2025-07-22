'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        const schema = {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            status: Sequelize.STRING,
            label: Sequelize.STRING,
        };

        return queryInterface.createTable('statuses', schema);
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('statuses');
    }
};
