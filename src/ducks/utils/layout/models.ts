/**
 * @app VuonDau
 * @author phutruongck
 */

import {LAYOUT_TYPE} from '@/common/constants';
import {ILayoutType} from '@custom-type';

export interface ILayoutModal {
  layoutType: ILayoutType;
  permission: string[];
  pageLoading: boolean;
  collapse: boolean;
  pageTitle: string;
}

export type LayoutState = {
  layout: ILayoutModal;
};

export const initLayoutState: LayoutState = {
  layout: {
    layoutType: LAYOUT_TYPE.STUDENT,
    pageLoading: false,
    collapse: false,
    permission: [],
    pageTitle: '',
  },
};

declare module '../../types' {
  export interface GlobalState {
    'utils/layout': LayoutState;
  }
}
