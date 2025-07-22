import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import Task from '../src/models/task.model';
import Status from '../src/models/status.model';
import User from '../src/models/user.model';

const glob = require('glob');
const path = require('path');

const models = [
	Status,
	User,
	Task
];

const sequelize = new Sequelize('sqlite::memory:', {
	logging: false,
	models,
});

export const initDatabase = async () => {
	const migrations = glob.sync('database/migrations/*.js');
    const seeders = glob.sync('database/seeders/*.js');

    for (const migration of migrations) {
        const { up } = require(path.resolve(migration));
        await up(sequelize.getQueryInterface(), DataTypes);
    }

    for (const seeder of seeders) {
        const { up } = require(path.resolve(seeder));
        await up(sequelize.getQueryInterface());
    }
}

export default sequelize;

