/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const TeacherRegisterPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle={`Giảng dạy trên ${process.env.REACT_APP_TITLE}`}>
      <AppPage />
    </WithLayout>
  );
};

export default TeacherRegisterPage;
