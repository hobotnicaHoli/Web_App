import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmenadzeraComponent } from './loginmenadzera.component';

describe('LoginmenadzeraComponent', () => {
  let component: LoginmenadzeraComponent;
  let fixture: ComponentFixture<LoginmenadzeraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginmenadzeraComponent]
    });
    fixture = TestBed.createComponent(LoginmenadzeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
