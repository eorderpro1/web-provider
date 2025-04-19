import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWithProductsComponent } from './category-with-products.component';

describe('CategoryWithProductsComponent', () => {
  let component: CategoryWithProductsComponent;
  let fixture: ComponentFixture<CategoryWithProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryWithProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWithProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
