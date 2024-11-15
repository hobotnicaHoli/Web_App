import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosenjeIzvestajaComponent } from './unosenje-izvestaja.component';

describe('UnosenjeIzvestajaComponent', () => {
  let component: UnosenjeIzvestajaComponent;
  let fixture: ComponentFixture<UnosenjeIzvestajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnosenjeIzvestajaComponent]
    });
    fixture = TestBed.createComponent(UnosenjeIzvestajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
