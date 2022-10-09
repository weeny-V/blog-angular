import { createSelector } from '@ngrx/store';
import { userFeature } from './user.reducer';

export const getUser = createSelector(
  userFeature.selectUser,
  (user) => ({ user }),
)

export const getUserFullName = createSelector(
  userFeature.selectUser,
  (user) => {
    return `${user.name} ${user.surname}`;
  },
);

export const getUserEmail = createSelector(
  userFeature.selectUser,
  (user) => {
    return user.email;
  }
)
