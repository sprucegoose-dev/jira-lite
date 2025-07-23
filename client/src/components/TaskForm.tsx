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
} from '@mui/material';

import api from '../api/Api';
import { Method } from '../api/Api.types';

import { IStatus, ITaskPayload, IUser } from '../../../shared/interfaces';
import './TaskPreview.scss';


interface IModalProps {
  open: boolean;
  onClose: () => void;
  statuses: IStatus[];
}

export default function TaskForm({ open, onClose, statuses }: IModalProps) {
  const [assignees, setAssignees] = useState<IUser[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  useEffect(() => {
    if (!open) return;

    const fetchAssignees = async () => {
		const response = await api.request(Method.GET, '/user');
        setAssignees(await response.json());
    };

    fetchAssignees();
  }, [open]);

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
      await api.request(Method.POST, '/task', {payload});
      onClose();
	  setTitle('');
	  setDescription('');
	  setAssigneeId(null);
	  setStatusId(null);
      setErrors({});
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          minWidth: 300,
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
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
          Create Task
        </Button>
      </Box>
    </Modal>
  );
}
