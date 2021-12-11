import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { HttpParams } from 'src/app/interfaces/http-params';
import { AppStoreState } from '../app-store.state';

export const selectParams: MemoizedSelector<AppStoreState, HttpParams> = createFeatureSelector('params');
