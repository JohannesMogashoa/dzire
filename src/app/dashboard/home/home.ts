import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";
import { DzireInterface, DzireList, UserInterface } from "../../interfaces";
import { DzireService, UserService } from "../../services";
import { QueryConstraint, where } from "@angular/fire/firestore";

import { CommonModule } from "@angular/common";
import { FireStoreTService } from "../../services/firebase/firestore-t.service";
import { User } from "@angular/fire/auth";
import { map } from "rxjs";

@Component({
	selector: "app-home",
	imports: [CommonModule],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	private firestore = inject(FireStoreTService);

	user: User = this.activatedRoute.snapshot.data["user"];
	dzires: DzireList[] = [];

	constraints: QueryConstraint[] = [where("userId", "==", this.user.uid)];

	dzires$ = this.firestore
		.getSnapshotChanges<DzireList>("dzires", ...this.constraints)
		.subscribe({
			next: (dzires) => (this.dzires = dzires),
			error: (err) =>
				console.error("Error getting dzires snapshot:", err),
		});

	get displayName() {
		return this.user.displayName || this.user.email?.split("@")[0];
	}

	navigateToCreate() {
		this.router.navigate(["/dashboard/create"]);
	}

	navigateToManage(id: string) {
		this.router.navigate(["/dashboard/manage", id]);
	}
}
