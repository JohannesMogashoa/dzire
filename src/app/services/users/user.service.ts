import {
	Firestore,
	collection,
	getDocs,
	query,
	where,
} from "@angular/fire/firestore";
import { Injectable, inject } from "@angular/core";
import { Observable, from } from "rxjs";

import { UserInterface } from "../../interfaces";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private firestore = inject(Firestore);

	getUserProfile(userId: string): Observable<UserInterface | null> {
		const usersRef = collection(this.firestore, "users");
		const userQuery = query(usersRef, where("uid", "==", userId));

		const promise = getDocs(userQuery).then((querySnapshot) => {
			if (querySnapshot.empty) {
				return null;
			}

			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data() as UserInterface;

			return userData;
		});

		return from(promise);
	}
}
