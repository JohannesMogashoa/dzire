import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDzire } from './create-dzire';

describe('CreateDzire', () => {
  let component: CreateDzire;
  let fixture: ComponentFixture<CreateDzire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDzire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDzire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
