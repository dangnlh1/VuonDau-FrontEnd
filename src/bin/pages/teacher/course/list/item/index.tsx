/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {CourseItem} from '@custom-type';
import './styles.scss';

interface Props {
  className?: string;
  data: CourseItem;
}

const CourseItemComponent: React.FC<Props> = React.memo(({data, className}) => {
  return (
    <div className={`class__item__container ${className}`}>
      <div className="class__item__detail__container">
        <div className="class__item__information__container">
          <div className="class__item__name">{data?.courseName}</div>
          <div className="class__item__number__student">
            Giáo viên: {data?.teacherName}
          </div>
          <div className="class__item__dateTime">
            <div className="class__item__dateTime__heading">
              Số lớp: {data.totalClass || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CourseItemComponent.displayName = 'CourseItemComponent';
export {CourseItemComponent};
