import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsInviteComponent } from './friends-invite.component';

describe('FriendsInviteComponent', () => {
  let component: FriendsInviteComponent;
  let fixture: ComponentFixture<FriendsInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
