import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignButtonsComponent } from './campaign-buttons.component';

describe('CampaignFooterComponent', () => {
  let component: CampaignButtonsComponent;
  let fixture: ComponentFixture<CampaignButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
