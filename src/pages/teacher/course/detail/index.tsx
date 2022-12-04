/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {TEACHER_URL_PAGE} from '@/router/teacher/navigation';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const TeacherDetailClassPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle={TEACHER_URL_PAGE.CLASS.CHILD.DETAIL.TITLE}>
      <AppPage />
    </WithLayout>
  );
};

export default TeacherDetailClassPage;
