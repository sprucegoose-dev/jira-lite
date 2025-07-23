import { useEffect, useState } from 'react';
import '@fontsource/roboto/400.css';

import TasksTable from './components/TasksTable';
import { Button, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import { IStatus, ITaskResponse } from '../../shared/interfaces';
import { Method } from './api/Api.types';
import api from './api/Api';
import './App.scss';

export default function App() {
	const [tasks, setTasks] = useState<ITaskResponse[]>([]);
	const [statuses, setStatuses] = useState<IStatus[]>([]);
	const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

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

	const onCreateTask = async () => {
		setShowTaskForm(false);
		const response = await api.request(Method.GET, '/task');
		setTasks(await response.json());
	}

	return (
		<div className='app'>
			<div className='header'>
				<Typography variant="h4" component="h2" className='page-title'>
					Jira Lite
				</Typography>
				<Button
					variant='contained'
					className='new-task-btn'
					onClick={() => setShowTaskForm(true)}
				>
					New Task
				</Button>
			</div>
			<TasksTable
				tasks={tasks}
				statuses={statuses}
			/>
			<TaskForm
				open={showTaskForm}
				onClose={onCreateTask}
				statuses={statuses}
			/>
		</div>
	);
}
