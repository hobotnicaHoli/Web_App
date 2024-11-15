import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentiPreglediComponent } from './pacijenti.pregledi.component';

describe('PacijentiPreglediComponent', () => {
  let component: PacijentiPreglediComponent;
  let fixture: ComponentFixture<PacijentiPreglediComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacijentiPreglediComponent]
    });
    fixture = TestBed.createComponent(PacijentiPreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
