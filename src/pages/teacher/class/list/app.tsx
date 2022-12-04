/**
 * @app VuonDau
 * @author phutruongck
 */

import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';
import {Button, ButtonToolbar} from 'rsuite';
import {useDispatch} from 'react-redux';
import {TEACHER_URL_PAGE} from '@/router/teacher/navigation';
import {useMemoriedSelector, useRouter} from '@/hooks';
import {SearchForm} from '@/components/single-form';
import {STATUS_CODES} from '@/common/constants';
import {IClass} from '@custom-type';
import {
  selectors as classSelectors,
  actions as classActions,
  models as classModels,
} from '@/ducks/class';
import {ClassItemComponent} from './item';
import './styles.scss';

interface Props {}

const AppPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {history} = useRouter();

  const [classData, setClassData] = useState<IClass[]>([]);

  const allClassResponse: classModels.AllClassResponse = useMemoriedSelector(
    classSelectors.allClass,
  ).response;

  const createClassResponse: classModels.CreateClassResponse =
    useMemoriedSelector(classSelectors.createClass).response;

  const getAllClassRequest = useCallback(
    (request: classModels.AllClassRequest) =>
      dispatch(classActions.allClass.request(request)),
    [dispatch],
  );

  const resetAllClass = useCallback(
    (request: classModels.AllClassResponse) =>
      dispatch(classActions.allClass.success(request)),
    [dispatch],
  );

  useEffect(() => {
    getAllClassRequest({});
    return () => {
      resetAllClass(classModels.initState.allClass.response);
    };
  }, []);

  useEffect(() => {
    if (createClassResponse.status === STATUS_CODES.OK) {
      getAllClassRequest({});
    }
  }, [createClassResponse]);

  useEffect(() => {
    if (allClassResponse.status === STATUS_CODES.OK) {
      if (allClassResponse.data && Array.isArray(allClassResponse.data)) {
        const {data} = allClassResponse;
        setClassData(data);
      }
    } else {
      setClassData([]);
    }
  }, [allClassResponse]);

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
    if (classData && classData.length > 0) {
      return classData.map((item: IClass, index: number) => (
        <ClassItemComponent className="class__item" data={item} key={index} />
      ));
    }
    return [];
  };

  const handleOnFilter = (value: string) => {
    getAllClassRequest({
      q: value,
    });
  };

  const handleOnRedirect = () => {
    history.push(TEACHER_URL_PAGE.CLASS.CHILD.CREATE.PATH);
  };

  return (
    <div className="teacher__list__class__container">
      <div className="teacher__list__filter">
        <SearchForm
          placeholder="Lọc theo lớp học"
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
              Đăng ký lớp học
            </Button>
          </ButtonToolbar>
        </div>
      </div>
      <div className="teacher__list__content">
        <div className="teacher__list__heading">Danh sách lớp học</div>
        {classData.length > 0 ? (
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
