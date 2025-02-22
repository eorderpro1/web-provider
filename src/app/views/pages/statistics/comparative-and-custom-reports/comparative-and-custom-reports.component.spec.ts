import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeAndCustomReportsComponent } from './comparative-and-custom-reports.component';

describe('ComparativeAndCustomReportsComponent', () => {
  let component: ComparativeAndCustomReportsComponent;
  let fixture: ComponentFixture<ComparativeAndCustomReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparativeAndCustomReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparativeAndCustomReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
