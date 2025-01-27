import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysOrdersOverviewComponent } from './todays-orders-overview.component';

describe('OrdersOverviewComponent', () => {
  let component: TodaysOrdersOverviewComponent;
  let fixture: ComponentFixture<TodaysOrdersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysOrdersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysOrdersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
