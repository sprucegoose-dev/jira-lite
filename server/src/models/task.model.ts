import {
	BelongsTo,
	Column,
	CreatedAt,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';
import Status from './status.model';
import User from './user.model';

@Table({
	tableName: 'tasks',
	timestamps: true,
})
export default class Task extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column
	title: string;

	@Column
	description: string;

	@Column({
		field: 'assignee_id',
		references: {
			model: User,
			key: 'id',
		}
	})
	assigneeId: number;

	@Column({
		field: 'status_id',
		references: {
			model: Status,
			key: 'id',
		}
	})
	statusId: number;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

	@BelongsTo(() => User, 'assigneeId')
	assignee: User;

	@BelongsTo(() => Status, 'statusId')
	status: Status;
}
