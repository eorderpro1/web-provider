import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCategorySelectedComponent } from './no-category-selected.component';

describe('NoCategorySelectedComponent', () => {
  let component: NoCategorySelectedComponent;
  let fixture: ComponentFixture<NoCategorySelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoCategorySelectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoCategorySelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
