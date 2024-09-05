import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttitudeVisualizationComponent } from './attitude-visualization.component';

describe('AttitudeVisualizationComponent', () => {
  let component: AttitudeVisualizationComponent;
  let fixture: ComponentFixture<AttitudeVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttitudeVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttitudeVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
