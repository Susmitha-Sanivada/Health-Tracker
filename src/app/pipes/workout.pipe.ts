import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { workout } from '../model';
@Pipe({
  name: 'workoutString',
  standalone: true,
})
export class WorkoutStringPipe implements PipeTransform {
  transform(workouts: workout[] | []): string {
    // a string with all the workout names sperated by spaces
    let str = workouts.reduce((acc, data) => {
      return acc + `${data.type} `;
    }, '');
    //  a string with replacing all the spaces with comma and ignoring the last space
    str = str.slice(0, str.length - 1).replace(/ /g, ',');
    return str;
  }
}
