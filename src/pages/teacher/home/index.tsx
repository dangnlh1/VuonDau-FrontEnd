/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const TeacherHomePage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle="Giáo viên">
      <AppPage />
    </WithLayout>
  );
};

export default TeacherHomePage;
