import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndRoutesComponent } from './orders-and-routes.component';

describe('OrdersAndRoutesComponent', () => {
  let component: OrdersAndRoutesComponent;
  let fixture: ComponentFixture<OrdersAndRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndRoutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAndRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
