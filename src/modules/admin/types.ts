import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type AdminAction = ActionType<typeof actions>;

export type AdminState = {
  loading: boolean;
  error: Error | null;
  data: { message: string } | null;
};
