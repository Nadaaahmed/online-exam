import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordLayout } from './forgot-password-layout';

describe('ForgotPasswordLayout', () => {
  let component: ForgotPasswordLayout;
  let fixture: ComponentFixture<ForgotPasswordLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
