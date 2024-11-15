import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarRaznoComponent } from './lekar.razno.component';

describe('LekarRaznoComponent', () => {
  let component: LekarRaznoComponent;
  let fixture: ComponentFixture<LekarRaznoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LekarRaznoComponent]
    });
    fixture = TestBed.createComponent(LekarRaznoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
