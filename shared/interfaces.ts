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
	statusId: string;
	assigneeId: string;
};

export type ITaskResponse = ITaskPayload & {
	status: IStatus;
	user: IUser;
};
