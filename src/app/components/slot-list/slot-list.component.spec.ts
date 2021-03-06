import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotListComponent } from './slot-list.component';

describe('SlotListComponent', () => {
  let component: SlotListComponent;
  let fixture: ComponentFixture<SlotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
