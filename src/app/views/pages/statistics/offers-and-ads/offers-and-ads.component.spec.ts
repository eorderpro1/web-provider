import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersAndAdsComponent } from './offers-and-ads.component';

describe('OffersAndAdsComponent', () => {
  let component: OffersAndAdsComponent;
  let fixture: ComponentFixture<OffersAndAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersAndAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersAndAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
