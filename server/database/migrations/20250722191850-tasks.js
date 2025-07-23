'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const schema = {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: Sequelize.STRING,
            description: Sequelize.STRING(2000),
            assignee_id: {
				type: Sequelize.INTEGER,
			    allowNull: true,
			},
			status_id: {
                type: Sequelize.INTEGER,
				onUpdate: 'cascade',
            	onDelete: 'cascade',
                references: {
                    model: 'statuses',
                    key: 'id',
                },
                allowNull: false,
            },
			created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        };

        return queryInterface.createTable('tasks', schema);
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('tasks');
    }
};
