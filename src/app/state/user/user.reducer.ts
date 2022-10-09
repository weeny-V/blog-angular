import { UserState } from '../../types/main';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as UserAction from '../user/user.actions';

export const initialState: UserState = {
  user: {
    _id: '',
    name: '',
    surname: '',
    email: '',
    facebookID: '',
    method: '',
    createdDate: '',
  },
}

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(UserAction.setUserInfo, (state, { user }) => ({...state, user })),
  )
});
