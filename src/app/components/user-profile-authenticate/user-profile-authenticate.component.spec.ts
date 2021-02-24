import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAuthenticateComponent } from './user-profile-authenticate.component';

describe('UserProfileAuthenticateComponent', () => {
  let component: UserProfileAuthenticateComponent;
  let fixture: ComponentFixture<UserProfileAuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileAuthenticateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
