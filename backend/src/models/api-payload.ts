export interface IAddUser {
	firstname: string;
	lastname: string;
	address: string;
	postcode: string;
	contact: string;
	email: string;
	username: string;
	password: string;
}

export interface IEditUser extends IAddUser {
	id: number;
}

export interface IBatchDeleteUser {
	ids: number[];
}