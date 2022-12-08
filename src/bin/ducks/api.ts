/**
 * @app VuonDau
 * @author phutruongck
 */

export const API_URL_DEV = `${process.env.REACT_APP_URL_DEV}${process.env.REACT_APP_URL_BASE}`;
export const API_URL = `${process.env.REACT_APP_URL_DEV}${process.env.REACT_APP_URL_BASE}`;
export const API_UPLOAD = `${process.env.REACT_APP_URL_DEV}${process.env.SERVER_UPLOAD_IMAGE}`;

type WhiteListType = {
  url: string;
  method: string;
};

export const whiteList: WhiteListType[] = [];
