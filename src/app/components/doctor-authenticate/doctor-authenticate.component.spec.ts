import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAuthenticateComponent } from './doctor-authenticate.component';

describe('DoctorAuthenticateComponent', () => {
  let component: DoctorAuthenticateComponent;
  let fixture: ComponentFixture<DoctorAuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAuthenticateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
