/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {WithLayout} from '@/layout';
import {AppPage} from './app';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  return (
    <WithLayout pageTitle="Đăng ký">
      <AppPage />
    </WithLayout>
  );
};

export default RegisterPage;
