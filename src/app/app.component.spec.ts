import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { WorkoutService } from './services/workout.service';

// Mock Router
class RouterStub {
  navigate(params: any) {}
}

// Mock WorkoutService
class WorkoutServiceStub {
  getToggle() {
    return false;
  }

  updateToggle(toggle: boolean) {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let service: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent], // Use AppComponent as standalone
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: WorkoutService, useClass: WorkoutServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Health-Tracker"', () => {
    expect(component.title).toBe('Health-Tracker');
  });

  it('should have initial toggle value as false', () => {
    expect(component.toggle).toBe(false);
  });

  it('should navigate to "/add_workout" when buttonActive1 is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.buttonActive1();
    expect(navigateSpy).toHaveBeenCalledWith(['/add_workout']);
  });

  it('should navigate to "/user_workouts" when buttonActive2 is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.buttonActive2();
    expect(navigateSpy).toHaveBeenCalledWith(['/user_workouts']);
  });

  it('should toggle the value and call service.updateToggle on onSwitchMode', () => {
    const updateToggleSpy = spyOn(service, 'updateToggle');
    component.onSwitchMode();
    expect(component.toggle).toBe(true);
    expect(updateToggleSpy).toHaveBeenCalledWith(true);
    component.onSwitchMode();
    expect(component.toggle).toBe(false);
    expect(updateToggleSpy).toHaveBeenCalledWith(false);
  });
});
