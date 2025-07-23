export type IStatus = {
	id: number;
	status: string;
	label: string;
};

export type IUser = {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
};

export type ITaskPayload = {
	description: string;
	title: string;
	statusId: number;
	assigneeId: number | null;
};

export type ITaskResponse = ITaskPayload & {
	id: number;
	status: IStatus;
	user: IUser;
};
