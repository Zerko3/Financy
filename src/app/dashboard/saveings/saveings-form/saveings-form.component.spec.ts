import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveingsFormComponent } from './saveings-form.component';

describe('SaveingsFormComponent', () => {
  let component: SaveingsFormComponent;
  let fixture: ComponentFixture<SaveingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveingsFormComponent]
    });
    fixture = TestBed.createComponent(SaveingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
