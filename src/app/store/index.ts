import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { addWorkoutReducer } from './reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  add_workout: addWorkoutReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
