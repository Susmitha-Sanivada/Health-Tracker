import { TestBed } from '@angular/core/testing';
import { WorkoutStringPipe } from './workout.pipe';
import { workout } from '../model';

describe('WorkoutStringPipe', () => {
  let pipe: WorkoutStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutStringPipe],
    });
    pipe = TestBed.inject(WorkoutStringPipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform an array of workouts into a comma-separated string', () => {
    const workouts: workout[] = [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
      { type: 'Swimming', minutes: 60 },
    ];
    const transformedValue = pipe.transform(workouts);
    expect(transformedValue).toBe('Running,Cycling,Swimming');
  });

  it('should handle an empty array', () => {
    const workouts: workout[] = [];
    const transformedValue = pipe.transform(workouts);
    expect(transformedValue).toBe('');
  });

  it('should handle an array with one workout', () => {
    const workouts: workout[] = [{ type: 'Running', minutes: 30 }];
    const transformedValue = pipe.transform(workouts);
    expect(transformedValue).toBe('Running');
  });

  it('should handle an array with multiple workouts including duplicates', () => {
    const workouts: workout[] = [
      { type: 'Running', minutes: 30 },
      { type: 'Running', minutes: 45 },
      { type: 'Cycling', minutes: 60 },
    ];
    const transformedValue = pipe.transform(workouts);
    expect(transformedValue).toBe('Running,Running,Cycling');
  });
});
