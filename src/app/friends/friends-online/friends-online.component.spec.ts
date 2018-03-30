import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsOnlineComponent } from './friends-online.component';

describe('FriendsOnlineComponent', () => {
  let component: FriendsOnlineComponent;
  let fixture: ComponentFixture<FriendsOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
