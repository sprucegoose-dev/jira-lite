import {
	Card,
	CardActionArea,
	CardContent,
} from '@mui/material';

import { ITaskResponse } from '../../../shared/interfaces';
import './TaskPreview.scss';

export default function TaskPreview({ title, description}: Pick<ITaskResponse, 'title' | 'description'>) {

	return (
		<Card className='card-wrapper'>
			<CardActionArea>
				<CardContent className='card-content'>
					<div className='task-title'>
						{title}
					</div>
					<div className='task-description'>
						{description.substring(0, 150)}
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
