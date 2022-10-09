import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { mainFeature } from './main/main.reducer';
import { userFeature } from './user/user.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  mainFeature,
  userFeature,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
