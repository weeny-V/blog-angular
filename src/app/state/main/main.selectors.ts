import { createSelector } from '@ngrx/store';
import { mainFeature } from './main.reducer';

export const selectLoading = createSelector(
  mainFeature.selectIsLoading,
  (isLoading) => ({ isLoading })
);
