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

	@Column({ field: 'first_name' })
	firstName: string;

	@Column({ field: 'last_name' })
	lastName: string;

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
