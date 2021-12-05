import { Action } from '@ngrx/store';
import { LoaderActionType } from './loader.models';

export function loaderReducer(state = false, action: Action): boolean {
  switch (action.type) {
  case LoaderActionType.toggleLoader: {
    return !state;
  }
  default: {
    return state;
  }
  }
}
