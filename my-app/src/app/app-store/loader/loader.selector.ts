import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AppStoreState } from '../app-store.state';

export const selectShow: MemoizedSelector<AppStoreState, boolean> = createFeatureSelector('show');
