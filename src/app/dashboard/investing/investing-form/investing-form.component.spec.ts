import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestingFormComponent } from './investing-form.component';

describe('InvestingFormComponent', () => {
  let component: InvestingFormComponent;
  let fixture: ComponentFixture<InvestingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestingFormComponent]
    });
    fixture = TestBed.createComponent(InvestingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
