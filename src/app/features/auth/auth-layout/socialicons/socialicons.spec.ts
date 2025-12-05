import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Socialicons } from './socialicons';

describe('Socialicons', () => {
  let component: Socialicons;
  let fixture: ComponentFixture<Socialicons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Socialicons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Socialicons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
