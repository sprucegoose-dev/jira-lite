import TasksController from './tasks.controller';
import Task from '../models/task.model';
import User from '../models/user.model';
import Status from '../models/status.model';

describe('TasksController (integration)', () => {
	let request: any;
	let response: any;
	let user: User;
	let status: Status;

	beforeAll(async () => {
		user = await User.findOne({ where: { username: 'codewizard42' } });
		status = await Status.findOne({ where: { status: 'TO_DO' } });
	});

	beforeEach(() => {
		request = {};
		response = {
			send: jest.fn()
		};
	});

	afterEach(async () => {
		await Task.truncate({ cascade: true });
	});

	describe('getTasks', () => {

		it('should return all tasks with assignee and status', async () => {
			const task = await Task.create({
				title: 'Test task',
				description: 'Task description',
				assigneeId: user.id,
				statusId: status.id
			});

			await TasksController.getTasks(request, response);

			expect(response.send).toHaveBeenCalledWith([
				expect.objectContaining({
					id: task.id,
					title: 'Test task',
					description: 'Task description',
					assignee: expect.objectContaining({
						id: user.id,
						username: user.username
					}),
					status: expect.objectContaining({
						status: status.status,
						label: status.label
					})
				})
			]);
		});
	});

	describe('createTask', () => {
		it('should create and return a task', async () => {
			request.body = {
				title: 'Created Task',
				description: 'Via controller test',
				assigneeId: user.id,
				statusId: status.id
			};

			await TasksController.createTask(request, response);

			expect(response.send).toHaveBeenCalledWith(
				expect.objectContaining({
					title: 'Created Task',
					description: 'Via controller test',
					assigneeId: user.id,
					statusId: status.id
				})
			);
		});
	});

	describe('updateTask', () => {
		it('should update task fields including assignee and status', async () => {
			const originalUser = await User.findOne({ where: { username: 'codewizard42' } });
			const originalStatus = await Status.findOne({ where: { status: 'TO_DO' } });
			const newUser = await User.findOne({ where: { username: 'danN' } });
			const newStatus = await Status.findOne({ where: { status: 'IN_PROGRESS' } });

			const task = await Task.create({
				title: 'Original Title',
				description: 'Original description',
				assigneeId: originalUser.id,
				statusId: originalStatus.id
			});

			request.params = { id: task.id.toString() };
			request.body = {
				title: 'Updated Title',
				description: 'Updated description',
				assigneeId: newUser.id,
				statusId: newStatus.id
			};

			await TasksController.updateTask(request, response);

			const updated = await Task.findByPk(task.id);

			expect(updated?.title).toBe('Updated Title');
			expect(updated?.description).toBe('Updated description');
			expect(updated?.assigneeId).toBe(newUser.id);
			expect(updated?.statusId).toBe(newStatus.id);
		});
	});

	describe('deleteTask', () => {
		it('should delete the task', async () => {
			const task = await Task.create({
				title: 'To be deleted',
				description: 'Cleanup test',
				assigneeId: user.id,
				statusId: status.id
			});

			request.params = { id: task.id };

			await TasksController.deleteTask(request, response);

			expect(response.send).toHaveBeenCalled();

			const deleted = await Task.findByPk(task.id);
			expect(deleted).toBeNull();
		});
	});
});
