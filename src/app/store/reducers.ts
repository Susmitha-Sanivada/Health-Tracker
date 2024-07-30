import exp from 'constants';
import { data, initialData } from '../model';
import { createReducer } from '@ngrx/store';
import { addWorkout } from './actions';
import { on } from '@ngrx/store';

export const initialState: data = initialData;

export const addWorkoutReducer = createReducer(
  initialState,
  on(addWorkout, (state, { payload }) => {
    return [{ id: state.length + 1, ...payload }, ...state];
  })
);
