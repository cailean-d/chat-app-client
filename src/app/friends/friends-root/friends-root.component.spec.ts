import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsRootComponent } from './friends-root.component';

describe('FriendsRootComponent', () => {
  let component: FriendsRootComponent;
  let fixture: ComponentFixture<FriendsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
