import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveingsComponent } from './saveings.component';

describe('SaveingsComponent', () => {
  let component: SaveingsComponent;
  let fixture: ComponentFixture<SaveingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveingsComponent]
    });
    fixture = TestBed.createComponent(SaveingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
