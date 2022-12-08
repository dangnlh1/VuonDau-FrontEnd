/**
 * @app VuonDau
 * @author phutruongck
 */

export const SET_COLLAPSE = '[utils/layout] setCollapse' as const;
export const SET_PAGE_TITLE = '[utils/layout] setPageTitle' as const;
export const SET_PAGE_LOADING = '[utils/layout] setPageLoading' as const;
export const SET_LAYOUT_TYPE = '[utils/layout] setLayoutType' as const;
export const SET_PERMISSION = '[utils/layout] setPermission' as const;

export type Types =
  | typeof SET_COLLAPSE
  | typeof SET_PAGE_TITLE
  | typeof SET_PAGE_LOADING
  | typeof SET_LAYOUT_TYPE
  | typeof SET_PERMISSION;
