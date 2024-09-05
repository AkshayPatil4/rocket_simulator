import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineThrustTemperatureComponent } from './engine-thrust-temperature.component';

describe('EngineThrustTemperatureComponent', () => {
  let component: EngineThrustTemperatureComponent;
  let fixture: ComponentFixture<EngineThrustTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineThrustTemperatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineThrustTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
