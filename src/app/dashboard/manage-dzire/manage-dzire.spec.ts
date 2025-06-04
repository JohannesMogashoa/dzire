import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDzire } from './manage-dzire';

describe('ManageDzire', () => {
  let component: ManageDzire;
  let fixture: ComponentFixture<ManageDzire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDzire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDzire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
