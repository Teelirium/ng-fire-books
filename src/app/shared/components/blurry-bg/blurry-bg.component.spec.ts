import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurryBgComponent } from './blurry-bg.component';

describe('BlurryBgComponent', () => {
  let component: BlurryBgComponent;
  let fixture: ComponentFixture<BlurryBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlurryBgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurryBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
