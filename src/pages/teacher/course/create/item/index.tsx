/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {CourseDetail} from '@custom-type';
import './styles.scss';

interface Props {
  setCourseSelected: Function;
  courseSelected: number;
  className?: string;
  data: CourseDetail;
}

const CourseItemComponent: React.FC<Props> = React.memo(
  ({data, className, setCourseSelected, courseSelected}) => {
    const handleOnClick = () => {
      setCourseSelected(data.id);
    };

    return (
      <div
        className={`course__subject__item__container ${className} ${
          courseSelected === data.id ? 'selected' : undefined
        }`}
        onClick={handleOnClick}
      >
        <div className="course__subject__item__thumbnail__container">
          <img src={data.image || process.env.DEFAULT_THUMBNAIL} />
        </div>
        <div className="course__subject__item__detail__container">
          <div className="course__subject__item__information__container">
            <div className="course__subject__item__name">{data?.name}</div>
            <div className="course__subject__item__author">
              {data?.description}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CourseItemComponent.displayName = 'CourseItemComponent';
export {CourseItemComponent};
