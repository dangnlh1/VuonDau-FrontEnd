/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle="Đăng nhập">
      <AppPage />
    </WithLayout>
  );
};

export default LoginPage;
