import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAndForecastsComponent } from './inventory-and-forecasts.component';

describe('InventoryAndForecastsComponent', () => {
  let component: InventoryAndForecastsComponent;
  let fixture: ComponentFixture<InventoryAndForecastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryAndForecastsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryAndForecastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
