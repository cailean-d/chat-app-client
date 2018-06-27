import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsSoundComponent } from './notifications-sound.component';

describe('NotificationsSoundComponent', () => {
  let component: NotificationsSoundComponent;
  let fixture: ComponentFixture<NotificationsSoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsSoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
