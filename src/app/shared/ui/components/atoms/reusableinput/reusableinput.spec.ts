import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reusableinput } from './reusableinput';

describe('Reusableinput', () => {
  let component: Reusableinput;
  let fixture: ComponentFixture<Reusableinput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reusableinput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reusableinput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
