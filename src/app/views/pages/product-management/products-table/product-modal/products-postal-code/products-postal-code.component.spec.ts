import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPostalCodeComponent } from './products-postal-code.component';

describe('ProductsPostalCodeComponent', () => {
  let component: ProductsPostalCodeComponent;
  let fixture: ComponentFixture<ProductsPostalCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPostalCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPostalCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
