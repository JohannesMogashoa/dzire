import type { Timestamp } from "@angular/fire/firestore";

export interface AuditableInterface {
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
