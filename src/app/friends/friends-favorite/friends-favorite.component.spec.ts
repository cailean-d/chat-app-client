import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsFavoriteComponent } from './friends-favorite.component';

describe('FriendsFavoriteComponent', () => {
  let component: FriendsFavoriteComponent;
  let fixture: ComponentFixture<FriendsFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
