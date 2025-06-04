import { Auth, User, authState } from "@angular/fire/auth";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { AuthenticationService } from "../../services/auth/auth.service";

@Component({
	selector: "app-navbar",
	imports: [RouterModule],
	templateUrl: "./navbar.html",
	styleUrl: "./navbar.css",
})
export class Navbar {
	authService = inject(AuthenticationService);
	router = inject(Router);
	user = signal<User | null>(null);

	constructor() {
		this.authService.user$.subscribe({
			next: (value) => {
				this.user.set(value);
			},
			error: (err) => {
				console.error("Error fetching user:", err);
				this.user.set(null);
			},
		});
	}

	ngOnDestroy() {
		this.authService.user$.subscribe().unsubscribe();
	}

	logout() {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(["/auth/sign-in"]);
			},
			error: (err) => {
				console.error("Logout failed:", err);
			},
		});
	}
}
