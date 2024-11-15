import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenalozinkemenadzerComponent } from './promenalozinkemenadzer.component';

describe('PromenalozinkemenadzerComponent', () => {
  let component: PromenalozinkemenadzerComponent;
  let fixture: ComponentFixture<PromenalozinkemenadzerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenalozinkemenadzerComponent]
    });
    fixture = TestBed.createComponent(PromenalozinkemenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
