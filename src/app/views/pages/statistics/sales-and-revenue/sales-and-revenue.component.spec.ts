import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAndRevenueComponent } from './sales-and-revenue.component';

describe('SalesAndRevenueComponent', () => {
  let component: SalesAndRevenueComponent;
  let fixture: ComponentFixture<SalesAndRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAndRevenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAndRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
