/**
 * @app VuonDau
 * @author phutruongck
 */

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '@custom-type' {
  interface IAppRoute {
    component: React.ReactNode;
    permission?: string[];
    type: ILayoutType;
    exact: boolean;
    path: string;
  }

  type ILayoutType = 'STUDENT' | 'ADMIN' | 'TEACHER' | 'BLANK';

  interface ILayoutContext {}

  interface INavigationItem {
    title: string;
    path: string;
  }

  interface INavigation {
    children?: INavigation[];
    permission?: string[];
    title: string;
    path: string;
    icon?: any;
  }

  interface IWithGlobal {
    filter: string;
    key: string;
  }

  interface IWithStudent {}

  interface ITheme {
    studentLayout: React.ReactNode;
    teacherLayout: React.ReactNode;
    adminLayout: React.ReactNode;
  }

  type CommonResponse<T, P = undefined | object> = {
    status: string | number;
    error_message?: string;
    data: T;
  };

  interface DataPaginate<T> {
    pageItemSize?: number;
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    pageSize?: number;
    first?: boolean;
    last?: boolean;
    items: T[];
  }

  type CommonResponsePaginate<T> = {
    status: string | number;
    error_message?: string;
    data: DataPaginate<T>;
  };

  type CommonRequest<T> = {
    commons?: string;
    sort?: string[];
    page?: number;
    size?: number;
    q?: string;
  } & T;

  type ResponseState<T> = {
    isLoading?: boolean;
    errors?: Error;
    response: T;
  };

  interface IAxiosError {
    error_message: string;
    status: string;
  }

  interface ItemType {
    extends?: (item: ItemType) => React.ReactNode;
    label: string | React.ReactNode;
    icon?: React.ReactNode;
    otherValue?: string;
    disabled?: boolean;
    value: string;
  }

  interface TeacherCourse {
    teacherName: string;
    isAllowed: boolean;
    teacherId: number;
    topicId: number;
  }

  interface IMoney {
    text?: string | number | null;
    prefix?: string;
    comma?: string;
  }

  interface IClass {
    maxNumberStudent: number;
    numberStudent: number;
    startDate: string;
    unitPrice: number;
    endDate: string;
    status: string;
    level: string;
    name: string;
    code: string;
    id: number;
  }

  interface IRole {
    code: string;
    name: string;
    id: number;
  }

  interface ITeacher {
    phoneNumber: string;
    birthday: string;
    username: string;
    active: boolean;
    avatar: string;
    email: string;
    name: string;
    role: IRole;
    id: number;
  }

  interface IStudent {
    phoneNumber: string;
    username: string;
    birthday: string;
    active: boolean;
    avatar: string;
    email: string;
    name: string;
    role: IRole;
    id: number;
  }

  interface IArchetype {
    createdByTeacherId: number;
    code: string;
    name: string;
    id: number;
  }

  interface IDayOfWeek {
    code: string;
    name: string;
    id: number;
  }

  interface ISlot {
    startTime: string;
    endTime: string;
    code: string;
    name: string;
    id: number;
  }

  interface IArchetypeTime {
    archetype: IArchetype;
    dayOfWeek: IDayOfWeek;
    slot: ISlot;
  }

  interface ITimeTable {
    archetypeTime: IArchetypeTime;
    slotNumber: number;
    date: string;
    id: number;
  }

  interface ClassDetail {
    maxNumberStudent: number;
    timeTable: ITimeTable[];
    numberStudent: number;
    students: IStudent[];
    course: CourseDetail;
    finalPrice: number;
    startDate: string;
    subject: ISubject;
    teacher: ITeacher;
    active: boolean;
    endDate: string;
    status: string;
    level: string;
    name: string;
    code: string;
    id: number;
  }

  interface CourseItem {
    finalPriceCourse: number;
    unitPriceCourse: number;
    teacherName: string;
    totalClass: number;
    courseName: string;
    subject: ISubject;
    image: string;
    grade: string;
    name: string;
    code: string;
    id: number;
  }

  interface IModule {
    visibleoncoursepage: number;
    uservisible: boolean;
    availability: string;
    noviewlink: boolean;
    completion: number;
    customdata: string;
    contextid: number;
    modplural: string;
    afterlink: string;
    instance: number;
    visible: number;
    modicon: string;
    modname: string;
    onclick: string;
    indent: number;
    name: string;
    url: string;
    id: number;
    dates: any;
  }

  interface IResource {
    hiddenbynumsections: number;
    resources: IResource[];
    summaryformat: number;
    uservisible: boolean;
    modules: IModule[];
    visible: number;
    summary: string;
    section: number;
    name: string;
    id: number;
  }

  interface CourseDetail {
    teacherCourse: TeacherCourse[];
    resources: IResource[];
    description: string;
    unitPrice: number;
    subject: ISubject;
    title: string;
    grade: string;
    image: string;
    clazz: IClass;
    name: string;
    code: string;
    id: number;
  }

  interface ISubject {
    courseIds: number[];
    code: string;
    name: string;
    id: number;
  }

  interface ITimeTableCustom {
    archetypeTime: IArchetypeTime;
    day: string;
  }

  interface ISlot {
    startTime: string;
    endTime: string;
    name: string;
    code: string;
    id: number;
  }

  interface IDayOfWeek {
    code: string;
    name: string;
    id: number;
  }

  interface SlotDow {
    dayOfWeekId: number;
    slotNumber: number;
    slotId: number;
    id: string;
  }
}
