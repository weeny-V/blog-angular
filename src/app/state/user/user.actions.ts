import { createAction, props } from '@ngrx/store';
import { User } from '../../types/main';

export const setUserInfo = createAction('[App] Set User Info', props<{ user: User }>());
