import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderNavbarComponent } from './provider-navbar.component';

describe('ProviderNavbarComponent', () => {
  let component: ProviderNavbarComponent;
  let fixture: ComponentFixture<ProviderNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
