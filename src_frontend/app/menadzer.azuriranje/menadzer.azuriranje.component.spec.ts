import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerAzuriranjeComponent } from './menadzer.azuriranje.component';

describe('MenadzerAzuriranjeComponent', () => {
  let component: MenadzerAzuriranjeComponent;
  let fixture: ComponentFixture<MenadzerAzuriranjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenadzerAzuriranjeComponent]
    });
    fixture = TestBed.createComponent(MenadzerAzuriranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
