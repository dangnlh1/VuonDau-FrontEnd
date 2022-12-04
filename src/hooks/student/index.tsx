/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {StudentSideNav} from '@/layout/student-layout/sidenav';
import {IWithStudent} from '@custom-type';

const initStudentContext: IWithStudent = {};

const StudentContext = React.createContext<IWithStudent>(initStudentContext);

interface Props {
  children?: React.ReactNode;
}

const WithStudent: React.FC<Props> = ({children}) => {
  return (
    <StudentContext.Provider value={{}}>
      <StudentSideNav />
      {children}
    </StudentContext.Provider>
  );
};

export {WithStudent, StudentContext};
