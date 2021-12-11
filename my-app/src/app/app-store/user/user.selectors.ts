import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import { AppStoreState } from '../app-store.state';

export const selectUser: MemoizedSelector<AppStoreState, User> = createFeatureSelector('user');
