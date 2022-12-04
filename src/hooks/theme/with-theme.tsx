/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {StudentLayout} from '@/layout/student-layout';
import {TeacherLayout} from '@/layout/teacher-layout';
import {AdminLayout} from '@/layout/admin-layout';
import {ITheme} from '@custom-type';

interface Props {}

const initTheme: ITheme = {
  studentLayout: StudentLayout,
  teacherLayout: TeacherLayout,
  adminLayout: AdminLayout,
};

const ThemeContext = React.createContext<ITheme>(initTheme);

const WithTheme: React.FC<Props> = ({children}) => {
  return (
    <ThemeContext.Provider
      value={{
        studentLayout: initTheme.studentLayout,
        teacherLayout: initTheme.teacherLayout,
        adminLayout: initTheme.adminLayout,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export {WithTheme, ThemeContext};
