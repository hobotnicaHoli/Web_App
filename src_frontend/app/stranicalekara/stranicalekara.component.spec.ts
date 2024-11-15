import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StranicalekaraComponent } from './stranicalekara.component';

describe('StranicalekaraComponent', () => {
  let component: StranicalekaraComponent;
  let fixture: ComponentFixture<StranicalekaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StranicalekaraComponent]
    });
    fixture = TestBed.createComponent(StranicalekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
