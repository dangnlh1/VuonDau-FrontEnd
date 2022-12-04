/**
 * @app VuonDau
 * @author phutruongck
 */

import {Layout} from 'antd';
import React from 'react';
import './styles.scss';

interface Props {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<Props> = React.memo(({children}) => {
  return <Layout className="site-layout">{children}</Layout>;
});

AdminLayout.displayName = 'AdminLayout';
export {AdminLayout};
