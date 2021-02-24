import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalArchievedListComponent } from './hospital-archieved-list.component';

describe('HospitalArchievedListComponent', () => {
  let component: HospitalArchievedListComponent;
  let fixture: ComponentFixture<HospitalArchievedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalArchievedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalArchievedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
