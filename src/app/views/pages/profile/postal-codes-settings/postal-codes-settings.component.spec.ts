import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalCodesSettingsComponent } from './postal-codes-settings.component';

describe('PostalCodesSettingsComponent', () => {
  let component: PostalCodesSettingsComponent;
  let fixture: ComponentFixture<PostalCodesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostalCodesSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostalCodesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
