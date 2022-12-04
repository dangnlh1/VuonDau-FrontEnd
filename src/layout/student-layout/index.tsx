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

const StudentLayout: React.FC<Props> = React.memo(({children}) => {
  return <Layout className="student__layout">{children}</Layout>;
});

StudentLayout.displayName = 'StudentLayout';
export {StudentLayout};
