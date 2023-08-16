import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponentComponent } from './register-component.component';

describe('RegisterComponentComponent', () => {
  let component: RegisterComponentComponent;
  let fixture: ComponentFixture<RegisterComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponentComponent]
    });
    fixture = TestBed.createComponent(RegisterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
