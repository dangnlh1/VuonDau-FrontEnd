/**
 * @app VuonDau
 * @author phutruongck
 */

import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import React, {useContext, useEffect, useState} from 'react';
import {AiFillPlusCircle} from 'react-icons/ai';
import {Button, ButtonToolbar} from 'rsuite';
import {useCommon, useMemoriedSelector, useRouter} from '@/hooks';
import {TEACHER_URL_PAGE} from '@/router/teacher/navigation';
import {SearchForm} from '@/components/single-form';
import {STATUS_CODES} from '@/common/constants';
import {CourseItem} from '@custom-type';
import {
  selectors as courseSelectors,
  models as courseModels,
} from '@/ducks/course';
import {CourseItemComponent} from './item';
import './styles.scss';

interface Props {}

const AppPage: React.FC<Props> = () => {
  const {history} = useRouter();
  const {allCourseResponse, getAllCourse} = useCommon();

  const [courseData, setCourseData] = useState<CourseItem[]>([]);

  useEffect(() => {
    getAllCourse({
      size: 1000,
    });
  }, []);

  useEffect(() => {
    if (allCourseResponse.status === STATUS_CODES.OK) {
      if (allCourseResponse.data && !Array.isArray(allCourseResponse.data)) {
        const {items} = allCourseResponse.data;
        setCourseData(items);
      }
    } else {
      setCourseData([]);
    }
  }, [allCourseResponse]);

  const createCourseResponse: courseModels.CreateCourseResponse =
    useMemoriedSelector(courseSelectors.createCourse).response;

  useEffect(() => {
    if (createCourseResponse.status === STATUS_CODES.OK) {
      getAllCourse({});
    }
  }, [createCourseResponse]);

  const LeftArrow = () => {
    const {scrollPrev} = useContext(VisibilityContext);
    return (
      <div className="checkbox__combo__scroll__arrow">
        <IoIosArrowBack
          onClick={() => scrollPrev()}
          color="#9b59b6"
          size={25}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
    );
  };

  const RightArrow = () => {
    const {scrollNext} = useContext(VisibilityContext);
    return (
      <div className="checkbox__combo__scroll__arrow">
        <IoIosArrowForward
          onClick={() => scrollNext()}
          color="#9b59b6"
          size={25}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
    );
  };

  const renderItem = () => {
    if (courseData && courseData.length > 0) {
      return courseData.map((item: CourseItem, index: number) => (
        <CourseItemComponent className="class__item" data={item} key={index} />
      ));
    }
    return [];
  };

  const handleOnFilter = (value: string) => {
    getAllCourse({
      q: value,
    });
  };

  const handleOnRedirect = () => {
    history.push(TEACHER_URL_PAGE.COURSE.CHILD.CREATE.PATH);
  };

  return (
    <div className="teacher__list__class__container">
      <div className="teacher__list__filter">
        <SearchForm
          placeholder="Lọc theo khoá học"
          onChangeInput={handleOnFilter}
        />
        <div className="teacher__list__button">
          <ButtonToolbar
            style={{
              marginTop: 20,
            }}
          >
            <Button
              onClick={handleOnRedirect}
              appearance="primary"
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                display: 'flex',
              }}
            >
              <AiFillPlusCircle
                size={20}
                style={{
                  marginRight: 10,
                }}
              />
              Đăng ký khoá học
            </Button>
          </ButtonToolbar>
        </div>
      </div>
      <div className="teacher__list__content">
        <div className="teacher__list__heading">Danh sách khoá học</div>
        {courseData.length > 0 ? (
          <div className="class__content__container">
            <ScrollMenu
              scrollContainerClassName="class__scroll__item"
              wrapperClassName="class__scroll__container"
              transitionBehavior="smooth"
              RightArrow={RightArrow}
              LeftArrow={LeftArrow}
            >
              {renderItem()}
            </ScrollMenu>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

AppPage.displayName = 'AppPage';
export {AppPage};
