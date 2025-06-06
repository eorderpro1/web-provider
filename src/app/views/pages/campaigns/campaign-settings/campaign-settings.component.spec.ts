import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSettingsComponent } from './campaign-settings.component';

describe('CampaignSettingsComponent', () => {
  let component: CampaignSettingsComponent;
  let fixture: ComponentFixture<CampaignSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
