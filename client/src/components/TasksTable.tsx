import { Chip, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

import api from '../api/Api';
import { Method } from '../api/Api.types';
import { IStatus, ITaskResponse } from '../../../shared/interfaces';
import './TasksTable.scss';

const statusToClass = (statusType: string) => {
	return statusType.toLowerCase().replace('_', '-');
}

export default function TasksTable() {
	const [statuses, setStatuses] = useState<IStatus[]>([]);
	const [tasks, setTasks] = useState<ITaskResponse[]>([]);

	useEffect(() => {
		const fetchStatuses = async () => {
			const response = await api.request(Method.GET, '/status');
			setStatuses(await response.json());
		};

		const fetchTasks = async () => {
			const response = await api.request(Method.GET, '/task');
			setTasks(await response.json());
		};

		fetchStatuses();
		fetchTasks();
	}, []);

	const groupedTasks = tasks.reduce((acc: { [key: string]: ITaskResponse[] }, task) => {
		if (acc[task.status.status]) {
			acc[task.status.status].push(task);
		} else {
			acc[task.status.status] = [task];
		}
		return acc;
	}, {});

	if (!statuses.length) {
		return null;
	}

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
								<div> {task.title} </div>
							)}
						</div>
					</Paper>
				</div>
			))}
		</div>
	);
}
