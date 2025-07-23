import { Chip, Paper } from '@mui/material';

import { IStatus, ITaskResponse } from '../../../shared/interfaces';
import './TasksTable.scss';
import TaskPreview from './TaskPreview';

interface ITasksTableProps {
	tasks: ITaskResponse[];
	statuses: IStatus[];
}

const statusToClass = (statusType: string) => {
	return statusType.toLowerCase().replace('_', '-');
}

export default function TasksTable({ tasks, statuses }: ITasksTableProps) {
	const groupedTasks = tasks.reduce((acc: { [key: string]: ITaskResponse[] }, task) => {
		if (acc[task.status.status]) {
			acc[task.status.status].push(task);
		} else {
			acc[task.status.status] = [task];
		}
		return acc;
	}, {});

	return (
		<div className="grid">
			{statuses.map((status, index) => (
				<div key={index} className={`grid-item`}>
					<Paper className={`column column-${index + 1}`} elevation={3}>
						<Chip
							className={`column-header ${statusToClass(status.status)}`}
							label={status.label}
							variant="outlined"
						/>
						<div className="task-list">
							{groupedTasks[status.status] && groupedTasks[status.status].map(task =>
								<TaskPreview
									title={task.title}
									description={task.description}
								/>
							)}
						</div>
					</Paper>
				</div>
			))}
		</div>
	);
}
