import Task from '../models/task.model';

export type ITaskPayload = Pick<Task, 'title' | 'description' | 'statusId' | 'assigneeId'>;
