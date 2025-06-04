import { AuditableInterface } from "./auditable.interface";
import type { Timestamp } from "@angular/fire/firestore";

export interface DzireItemInterface extends AuditableInterface {
	id: string;
	title: string;
	description: string;
	reserved: boolean;
	reservedDate?: Timestamp;
}
