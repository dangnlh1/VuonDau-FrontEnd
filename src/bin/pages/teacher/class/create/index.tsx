/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';
import {TEACHER_URL_PAGE} from '@/router/teacher/navigation';

interface Props {}

const TeacherCreateClassPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle={TEACHER_URL_PAGE.CLASS.CHILD.CREATE.TITLE}>
      <AppPage />
    </WithLayout>
  );
};

export default TeacherCreateClassPage;
