import { Action } from '@ngrx/store';

/* eslint-disable no-unused-vars */
export enum LoaderActionType {
  toggleLoader = 'toggleLoader'
}

export interface LoaderAction extends Action {
  type: LoaderActionType;
  show?: boolean
}
