import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmptyComponent } from './dialog-empty.component';

describe('DialogEmptyComponent', () => {
  let component: DialogEmptyComponent;
  let fixture: ComponentFixture<DialogEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
