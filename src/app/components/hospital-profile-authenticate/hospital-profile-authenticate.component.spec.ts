import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalProfileAuthenticateComponent } from './hospital-profile-authenticate.component';

describe('HospitalProfileAuthenticateComponent', () => {
  let component: HospitalProfileAuthenticateComponent;
  let fixture: ComponentFixture<HospitalProfileAuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalProfileAuthenticateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalProfileAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
