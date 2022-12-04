/**
 * @app VuonDau
 * @author phutruongck
 */

export interface GlobalState {}

export const INIT_STATE = 'initState' as const;
export const RESET_STATE = 'resetState' as const;
export const RESET_ALL_STATE = 'resetAllState' as const;
export const RESET_TRANSACTION_STATE = 'resetTransactionState' as const;

export type Types =
  | typeof INIT_STATE
  | typeof RESET_STATE
  | typeof RESET_ALL_STATE
  | typeof RESET_TRANSACTION_STATE;
