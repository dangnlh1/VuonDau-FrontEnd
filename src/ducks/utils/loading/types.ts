/**
 * @app VuonDau
 * @author phutruongck
 */

export const ADD_REQUEST_ID = 'utils/loading/addRequestId' as const;
export const DELETE_REQUEST_ID = 'utils/loading/deleteRequestId' as const;

export type Types = typeof ADD_REQUEST_ID | typeof DELETE_REQUEST_ID;
