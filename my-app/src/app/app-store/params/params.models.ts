import { Action } from '@ngrx/store';
import { HttpParams } from 'src/app/interfaces/http-params';

/* eslint-disable no-unused-vars */
export enum ParamsActionType {
  updateParams = 'updateParams'
}

export interface ParamsAction extends Action {
  type: ParamsActionType;
  params?: HttpParams
}
