import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagerComponent } from './imager.component';

describe('ImagerComponent', () => {
  let component: ImagerComponent;
  let fixture: ComponentFixture<ImagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
