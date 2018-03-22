import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreRootComponent } from './restore-root.component';

describe('RestoreRootComponent', () => {
  let component: RestoreRootComponent;
  let fixture: ComponentFixture<RestoreRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
