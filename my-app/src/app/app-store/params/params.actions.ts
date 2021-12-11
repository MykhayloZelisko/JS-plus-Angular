/* eslint-disable no-unused-vars */
import { HttpParams } from 'src/app/interfaces/http-params';
import { ParamsAction, ParamsActionType } from './params.models';

export class UpdateParams implements ParamsAction {
  public readonly type: ParamsActionType = ParamsActionType.updateParams

  constructor(public params: HttpParams) {}
}


