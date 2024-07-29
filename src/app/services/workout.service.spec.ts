import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { workout, data } from '../model';
import { map } from 'rxjs/operators';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateToggle()', () => {
    it('should update the toggle value', () => {
      service.updateToggle(true);
      expect(service.getToggle()).toBe(true);

      service.updateToggle(false);
      expect(service.getToggle()).toBe(false);
    });
  });

  describe('getToggle()', () => {
    it('should return the current toggle value', () => {
      expect(service.getToggle()).toBe(false);
      service.updateToggle(true);
      expect(service.getToggle()).toBe(true);
    });
  });

  describe('addWorkout()', () => {
    it('should add a workout if form value is not empty', () => {
      const form = { value: { workouts: 'Running', minutes: '30' } } as NgForm;
      const prevData: workout[] = [];
      const result = service.addWorkout(form, prevData);

      expect(result).toEqual([{ type: 'Running', minutes: '30' }]);
    });

    it('should not add a workout if form value is empty', () => {
      const form = { value: { workouts: '', minutes: '30' } } as NgForm;
      const prevData: workout[] = [{ type: 'Running', minutes: 30 }];
      const result = service.addWorkout(form, prevData);

      expect(result).toEqual(prevData);
    });
  });

  describe('calcTotalMinutes()', () => {
    it('should calculate total minutes from workout data', () => {
      const data: workout[] = [
        { type: 'Running', minutes: 30 },
        { type: 'Swimming', minutes: 45 },
      ];
      const result = service.calcTotalMinutes(data);

      expect(result).toBe(75);
    });

    it('should return 0 if no data is provided', () => {
      const result = service.calcTotalMinutes([]);

      expect(result).toBe(0);
    });
  });

  describe('searchByName()', () => {
    it('should filter data by name', (done) => {
      const searchValue = 'John Doe';
      const data$: Observable<data> = of([
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 },
          ],
          total_minutes: 75,
        },
      ]);

      service.searchByName(searchValue, data$).subscribe((result) => {
        expect(result).toEqual([
          {
            id: 1,
            name: 'John Doe',
            workouts: [
              { type: 'Running', minutes: 30 },
              { type: 'Cycling', minutes: 45 },
            ],
            total_minutes: 75,
          },
        ]);
        done();
      });
    });
  });
  describe('filterByWorkout()', () => {
    it('should filter data by workout type', (done) => {
      const filterValue = 'Running';
      const data$: Observable<data> = of([
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 },
          ],
          total_minutes: 75,
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 },
          ],
          total_minutes: 80,
        },
        {
          id: 3,
          name: 'Michael Brown',
          workouts: [
            { type: 'Cycling', minutes: 50 },
            { type: 'Yoga', minutes: 30 },
          ],
          total_minutes: 80,
        },
      ]);

      service.filterByWorkout(filterValue, data$).subscribe((result) => {
        expect(result).toEqual([
          {
            id: 1,
            name: 'John Doe',
            workouts: [
              { type: 'Running', minutes: 30 },
              { type: 'Cycling', minutes: 45 },
            ],
            total_minutes: 75,
          },
          {
            id: 2,
            name: 'Jane Smith',
            workouts: [
              { type: 'Swimming', minutes: 60 },
              { type: 'Running', minutes: 20 },
            ],
            total_minutes: 80,
          },
        ]);
        done();
      });
    });
  });
  describe('pagination()', () => {
    it('should create an array of page numbers based on data length and items per page', (done) => {
      const perPage = 2;
      const data$: Observable<data> = of([
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 },
          ],
          total_minutes: 75,
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 },
          ],
          total_minutes: 80,
        },
        {
          id: 3,
          name: 'Michael Brown',
          workouts: [
            { type: 'Cycling', minutes: 50 },
            { type: 'Yoga', minutes: 30 },
          ],
          total_minutes: 80,
        },
      ]);

      service.pagination(data$, perPage).subscribe((result) => {
        expect(result).toEqual([1, 2]);
        done();
      });
    });
  });

  describe('loadPageData()', () => {
    it('should load data for the specified page based on items per page', (done) => {
      const perPage = 2;
      const page = 2;
      const data$: Observable<data> = of([
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 },
          ],
          total_minutes: 75,
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 },
          ],
          total_minutes: 80,
        },
        {
          id: 3,
          name: 'Michael Brown',
          workouts: [
            { type: 'Cycling', minutes: 50 },
            { type: 'Yoga', minutes: 30 },
          ],
          total_minutes: 80,
        },
      ]);

      service.loadPageData(data$, page, perPage).subscribe((result) => {
        expect(result).toEqual([
          {
            id: 3,
            name: 'Michael Brown',
            workouts: [
              { type: 'Cycling', minutes: 50 },
              { type: 'Yoga', minutes: 30 },
            ],
            total_minutes: 80,
          },
        ]);
        done();
      });
    });
  });
});
