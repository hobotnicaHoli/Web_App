import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjelekaraComponent } from './dodavanjelekara.component';

describe('DodavanjelekaraComponent', () => {
  let component: DodavanjelekaraComponent;
  let fixture: ComponentFixture<DodavanjelekaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjelekaraComponent]
    });
    fixture = TestBed.createComponent(DodavanjelekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
