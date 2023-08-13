import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponentComponent } from './hero-component.component';

describe('HeroComponentComponent', () => {
  let component: HeroComponentComponent;
  let fixture: ComponentFixture<HeroComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponentComponent]
    });
    fixture = TestBed.createComponent(HeroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
