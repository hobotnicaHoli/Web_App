import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartoniComponent } from './kartoni.component';

describe('KartoniComponent', () => {
  let component: KartoniComponent;
  let fixture: ComponentFixture<KartoniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KartoniComponent]
    });
    fixture = TestBed.createComponent(KartoniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
