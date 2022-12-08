/**
 * @app VuonDau
 * @author phutruongck
 */

export type LoadingType = {
  loadingItems: string[];
};

export type UtilsState = {
  loading: LoadingType;
};

export const initUtilsState: UtilsState = {
  loading: {
    loadingItems: [],
  },
};

declare module '../../types' {
  export interface GlobalState {
    'utils/loading': UtilsState;
  }
}
