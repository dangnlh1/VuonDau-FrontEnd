/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {TEACHER_URL_PAGE} from '@/router/teacher/navigation';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const TeacherListClassPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle={TEACHER_URL_PAGE.CLASS.CHILD.LIST.TITLE}>
      <AppPage />
    </WithLayout>
  );
};

export default TeacherListClassPage;
