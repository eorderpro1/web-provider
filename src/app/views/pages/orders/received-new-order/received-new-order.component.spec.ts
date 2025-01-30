import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedNewOrderComponent } from './received-new-order.component';

describe('ReceivedNewOrderComponent', () => {
  let component: ReceivedNewOrderComponent;
  let fixture: ComponentFixture<ReceivedNewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedNewOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
