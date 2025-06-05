import { ActivatedRoute, Router } from "@angular/router";
import { Component, inject } from "@angular/core";
import { CreateDzireForm, CreateDzireItemForm } from "../../interfaces";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { DzireService } from "../../services";
import { FireStoreTService } from "../../services/firebase/firestore-t.service";
import { Timestamp } from "@angular/fire/firestore";
import { User } from "@angular/fire/auth";
import { take } from "rxjs";

@Component({
	selector: "app-create-dzire",
	imports: [ReactiveFormsModule],
	templateUrl: "./create-dzire.html",
	styleUrl: "./create-dzire.css",
})
export class CreateDzire {
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);
	firestore = inject(FireStoreTService);
	fb = inject(FormBuilder);

	items: CreateDzireItemForm[] = [];
	user: User = this.activatedRoute.snapshot.data["user"];

	dzireForm = this.fb.nonNullable.group({
		title: ["", Validators.required],
		description: ["", Validators.required],
		expiryDate: ["", Validators.required],
	});

	dzireItemForm = this.fb.nonNullable.group({
		itemTitle: ["", Validators.required],
		itemDescription: ["", Validators.required],
	});

	errorMessage: string | null = null;

	onSubmitDzire() {
		const rawForm = this.dzireForm.getRawValue();

		console.log("Dzire Form Data:", rawForm);

		const dzire: CreateDzireForm = {
			title: rawForm.title,
			description: rawForm.description,
			expiryDate: Timestamp.fromDate(new Date(rawForm.expiryDate)),
			createdAt: Timestamp.fromDate(new Date()),
			updatedAt: Timestamp.fromDate(new Date()),
			imageUrl: null,
			userId: this.user.uid,
		};

		this.firestore
			.addWithChildren<CreateDzireForm, CreateDzireItemForm>(
				"dzires",
				dzire,
				"items",
				this.items
			)
			.pipe(take(1))
			.subscribe({
				next: (response) => console.log(response),
				error: (error) => {
					console.error("Error creating dzire:", error);
					this.errorMessage =
						"Failed to create dzire. Please try again.";
				},
				complete: () => {
					console.log("Dzire created successfully");
					this.dzireForm.reset();
					this.items = [];
					this.router.navigate(["/dashboard"]);
				},
			});

		// this.dzireService.create({ dzire, items: this.items }).subscribe({
		// 	next: (response) => {
		// 		console.log("Dzire created successfully:", response);
		// 		this.dzireForm.reset();
		// 		this.items = [];
		// 		this.router.navigate(["/dashboard"]);
		// 	},
		// 	error: (error) => {
		// 		console.error("Error creating dzire:", error);
		// 		this.errorMessage = "Failed to create dzire. Please try again.";
		// 	},
		// });
	}

	onSubmitItem() {
		const rawForm = this.dzireItemForm.getRawValue();

		this.items.push({
			title: rawForm.itemTitle,
			description: rawForm.itemDescription,
			reserved: false,
			reservedDate: null,
			createdAt: Timestamp.fromDate(new Date()),
			updatedAt: Timestamp.fromDate(new Date()),
		});

		this.dzireItemForm.reset();
	}
}
