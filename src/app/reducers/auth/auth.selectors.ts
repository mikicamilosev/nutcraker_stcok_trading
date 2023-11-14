import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Define a feature selector for the data state
export const selectDataState = createFeatureSelector<AuthState>('data');

// Define a selector to get the specific data from the data state
export const getSomeData = createSelector(
  selectDataState,
  (state: AuthState) => state.username
);