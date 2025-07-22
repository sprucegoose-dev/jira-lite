import { Request, Response } from 'express';

import Task from '../models/task.model';
import Status from '../models/status.model';
import User from '../models/user.model';
import TaskService from '../services/task.service';

import { ITaskPayload } from '../interfaces/task.interface';

class TasksController {

    async getTasks(_req: Request, res: Response) {
        const tasks = await Task.findAll({
			include: [
                {
                    model: User,
                    as: 'players',
                },
				{
                    model: Status,
                    as: 'players',
                },
            ]
		});
        res.send(tasks);
    }

	async updateTask(req: Request, res: Response) {
		const taskId = req.params.id;
		const payload = req.body as ITaskPayload;

		const task = await TaskService.updateTask(parseInt(taskId, 10), payload);

		res.send(task);
    }
}

export default new TasksController;
