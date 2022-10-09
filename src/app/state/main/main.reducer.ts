import { MainState } from '../../types/main';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as MainActions from './main.actions';

export const initialState: MainState = {
  isLoading: false,
}

export const mainFeature = createFeature(
  {
    name: 'main',
    reducer: createReducer(
      initialState,
      on(MainActions.setLoadingOn, state => ({
        ...state,
        isLoading: true
      })),
      on(MainActions.setLoadingOff, state => ({
        ...state,
        isLoading: false
      })),
    )
  }
);
