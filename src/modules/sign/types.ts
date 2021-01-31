import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type SignAction = ActionType<typeof actions>;

export type SignState = {
  isLogin: boolean;
  loading: boolean;
  error: Error | null;
  data: { message: string } | null;
};
