import { ITaskPayload } from '../interfaces/task.interface';
import Task from '../models/task.model';

export default class TaskService {

	static async update(taskId: number, payload: ITaskPayload) {
		// TODO: validate parameters and valid state transitions
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

	static async delete(taskId: number) {
		await Task.destroy(
			{
				where: {
					id: taskId,
				},
			}
		);
	}
}
