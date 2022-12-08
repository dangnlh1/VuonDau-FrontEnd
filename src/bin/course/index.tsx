/**
 * @app VuonDau
 * @author phutruongck
 */

import {Link} from 'react-router-dom';
import React from 'react';
import {STUDENT_URL_PAGE} from '@/router/student/navigation';
import {CourseItem} from '@custom-type';
import './styles.scss';

interface Props {
  className?: string;
  data: CourseItem;
}

const CourseItemComponent: React.FC<Props> = React.memo(({data, className}) => {
  const courseURL = STUDENT_URL_PAGE.COURSE.CHILD.DETAIL.ROOT + '/' + data.id;

  return (
    <Link to={courseURL} className={`course__item__container ${className}`}>
      <div className="course__item__thumbnail__container">
        <img src={data.image || process.env.DEFAULT_THUMBNAIL} />
      </div>
      <div className="course__item__detail__container">
        <div className="course__item__information__container">
          <div className="course__item__name">{data.courseName}</div>
          <div className="course__item__author">
            Giáo viên: {data.teacherName}
          </div>
          <div className="course__item__author">Số lớp: {data.totalClass}</div>
        </div>
        <div className="course__item__subject__container">
          <div className="course__item__subject__heading">
            {data?.subject?.name}
          </div>
        </div>
      </div>
    </Link>
  );
});

CourseItemComponent.displayName = 'CourseItemComponent';
export {CourseItemComponent};
