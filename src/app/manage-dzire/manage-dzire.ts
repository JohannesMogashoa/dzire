import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import type { Dzire, DzireItem } from './../../../dzires';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { sampleDzires } from '../../../dzires';

@Component({
  selector: 'app-manage-dzire',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-dzire.html',
  styleUrl: './manage-dzire.css',
})
export class ManageDzire {
  selectedDzire = signal<Dzire | null>(null);
  items: DzireItem[] = [];
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  dzireForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    endDate: new FormControl(new Date()),
  });

  dzireItemForm = new FormGroup({
    itemId: new FormControl(0),
    itemTitle: new FormControl(''),
    itemDescription: new FormControl(''),
  });

  constructor() {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      var id = +params['id'];

      const dzire = sampleDzires.find((dzire) => dzire.id === id);

      if (!dzire) {
        this.router.navigate(['/dashboard']);
        return;
      }

      this.selectedDzire.set(dzire);
      this.items = dzire.items || [];

      this.dzireForm.patchValue({
        title: dzire.title,
        description: dzire.description,
        endDate: new Date(dzire.endDate) || new Date(),
      });
    });
  }

  editItem(item: DzireItem) {
    this.dzireItemForm.patchValue({
      itemId: item.id,
      itemTitle: item.title,
      itemDescription: item.description,
    });
  }

  removeItem(item: DzireItem) {
    const itemIndex = this.items.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      console.log('Item removed:', item);
    }
  }

  deleteDzire() {
    const dzireId = this.selectedDzire()?.id;
    if (dzireId !== undefined) {
      // Logic to delete the dzire, e.g., call a service to delete it from the backend
      console.log(`Deleting dzire with ID: ${dzireId}`);
      // After deletion, navigate back to the dashboard
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Dzire ID is not defined for deletion.');
    }
  }

  onSubmitItem() {
    const itemId = this.dzireItemForm.value.itemId || 0;
    const itemTitle = this.dzireItemForm.value.itemTitle || '';
    const itemDescription = this.dzireItemForm.value.itemDescription || '';

    if (!itemTitle) {
      console.error('Item title is required.');
      return;
    }

    if (this.selectedDzire() === null) {
      console.error('No dzire selected to add item to.');
      return;
    }

    // check if item already exists
    const existingItem = this.selectedDzire()?.items.find(
      (item) => item.id === itemId
    );

    if (existingItem) {
      // Update existing item
      existingItem.title = itemTitle;
      existingItem.description = itemDescription;
      console.log('Item updated:', existingItem);
      // Reset the form
      this.dzireItemForm.reset();
      return;
    }

    const newItem = {
      title: itemTitle,
      description: itemDescription,
      satisfied: false,
      id: (this.selectedDzire()?.items.length || 0) + 1, // Simple ID generation
    };

    this.items.push(newItem);
    console.log('Item added:', newItem);

    // Reset the form
    this.dzireItemForm.reset();
  }

  onSubmitDzire() {
    const dzire = this.selectedDzire();
    if (dzire === null) {
      console.error('No dzire selected for update.');
      return;
    }

    dzire.title = this.dzireForm.value.title || '';
    dzire.description = this.dzireForm.value.description || '';
    dzire.endDate = this.dzireForm.value.endDate || new Date();

    console.log('Dzire updated:', this.selectedDzire());
    // Here you would typically send the updated dzire to a service or API

    // Reset the form
    this.dzireForm.reset();
  }
}
