import {
	Column,
	Model,
	Table,
	Unique,
} from 'sequelize-typescript';

@Table({
	tableName: 'statuses',
	timestamps: false,
})
export default class Status extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Unique
	@Column
	status: string;

	@Unique
	@Column
	label: string;
}
