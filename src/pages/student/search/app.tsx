/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {CourseItemComponent} from '@/components/course';
import {useMemoriedSelector, useRouter} from '@/hooks';
import {Pagination} from '@/components/pagination';
import {STATUS_CODES} from '@/common/constants';
import {CourseItem} from '@custom-type';
import {
  selectors as searchSelectors,
  actions as searchActions,
  models as searchModels,
} from '@/ducks/search';
import './styles.scss';
import {IParams} from './init-data';
import './styles.scss';

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const {query} = useRouter<IParams>();
  const dispatch = useDispatch();
  const key = query['q'];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);

  const searchCourseResponse: searchModels.SearchCourseResponse =
    useMemoriedSelector(searchSelectors.searchCourse).response;

  const searchCourseRequest = useCallback(
    (request: searchModels.SearchCourseRequest) =>
      dispatch(searchActions.searchCourse.request(request)),
    [dispatch],
  );

  const onReset = useCallback(() => {
    const {items} = searchCourseResponse.data;
    if (items && Array.isArray(items)) {
      return items;
    }
    return [];
  }, [searchCourseResponse]);

  useLayoutEffect(() => {
    searchCourseRequest({
      q: key,
    });
  }, [key]);

  useEffect(() => {
    if (searchCourseResponse.status === STATUS_CODES.OK) {
      const total = searchCourseResponse.data.totalItems;
      let dropdown: any[] = onReset();
      setTotal(total || 1);
      setData(dropdown);
    } else {
      setData([]);
      setTotal(1);
    }
  }, [searchCourseResponse]);

  const renderItem = () => {
    if (data && data.length > 0) {
      return data.map((item: CourseItem, index: number) => (
        <CourseItemComponent
          className="search__course__item__container"
          data={item}
          key={index}
        />
      ));
    }
    return (
      <div className="search__course__not__found">
        Không tìm thấy kết quả nào!
      </div>
    );
  };

  const handleOnPageChange = (page: number) => {
    const curPage = page - 1;
    setCurrentPage(page);
    searchCourseRequest({
      page: curPage,
      q: key,
    });
  };

  return (
    <div className="search__course__section">
      <div className="search__course__container">{renderItem()}</div>
      {data.length > 0 ? (
        <div className="search__course__paginate">
          <Pagination
            onPageChange={handleOnPageChange}
            defaultCurrent={currentPage}
            total={total}
          />
        </div>
      ) : undefined}
    </div>
  );
});

AppPage.displayName = 'AppPage';
export {AppPage};
