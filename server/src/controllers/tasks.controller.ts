import { Request, Response } from 'express';

import Task from '../models/task.model';
import Status from '../models/status.model';
import User from '../models/user.model';
import TaskService from '../services/task.service';

import { ITaskPayload } from '../../../shared/interfaces';

class TasksController {

    async getTasks(_req: Request, res: Response) {
        const tasks = await Task.findAll({
			include: [
                {
                    model: User,
                    as: 'assignee',
                },
				{
                    model: Status,
                    as: 'status',
                },
            ]
		});
        res.send(tasks);
    }

	async createTask(req: Request, res: Response) {
		const payload = req.body as ITaskPayload;

		const task = await TaskService.create(payload);

		res.send(task);
    }

	async updateTask(req: Request, res: Response) {
		const taskId = req.params.id;
		const payload = req.body as ITaskPayload;

		const task = await TaskService.update(parseInt(taskId, 10), payload);

		res.send(task);
    }

	async deleteTask(req: Request, res: Response) {
		const taskId = req.params.id;

		await TaskService.delete(parseInt(taskId, 10));

		res.send();
    }
}

export default new TasksController;
