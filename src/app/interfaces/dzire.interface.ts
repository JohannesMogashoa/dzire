import { AuditableInterface } from "./auditable.interface";
import { DzireItemInterface } from "./dzire-item.interface";
import type { Timestamp } from "firebase/firestore/lite";

export interface DzireInterface extends AuditableInterface {
	id: string;
	title: string;
	description: string;
	expiryDate: Timestamp;
	imageUrl: string | null;
	userId: string;
	items: DzireItemInterface[];
}

export type DzireList = Omit<DzireInterface, "items">;

export type CreateDzireForm = Omit<DzireList, "id">;
