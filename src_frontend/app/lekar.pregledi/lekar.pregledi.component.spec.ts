import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarPreglediComponent } from './lekar.pregledi.component';

describe('LekarPreglediComponent', () => {
  let component: LekarPreglediComponent;
  let fixture: ComponentFixture<LekarPreglediComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LekarPreglediComponent]
    });
    fixture = TestBed.createComponent(LekarPreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
