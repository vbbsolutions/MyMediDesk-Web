import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDoctorSidebarComponent } from './app-doctor-sidebar.component';

describe('AppDoctorSidebarComponent', () => {
  let component: AppDoctorSidebarComponent;
  let fixture: ComponentFixture<AppDoctorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDoctorSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDoctorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
