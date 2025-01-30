import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChoiceOrderComponent } from './card-choice-order.component';

describe('CardChoiceOrderComponent', () => {
  let component: CardChoiceOrderComponent;
  let fixture: ComponentFixture<CardChoiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardChoiceOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardChoiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
