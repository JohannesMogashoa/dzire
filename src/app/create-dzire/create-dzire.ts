import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DzireItem } from '../../../dzires';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dzire',
  imports: [ReactiveFormsModule],
  templateUrl: './create-dzire.html',
  styleUrl: './create-dzire.css',
})
export class CreateDzire {
  private router = inject(Router);
  items: DzireItem[] = [];

  dzireForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    endDate: new FormControl(new Date()),
  });

  dzireItemForm = new FormGroup({
    itemTitle: new FormControl(''),
    itemDescription: new FormControl(''),
  });

  onSubmitDzire() {
    const dzire = {
      title: this.dzireForm.value.title || '',
      description: this.dzireForm.value.description || '',
      endDate: this.dzireForm.value.endDate || new Date(),
      createDate: new Date(),
      items: this.items,
      id: Math.floor(Math.random() * 1000), // Simple ID generation
    };

    console.log('Dzire created:', dzire);
    // Here you would typically send the dzire to a service or API

    // Reset the form and items
    this.dzireForm.reset();
    this.items = [];

    this.router.navigate(['/dashboard']);
  }

  onSubmitItem() {
    this.items.push({
      title: this.dzireItemForm.value.itemTitle || '',
      description: this.dzireItemForm.value.itemDescription || '',
      satisfied: false,
      id: this.items.length + 1, // Simple ID generation
    });

    this.dzireItemForm.reset();
  }
}
