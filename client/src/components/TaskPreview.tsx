import {
	Card,
	CardActionArea,
	CardContent,
} from '@mui/material';

import './TaskPreview.scss';

interface ITaskPreviewProps {
	title: string;
	description: string;
	onClick: () => void;
}

export default function TaskPreview({ title, description, onClick }: ITaskPreviewProps) {

	return (
		<Card className='card-wrapper'>
			<CardActionArea>
				<CardContent className='card-content' onClick={onClick}>
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
