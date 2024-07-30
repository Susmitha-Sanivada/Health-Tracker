import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { data, workout } from '../model';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private toggleSubject = new BehaviorSubject<any>(false);
  toggle$ = this.toggleSubject.asObservable(); // Public observable
  constructor() {}
  updateToggle(val: boolean) {
    this.toggleSubject.next(val);
  }
  getToggle() {
    return this.toggleSubject.getValue();
  }

  addWorkout(form: NgForm, prevData: workout[] | []) {
    if (form.value.workouts !== '') {
      return [
        ...prevData,
        {
          type: form.value.workouts,
          minutes: form.value.minutes,
        },
      ];
    } else {
      return [...prevData];
    }
  }
  calcTotalMinutes(data: workout[] | []) {
    return data.reduce((acc, data) => {
      return acc + Number(data.minutes);
    }, 0);
  }
  searchByName(searchValue: string, data: Observable<data>) {
    return data.pipe(
      map((data) => data.filter((item) => item.name === searchValue))
    );
  }
  filterByWorkout(filterValue: string, data: Observable<data>) {
    return data.pipe(
      map((data) =>
        data.filter((item) =>
          item.workouts.some((workout) => {
            return workout.type === filterValue;
          })
        )
      )
    );
  }

  // whenever new data set is loaded then call this pagination to create the final pages array for the loaded dataset
  // creates the pages array
  pagination(data: Observable<data>, perPage: number) {
    return data.pipe(
      map((data) => Math.ceil(data.length / perPage)),
      map((numberOfPages) => {
        return Array.from({ length: numberOfPages }, (_, i) => i + 1);
      })
    );
  }

  // whenever the page changes call this to change the data set which is viewed
  //  creates the data of the clicked page according the pages array
  loadPageData(data: Observable<data>, page: number, perPage: number) {
    return data.pipe(
      map((array) => {
        return array.slice((page - 1) * perPage, perPage * page);
      })
    );
  }
}
