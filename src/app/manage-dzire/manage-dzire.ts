import { Component, inject, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-dzire',
  imports: [],
  templateUrl: './manage-dzire.html',
  styleUrl: './manage-dzire.css',
})
export class ManageDzire {
  dzireId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.dzireId.set(params['id']);
    });
  }
}
