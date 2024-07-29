import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { UserWorkoutsComponent } from './user-workouts/user-workouts.component';
import { CommonModule } from '@angular/common';
import { WorkoutService } from './services/workout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddWorkoutComponent,
    UserWorkoutsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Health-Tracker';
  toggle: boolean = false;

  constructor(private router: Router, private service: WorkoutService) {}
  ngOnInit(): void {
    // this.toggle = this.service.getToggle();
  }
  buttonActive1() {
    this.router.navigate(['/add_workout']);
  }
  buttonActive2() {
    this.router.navigate(['/user_workouts']);
  }
  onSwitchMode() {
    this.service.updateToggle(!this.toggle);
    this.toggle = !this.toggle;
  }
}
