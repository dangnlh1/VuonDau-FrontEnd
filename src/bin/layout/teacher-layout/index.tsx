/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';

import './styles.scss';

interface Props {}

const TeacherLayout: React.FC<Props> = React.memo(({children}) => {
  return <div className="teacher__layout">{children}</div>;
});

TeacherLayout.displayName = 'TeacherLayout';
export {TeacherLayout};
