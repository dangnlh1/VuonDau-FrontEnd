/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {useRouter} from '@/hooks';
import {IParams} from './init-data';
import {AppPage} from './app';

interface Props {}

const StudentSearchPage: React.FC<Props> = React.memo(() => {
  const {query} = useRouter<IParams>();
  const key = query['q'];

  return (
    <WithLayout pageTitle={key}>
      <AppPage />
    </WithLayout>
  );
});

export default StudentSearchPage;
