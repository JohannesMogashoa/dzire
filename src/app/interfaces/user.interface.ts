import { AuditableInterface } from "./auditable.interface";

export interface UserInterface extends AuditableInterface {
	uid: string;
	firstName: string;
	lastName: string;
	photoUrl: string | null;
	dateOfBirth: Date | null;
}
