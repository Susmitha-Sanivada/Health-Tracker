import { createFeatureSelector } from '@ngrx/store';
import { data } from '../model';

export const selectData = createFeatureSelector<data>('add_workout');
