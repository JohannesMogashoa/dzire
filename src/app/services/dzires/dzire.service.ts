import { DzireInterface, DzireList } from "../../interfaces";
import {
	Firestore,
	collection,
	getDoc,
	getDocs,
	query,
	where,
} from "@angular/fire/firestore";
import { Injectable, inject } from "@angular/core";
import { from, map } from "rxjs";

import { CreateDzireForm } from "./../../interfaces/dzire.interface";
import { CreateDzireItemForm } from "./../../interfaces/dzire-item.interface";
import { QueryFn } from "@angular/fire/compat/firestore";

@Injectable({
	providedIn: "root",
})
export class DzireService {
	protected readonly firestore = inject(Firestore);
	protected readonly collectionName = "dzires";
	protected readonly subCollectionName = "items";

	getSnapshotChanges(userId: string) {
		const docCollection = collection(this.firestore, this.collectionName);
		const q = query(docCollection, where("userId", "==", userId));
		return from(getDocs(q));
	}

	create({
		dzire,
		items,
	}: {
		dzire: CreateDzireForm;
		items: CreateDzireItemForm[];
	}) {}
}
