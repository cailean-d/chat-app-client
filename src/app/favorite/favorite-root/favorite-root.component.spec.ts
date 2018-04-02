import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRootComponent } from './favorite-root.component';

describe('FavoriteRootComponent', () => {
  let component: FavoriteRootComponent;
  let fixture: ComponentFixture<FavoriteRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
