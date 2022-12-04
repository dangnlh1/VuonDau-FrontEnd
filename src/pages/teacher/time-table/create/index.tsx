/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const TeacherTimeTableListPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle="Thời khoá biểu">
      <AppPage />
    </WithLayout>
  );
};

export default TeacherTimeTableListPage;
