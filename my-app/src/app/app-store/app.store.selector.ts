/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AppStoreState } from './app-store.state';

export const selectFeature: MemoizedSelector<any, AppStoreState> = createFeatureSelector('app');
