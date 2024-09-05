import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryMapComponent } from './trajectory-map.component';

describe('TrajectoryMapComponent', () => {
  let component: TrajectoryMapComponent;
  let fixture: ComponentFixture<TrajectoryMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrajectoryMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrajectoryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
