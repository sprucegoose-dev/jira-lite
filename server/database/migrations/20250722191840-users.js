'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        const schema = {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: Sequelize.STRING,
            first_name: Sequelize.STRING,
            last_name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
			created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        };

        return queryInterface.createTable('users', schema);
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    }
};
