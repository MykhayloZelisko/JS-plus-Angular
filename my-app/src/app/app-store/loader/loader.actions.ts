/* eslint-disable no-unused-vars */
import { LoaderAction, LoaderActionType } from './loader.models';


export class ToggleLoader implements LoaderAction {
  public readonly type: LoaderActionType = LoaderActionType.toggleLoader

  constructor() {}
}
