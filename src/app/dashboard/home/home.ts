import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject, signal } from "@angular/core";
import { DzireInterface, UserInterface } from "../../interfaces";
import { DzireService, UserService } from "../../services";

import { CommonModule } from "@angular/common";
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
	private dzireService = inject(DzireService);
	private activatedRoute = inject(ActivatedRoute);

	user: User = this.activatedRoute.snapshot.data["user"];
	dzires$ = this.dzireService
		.getSnapshotChanges((ref) => ref.where("userId", "==", this.user.uid))
		.pipe(
			map((dzires) =>
				dzires.map((dzire) => ({
					...dzire,
					expiryDate: dzire.expiryDate.toDate().toLocaleDateString(),
				}))
			)
		);

	get displayName() {
		return this.user.displayName || this.user.email?.split("@")[0];
	}

	navigateToCreate() {
		this.router.navigate(["/create"]);
	}

	navigateToManage(id: string) {
		this.router.navigate(["/manage", id]);
	}
}
