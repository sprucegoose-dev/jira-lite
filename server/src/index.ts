import express from 'express';
import cors from 'cors';
import http from 'http';

import { initDatabase } from '../database/connection';

import UsersController from './controllers/users.controller';
import TasksController from './controllers/tasks.controller';
import StatusesController from './controllers/statuses.controller';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/status', StatusesController.getStatuses);
app.get('/task', TasksController.getTasks);
app.post('/task/:id', TasksController.updateTask);
app.delete('/task/:id', TasksController.deleteTask);
app.get('/user', UsersController.getUsers);

const httpServer = http.createServer(app);

(async () => {
    await initDatabase();

	httpServer.listen(4000, () => {
		console.log('listening on *:4000');
	});
})();
