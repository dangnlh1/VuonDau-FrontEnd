/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const ListCoursePage: React.FC<Props> = React.memo(() => {
  return (
    <WithLayout pageTitle="Khoá học">
      <AppPage />
    </WithLayout>
  );
});

export default ListCoursePage;
