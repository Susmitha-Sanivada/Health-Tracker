import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { payloadData, workout } from '../model';
import { Store } from '@ngrx/store';
import { addWorkout } from '../store/actions';
import { selectData } from '../store/selectors';
import { CommonModule, NgFor } from '@angular/common';
import { WorkoutService } from '../services/workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.scss',
})
export class AddWorkoutComponent implements OnInit, OnDestroy {
  toggle!: boolean;
  toggleSubscription!: Subscription;
  data: any;
  payloadData!: payloadData | null;
  workoutsData: workout[] | [] = [];
  totalMinutes!: number;
  errMsg: string = '';
  filterValue: string = '';
  ngOnInit(): void {
    this.toggleSubscription = this.service.toggle$.subscribe((data) => {
      this.toggle = data;
    });
  }
  constructor(private store: Store, private service: WorkoutService) {
    this.data = this.store.select(selectData);
  }
  onAddMore(form: NgForm) {
    // adding workouts more than one when clicked on add more button

    this.workoutsData = this.service.addWorkout(form, this.workoutsData);

    // resetting values as default for select another workout
    form.form.patchValue({ workouts: '', minutes: '' });
  }
  onAdd(form: NgForm) {
    if (form.valid) {
      this.errMsg = '';
      //

      //
      // adding the workout which is just clicked before the add button

      this.workoutsData = this.service.addWorkout(form, this.workoutsData);

      // calculating the total minutes before dispatching the add workout action
      this.totalMinutes = this.service.calcTotalMinutes(this.workoutsData);

      // setting the payload data
      this.payloadData = {
        name: form.value.username,
        workouts: this.workoutsData,
        total_minutes: this.totalMinutes,
      };
      //

      // dispatching the action
      this.store.dispatch(addWorkout({ payload: this.payloadData }));

      // restting the form values to the default values
      form.reset();
      this.filterValue = '';
      this.payloadData = null;
    } else {
      this.errMsg = 'Please fill out every input field';
    }
    console.log(this.workoutsData, form);
  }
  ngOnDestroy(): void {
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }
  }
}
