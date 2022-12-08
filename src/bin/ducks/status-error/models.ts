/**
 * @app VuonDau
 * @author phutruongck
 */

export interface ErrorResponse {
  error_message: string;
  status: string;
}

export type StatusErrorType = {
  response?: ErrorResponse;
  message?: string;
  statusCode: number;
};

export type ApiResponseType = StatusErrorType;

export const initStatusErrorResponse: StatusErrorType = {
  statusCode: 200,
  message: '',
  response: {
    error_message: '',
    status: '',
  },
};

export type StatusErrorState = {
  statusError: StatusErrorType;
};

export const initState: StatusErrorState = {
  statusError: initStatusErrorResponse,
};

declare module '../types' {
  export interface GlobalState {
    statusError: StatusErrorState;
  }
}
