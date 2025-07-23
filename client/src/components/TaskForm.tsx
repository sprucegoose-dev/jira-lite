import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material';

import api from '../api/Api';
import { Method } from '../api/Api.types';

import {
	IStatus,
	ITaskPayload,
	ITaskResponse,
	IUser
} from '../../../shared/interfaces';
import './TaskForm.scss';


interface IModalProps {
  open: boolean;
  onClose: () => void;
  statuses: IStatus[];
  task: ITaskResponse | null;
}

export default function TaskForm({ open, onClose, statuses, task }: IModalProps) {
  const [assignees, setAssignees] = useState<IUser[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  useEffect(() => {
	if (!open) {
		setTitle('');
		setDescription('');
		setAssigneeId(null);
		setStatusId(null);
		setTaskId(null);
		setErrors({});
		return;
	}

    const fetchAssignees = async () => {
		const response = await api.request(Method.GET, '/user');
        setAssignees(await response.json());
    };

    fetchAssignees();

	if (task) {
		setTitle(task.title);
		setDescription(task.description);
		setAssigneeId(task.assigneeId);
		setStatusId(task.statusId);
		setTaskId(task.id);
	}
  }, [open, task]);

  const validate = () => {
    const newErrors: { title?: string; status?: string } = {};

    if (!title.trim()) {
		newErrors.title = 'Title is required'
	};

    if (!statusId) {
		newErrors.status = 'Status is required'
	};

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload: ITaskPayload = {
      title,
      description,
      assigneeId,
      statusId: statusId as number,
    };

    try {
      await api.request(Method.POST, `/task${taskId ? `/${taskId}` : ''}`, {payload});
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

   	await api.request(Method.DELETE, `/task/${taskId}`);
	onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
		className='task-form-modal'
	>
		<Typography variant="h6" className="form-title">
        	{task?.title || 'Create New Task'}
        </Typography>

        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          error={!!errors.title}
          helperText={errors.title}
          autoFocus
        />

        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel id="assignee-label">Assignee</InputLabel>
          <Select
            labelId="assignee-label"
            value={assigneeId}
            label="Assignee"
            onChange={e => setAssigneeId(e.target.value as number)}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {assignees.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth error={!!errors.status} required>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={statusId}
            label="Status"
            onChange={e => setStatusId(e.target.value as number)}
          >
            {statuses.map(status => (
              <MenuItem key={status.status} value={status.id}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>

        <Button variant="contained" type="submit" disabled={!title || !statusId}>
          {`${task ? 'Update' : 'Create'} Task`}
        </Button>
		{task &&
			<Button variant="text" onClick={handleDelete}>
				Delete Task
			</Button>
		}
      </Box>
    </Modal>
  );
}
