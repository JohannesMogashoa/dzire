import { AuditableInterface } from "./auditable.interface";
import { DzireItemInterface } from "./dzire-item.interface";
import type { Timestamp } from "firebase/firestore/lite";

export interface DzireInterface extends AuditableInterface {
	id: string;
	title: string;
	description: string;
	expiryDate: Timestamp;
	imageUrl?: string;
	userId: string;
	items: DzireItemInterface[];
}

export type DzireListInterface = Omit<DzireInterface, "items">;
