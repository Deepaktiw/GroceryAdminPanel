import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDialogBoxComponent } from './global-dialog-box.component';

describe('GlobalDialogBoxComponent', () => {
  let component: GlobalDialogBoxComponent;
  let fixture: ComponentFixture<GlobalDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
