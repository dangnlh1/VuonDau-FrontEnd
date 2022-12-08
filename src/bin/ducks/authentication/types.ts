/**
 * @app VuonDau
 * @author phutruongck
 */

// [Authentication API] Student Register
export const STUDENT_REGISTER_REQUEST =
  'authentication/studentRegisterRequest' as const;
export const STUDENT_REGISTER_SUCCESS =
  'authentication/studentRegisterSuccess' as const;
export const STUDENT_REGISTER_FAILURE =
  'authentication/studentRegisterFailure' as const;

// [Authentication API] Teacher Register
export const TEACHER_REGISTER_REQUEST =
  'authentication/teacherRegisterRequest' as const;
export const TEACHER_REGISTER_SUCCESS =
  'authentication/teacherRegisterSuccess' as const;
export const TEACHER_REGISTER_FAILURE =
  'authentication/teacherRegisterFailure' as const;

export type Types =
  | typeof STUDENT_REGISTER_REQUEST
  | typeof STUDENT_REGISTER_SUCCESS
  | typeof STUDENT_REGISTER_FAILURE
  | typeof TEACHER_REGISTER_REQUEST
  | typeof TEACHER_REGISTER_SUCCESS
  | typeof TEACHER_REGISTER_FAILURE;
