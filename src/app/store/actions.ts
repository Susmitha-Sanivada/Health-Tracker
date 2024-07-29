import { createAction, props } from '@ngrx/store';
import { data, payloadData, userData } from '../model';

export const addWorkout = createAction(
  '[add-workout Component] add_workout',
  props<{ payload: payloadData }>()
);
