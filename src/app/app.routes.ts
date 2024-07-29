import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { UserWorkoutsComponent } from './user-workouts/user-workouts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add_workout', pathMatch: 'full' },
  { path: 'add_workout', component: AddWorkoutComponent },
  { path: 'user_workouts', component: UserWorkoutsComponent },
];
