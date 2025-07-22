import { ITaskPayload } from '../interfaces/task.interface';
import Task from '../models/task.model';

export default class TaskService {

	static async updateTask(taskId: number, payload: ITaskPayload) {
		// TODO: validate parameters
		// TODO: add error handling

		const task = await Task.update(
			payload,
			{
				where: {
					id: taskId,
				},
			}
		);

		return task;
	}


}
