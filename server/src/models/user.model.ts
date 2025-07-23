import {
	Column,
	CreatedAt,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';

@Table({
	tableName: 'users',
	timestamps: true,
	defaultScope: {
		attributes: {
			exclude: ['password'],
		},
	},
})
export default class User extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column
	username: string;

	@Column
	first_name: string;

	@Column
	last_name: string;

	@Column
	email: string;

	@Column
	password: string;

	@CreatedAt
	@Column({ field: 'created_at' })
	createdAt: Date;

	@UpdatedAt
	@Column({ field: 'updated_at' })
	updatedAt: Date;
}
