import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviComponent } from './zahtevi.component';

describe('ZahteviComponent', () => {
  let component: ZahteviComponent;
  let fixture: ComponentFixture<ZahteviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZahteviComponent]
    });
    fixture = TestBed.createComponent(ZahteviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
