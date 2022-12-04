/**
 * @app VuonDau
 * @author phutruongck
 */

import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import React, {useEffect, useMemo} from 'react';
import {CourseItemComponent} from '@/components/course';
import {PrevIcon} from '@/components/scroll/prev';
import {NextIcon} from '@/components/scroll/next';
import {STATUS_CODES} from '@/common/constants';
import {Carousel} from '@/components/carousel';
import {CourseItem} from '@custom-type';
import {useCommon} from '@/hooks';
import {initCarouselData} from './init-data';
import './styles.scss';

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const {allCourseResponse, getAllCourse} = useCommon();

  const allCourse = useMemo(() => {
    if (allCourseResponse.status === STATUS_CODES.OK) {
      if (allCourseResponse.data) {
        const {items} = allCourseResponse.data;
        return items;
      }
    }
    return [];
  }, [allCourseResponse]);

  useEffect(() => {
    getAllCourse({});
  }, []);

  const renderItem = () => {
    if (allCourse && allCourse.length > 0) {
      return allCourse.map((item: CourseItem, index: number) => (
        <CourseItemComponent
          className="home__course__item"
          data={item}
          key={index}
        />
      ));
    }
    return [];
  };

  return (
    <div className="home__page__container">
      <Carousel data={initCarouselData} />
      <div className="all__course__section">
        <div className="all__course__container">
          <div className="all__course__heading">Danh sách khoá học</div>
          <ScrollMenu
            scrollContainerClassName="all__course__scroll__item"
            wrapperClassName="all__course__scroll__container"
            transitionBehavior="smooth"
            RightArrow={NextIcon}
            LeftArrow={PrevIcon}
          >
            {renderItem()}
          </ScrollMenu>
        </div>
      </div>
    </div>
  );
});

AppPage.displayName = 'AppPage';
export {AppPage};
