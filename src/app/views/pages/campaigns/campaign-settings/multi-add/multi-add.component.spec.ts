import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAddComponent } from './multi-add.component';

describe('MultiAddComponent', () => {
  let component: MultiAddComponent;
  let fixture: ComponentFixture<MultiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
