import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjepregledaComponent } from './azuriranjepregleda.component';

describe('AzuriranjepregledaComponent', () => {
  let component: AzuriranjepregledaComponent;
  let fixture: ComponentFixture<AzuriranjepregledaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzuriranjepregledaComponent]
    });
    fixture = TestBed.createComponent(AzuriranjepregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
