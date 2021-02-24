import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalMyPatientsComponent } from './hospital-my-patients.component';

describe('HospitalMyPatientsComponent', () => {
  let component: HospitalMyPatientsComponent;
  let fixture: ComponentFixture<HospitalMyPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalMyPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalMyPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
