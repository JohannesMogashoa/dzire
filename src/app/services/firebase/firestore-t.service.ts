import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	Firestore,
	Query,
	QueryConstraint,
	QueryDocumentSnapshot,
	QuerySnapshot,
	SetOptions,
	SnapshotOptions,
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	docData,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where,
	writeBatch,
} from "@angular/fire/firestore";
import { Injectable, inject } from "@angular/core";
import { Observable, from, map, switchMap } from "rxjs";

// Define the QueryFn type using the top-level imported types
type QueryFn = (ref: CollectionReference<DocumentData>) => Query<DocumentData>;

@Injectable({
	providedIn: "root",
})
export class FireStoreTService {
	protected readonly firestore = inject(Firestore);

	constructor() {}

	/**
	 * Returns a CollectionReference for a given collection name and type.
	 * @param collectionName The name of the Firestore collection.
	 * @returns A CollectionReference instance.
	 */
	getCollectionRef<T>(collectionName: string): CollectionReference<T> {
		return collection(
			this.firestore,
			collectionName
		) as CollectionReference<T>;
	}

	/**
	 * Returns a DocumentReference for a given collection name and document ID.
	 * @param collectionName The name of the Firestore collection.
	 * @param id The ID of the document.
	 * @returns A DocumentReference instance.
	 */
	getDocRef<T>(collectionName: string, id: string): DocumentReference<T> {
		return doc(this.firestore, collectionName, id) as DocumentReference<T>;
	}

	/**
	 * Retrieves snapshot changes for a specified collection, including metadata.
	 * Maps to an array of documents with their IDs.
	 * @param collectionName The name of the Firestore collection.
	 * @param queryConstraints Optional query constraints (e.g., where, orderBy, limit).
	 * @returns An Observable of an array of documents with their IDs.
	 */
	getSnapshotChanges<T extends { id?: string }>(
		collectionName: string,
		...queryConstraints: QueryConstraint[]
	): Observable<T[]> {
		const q = query(
			this.getCollectionRef<T>(collectionName),
			...queryConstraints
		);
		return new Observable<T[]>((observer) => {
			// Using onSnapshot from the top-level import
			const unsubscribe = onSnapshot(
				q,
				(snapshot) => {
					const docs: T[] = [];
					snapshot.forEach((doc) => {
						docs.push({ id: doc.id, ...doc.data() } as T);
					});
					observer.next(docs);
				},
				(error) => observer.error(error)
			);
			return () => unsubscribe(); // Cleanup function
		});
	}

	/**
	 * Retrieves value changes for a specified collection (data only).
	 * @param collectionName The name of the Firestore collection.
	 * @param queryConstraints Optional query constraints (e.g., where, orderBy, limit).
	 * @returns An Observable of an array of documents with their IDs.
	 */
	getCollectionValueChanges<T extends { id?: string }>(
		collectionName: string,
		...queryConstraints: QueryConstraint[]
	): Observable<T[]> {
		const colRef = this.getCollectionRef<T>(collectionName);
		const q = query(colRef, ...queryConstraints);
		return collectionData(q, { idField: "id" }) as Observable<T[]>;
	}

	/**
	 * Retrieves a single document by its ID.
	 * @param collectionName The name of the Firestore collection.
	 * @param id The ID of the document to retrieve.
	 * @returns An Observable of the document data, or undefined if not found.
	 */
	getDocument<T extends { id?: string }>(
		collectionName: string,
		id: string
	): Observable<T | undefined> {
		const docRef = this.getDocRef<T>(collectionName, id);
		return docData(docRef, { idField: "id" }) as Observable<T | undefined>;
	}

	/**
	 * Adds a new document to a specified collection. Firestore generates the ID.
	 * @param collectionName The name of the Firestore collection.
	 * @param data The data of the document to add.
	 * @returns A Promise that resolves with the DocumentReference of the new document.
	 */
	add<T>(collectionName: string, data: T): Observable<DocumentReference<T>> {
		const colRef = this.getCollectionRef<T>(collectionName);
		return from(addDoc(colRef, data));
	}

	/**
	 * Updates an existing document in a specified collection.
	 * @param collectionName The name of the Firestore collection.
	 * @param id The ID of the document to update.
	 * @param data The partial data to update the document with.
	 * @returns A Promise that resolves when the document is updated.
	 */
	update<T>(
		collectionName: string,
		id: string,
		data: Partial<T>
	): Observable<void> {
		const docRef = this.getDocRef<T>(collectionName, id);
		return from(updateDoc(docRef, data as DocumentData));
	}

	/**
	 * Deletes a document from a specified collection.
	 * @param collectionName The name of the Firestore collection.
	 * @param id The ID of the document to delete.
	 * @returns A Promise that resolves when the document is deleted.
	 */
	delete(collectionName: string, id: string): Observable<void> {
		const docRef = this.getDocRef(collectionName, id);
		return from(deleteDoc(docRef));
	}

	/**
	 * Sets a document in a specified collection, creating it if it doesn't exist or overwriting it.
	 * @param collectionName The name of the Firestore collection.
	 * @param id The ID of the document to set.
	 * @param data The data to set for the document.
	 * @param options SetOptions for merging or overwriting.
	 * @returns A Promise that resolves when the document is set.
	 */
	set<T>(
		collectionName: string,
		id: string,
		data: T,
		options: SetOptions
	): Observable<void> {
		const docRef = this.getDocRef<T>(collectionName, id);
		return from(setDoc(docRef, data, options));
	}

	/**
	 * Overload 1: Adds a document and, if it has children defined in a property, adds those children to a subcollection.
	 * The parent document ID will be generated by Firestore if not provided.
	 * @param collectionName The name of the parent collection.
	 * @param document The parent document to add, potentially containing a children array property.
	 * @param childrenPropertyName The name of the property in the document that holds the children array.
	 * @param childCollectionName The name of the subcollection for the children.
	 * @returns An Observable that emits the ID of the newly created parent document.
	 */
	addWithChildren<T, C>(
		collectionName: string,
		document: T & { [key: string]: C[] | undefined },
		childrenPropertyName: string,
		childCollectionName: string
	): Observable<string>;

	/**
	 * Overload 2: Adds a document and a separate array of child items to a subcollection.
	 * The parent document ID will be generated by Firestore if not provided.
	 * @param collectionName The name of the parent collection.
	 * @param document The parent document to add.
	 * @param childCollectionName The name of the subcollection for the children.
	 * @param children An array of child items to add to the subcollection.
	 * @returns An Observable that emits the ID of the newly created parent document.
	 */
	addWithChildren<T, C>(
		collectionName: string,
		document: T,
		childCollectionName: string,
		children: C[]
	): Observable<string>;

	// Implementation
	addWithChildren<T, C>(
		collectionName: string,
		document: T | (T & { [key: string]: C[] | undefined }),
		arg3: string,
		arg4: string | C[]
	): Observable<string> {
		let children: C[] | undefined;
		let childCollectionName: string;
		let docToAdd = { ...document }; // Work with a copy

		if (Array.isArray(arg4)) {
			childCollectionName = arg3;
			children = arg4;
		} else {
			const childrenPropertyName = arg3;
			childCollectionName = arg4;
			children = (docToAdd as T & { [key: string]: C[] | undefined })[
				childrenPropertyName
			];
			delete (docToAdd as any)[childrenPropertyName];
		}

		return from(
			addDoc(this.getCollectionRef<T>(collectionName), docToAdd)
		).pipe(
			switchMap((docRef) => {
				const parentId = docRef.id;

				if (children && children.length > 0) {
					const batch = writeBatch(this.firestore);
					const subCollectionRef = collection(
						doc(this.firestore, collectionName, parentId),
						childCollectionName
					);

					children.forEach((child: any) => {
						const childDocRef = child.id
							? doc(subCollectionRef, child.id)
							: doc(subCollectionRef);
						batch.set(childDocRef, child);
					});

					return from(batch.commit()).pipe(map(() => parentId));
				} else {
					return from(Promise.resolve(parentId));
				}
			})
		);
	}
}
