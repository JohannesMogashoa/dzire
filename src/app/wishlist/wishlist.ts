import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import type { Dzire, DzireItem } from './../../../dzires';

import { sampleDzires } from '../../../dzires';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  selectedDzire = signal<Dzire | null>(null);

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
    });
  }

  reserveItem(item: DzireItem) {
    const selectedItem = this.selectedDzire();

    if (!selectedItem) {
      return;
    }

    // Add the item to the reserved items list
    const _item = selectedItem.items.findIndex((i) => i.id === item.id);
    if (_item === -1) {
      console.error('Item not found in the dzire items list.');
      return;
    }

    // Update the selectedDzire signal with the modified item
    selectedItem.items[_item].reserved = true;
    selectedItem.items[_item].reservedDate = new Date();

    this.selectedDzire.set(selectedItem);

    console.log(this.selectedDzire());

    alert(`You have reserved: ${item.title}`);
  }
}
