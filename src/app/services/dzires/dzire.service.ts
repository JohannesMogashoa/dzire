import { DzireInterface, DzireListInterface } from "../../interfaces";

import { FireStoreService } from "../firebase/firestore.service";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class DzireService extends FireStoreService<DzireListInterface> {
	constructor() {
		super("dzires");
	}
}
