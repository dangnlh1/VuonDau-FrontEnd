/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const StudentHomePage: React.FC<Props> = React.memo(() => {
  return (
    <WithLayout pageTitle="Trang chủ">
      <AppPage />
    </WithLayout>
  );
});

export default StudentHomePage;
