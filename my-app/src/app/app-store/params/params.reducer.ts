import { Action } from '@ngrx/store';
import { HttpParams } from 'src/app/interfaces/http-params';
import { ParamsAction, ParamsActionType } from './params.models';

export function paramsReducer(state: HttpParams = { start: null, count: null, textFragment: '', sort: null },
  action: Action): HttpParams {
  switch (action.type) {
  case ParamsActionType.updateParams: {
    return {
      ...state,
      ...(action as ParamsAction).params
    };
  }
  default: {
    return state;
  }
  }
}
