import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsRootComponent } from './settings-root.component';

describe('SettingsRootComponent', () => {
  let component: SettingsRootComponent;
  let fixture: ComponentFixture<SettingsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
