import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerAzuriranjepacijentaComponent } from './menadzer.azuriranjepacijenta.component';

describe('MenadzerAzuriranjepacijentaComponent', () => {
  let component: MenadzerAzuriranjepacijentaComponent;
  let fixture: ComponentFixture<MenadzerAzuriranjepacijentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenadzerAzuriranjepacijentaComponent]
    });
    fixture = TestBed.createComponent(MenadzerAzuriranjepacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
