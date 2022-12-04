/**
 * @app VuonDau
 * @author phutruongck
 */

import {
  CourseDetail,
  ClassDetail,
  ILayoutType,
  ITimeTable,
  IDayOfWeek,
  CourseItem,
  ItemType,
  ISlot,
} from '@custom-type';

export const HEADER_HEIGHT = 20;

export const LIMIT_SIZE = 1024 * 1024 * 5;

export const TYPE_FORMAT_DATE = {
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  VN: 'DD-MM-YYYY',
  EN: 'MM-DD-YYYY',
};

export const PAGINATION = {
  PER_PAGE: 10,
  PAGE: 1,
};

export const TYPE_SORT = {
  NEWEST: 1,
  OLDEST: 2,
  DEADLINE_ASC: 3,
  DEADLINE_DESC: 4,
};

export const TYPE_IMAGES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/svg',
  'image/hec',
  'image/jpg',
  'image/heic',
];

export const TOAST_SHOW_TIME = 2000;

export const TOAST_SHOW_LONG_TIME = 2500;

export const BLANK_VALUE = '';

export const LENGTH: {[key: string]: number} = {
  USERNAME: 8,
  PASSWORD: 8,
};

export const STATUS_CODES = {
  FAILED: 'FAILED',
  ERROR: '500',
  OK: 'OK',
};

export const ACCOUNT_TYPE = {
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
};

export const noOptionsMessage = (_: {inputValue: string}) => 'Không có dữ liệu';

export const loadingMessage = (_: {inputValue: string}) =>
  'Đang tải dữ liệu...';

export const TINYMCE_CONFIG = {
  menubar: 'file edit view insert format tools table tc help',
  plugins:
    'print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking toc insertdatetime lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  mobile: {
    plugins:
      'print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link codesample table charmap hr pagebreak nonbreaking toc insertdatetime lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  },
  quickbars_selection_toolbar:
    'bold italic underline | blocks | bullist numlist | blockquote quicklink',
  quickbars_insert_toolbar: 'quicktable image',
  toolbar:
    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter | pagebreak | fullscreen preview image pageembed link codesample | a11ycheck',
};

export const BASIC_MODAL_SIZE = {
  XL: 'XL',
  L: 'L',
  MD: 'MD',
  SM: 'SM',
};

export const LAYOUT_TYPE: {[key: string]: ILayoutType} = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  BLANK: 'BLANK',
  ADMIN: 'ADMIN',
};

export const initPaginateCommon = {
  pageItemSize: 0,
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
  first: true,
  pageSize: 0,
  last: true,
  items: [],
};

export const dayOfWeeks: any = {
  ChuNhat: 0,
  ThuHai: 1,
  ThuBa: 2,
  ThuTu: 3,
  ThuNam: 4,
  ThuSau: 5,
  ThuBay: 6,
};

export const initItemType: ItemType = {
  label: '',
  value: '',
};

export const treeColors: string[] = [
  '#6D3700',
  '#964C00',
  '#EB7701',
  '#FF9F3E',
  '#FFD3A7',
];

export const genderDropdown: ItemType[] = [
  {
    label: 'Nam',
    value: 'male',
  },
  {
    label: 'Nữ',
    value: 'female',
  },
  {
    label: 'Khác',
    value: 'other',
  },
];

export const voiceDropdown: ItemType[] = [
  {
    label: 'Miền Bắc',
    value: 'bac',
  },
  {
    label: 'Miền Trung',
    value: 'trung',
  },
  {
    label: 'Miền Nam',
    value: 'nam',
  },
];

export const levelDropdown: ItemType[] = [
  {
    label: 'Tự do',
    value: 'tudo',
  },
  {
    label: 'Giáo viên',
    value: 'giaovien',
  },
  {
    label: 'Sinh viên',
    value: 'sinhvien',
  },
  {
    label: 'Cử nhân',
    value: 'cunhan',
  },
  {
    label: 'Kỹ sư',
    value: 'kysu',
  },
  {
    label: 'Thạc sĩ',
    value: 'thacsi',
  },
  {
    label: 'Tiến sĩ',
    value: 'tiensi',
  },
  {
    label: 'Giảng viên',
    value: 'giangvien',
  },
  {
    label: 'Bằng cấp khác',
    value: 'khac',
  },
];

export const STATUS_ERROR: {
  [key: string]: {
    error_message: string;
    statusCode: number;
    status: string;
  };
} = {
  ERR_NETWORK: {
    error_message: 'Không thể kết nối tới máy chủ!',
    statusCode: 500,
    status: 'FAILED',
  },
  ERR_BAD_REQUEST: {
    error_message: 'Không thể kết nối tới máy chủ!',
    statusCode: 500,
    status: 'FAILED',
  },
  ERR_BAD_RESPONSE: {
    error_message: 'Không thể kết nối tới máy chủ!',
    statusCode: 500,
    status: 'FAILED',
  },
  ERR_CONNECTION_REFUSED: {
    error_message: 'Không thể kết nối tới máy chủ!',
    statusCode: 500,
    status: 'FAILED',
  },
};

export const initCourse: CourseItem = {
  finalPriceCourse: 0,
  unitPriceCourse: 0,
  teacherName: '',
  courseName: '',
  totalClass: 0,
  grade: '',
  image: '',
  name: '',
  code: '',
  id: 0,
  subject: {
    courseIds: [],
    code: '',
    name: '',
    id: 0,
  },
};

export const initCourseDetail: CourseDetail = {
  teacherCourse: [],
  description: '',
  resources: [],
  unitPrice: 0,
  title: '',
  grade: '',
  image: '',
  name: '',
  code: '',
  id: 0,
  clazz: {
    maxNumberStudent: 0,
    numberStudent: 0,
    startDate: '',
    unitPrice: 0,
    endDate: '',
    status: '',
    level: '',
    name: '',
    code: '',
    id: 0,
  },
  subject: {
    courseIds: [],
    code: '',
    name: '',
    id: 0,
  },
};

export const initTimeTable: ITimeTable = {
  slotNumber: 0,
  date: '',
  id: 0,
  archetypeTime: {
    archetype: {
      createdByTeacherId: 0,
      code: '',
      name: '',
      id: 0,
    },
    dayOfWeek: {
      code: '',
      name: '',
      id: 0,
    },
    slot: {
      startTime: '',
      endTime: '',
      code: '',
      name: '',
      id: 0,
    },
  },
};

export const initClassDetail: ClassDetail = {
  course: initCourseDetail,
  maxNumberStudent: 0,
  numberStudent: 0,
  timeTable: [],
  startDate: '',
  active: false,
  finalPrice: 0,
  students: [],
  endDate: '',
  status: '',
  level: '',
  name: '',
  code: '',
  id: 0,
  teacher: {
    phoneNumber: '',
    active: false,
    username: '',
    birthday: '',
    avatar: '',
    email: '',
    name: '',
    id: 0,
    role: {
      name: '',
      code: '',
      id: 0,
    },
  },
  subject: {
    courseIds: [],
    code: '',
    name: '',
    id: 0,
  },
};

export const initSlot: ISlot = {
  startTime: '',
  endTime: '',
  name: '',
  code: '',
  id: 0,
};

export const initDayOfWeek: IDayOfWeek = {
  code: '',
  name: '',
  id: 0,
};
