import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFooterComponent } from './campaign-footer.component';

describe('CampaignFooterComponent', () => {
  let component: CampaignFooterComponent;
  let fixture: ComponentFixture<CampaignFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
