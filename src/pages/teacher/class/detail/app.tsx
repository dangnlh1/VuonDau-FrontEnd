/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Table} from 'rsuite';
import {dateTimeToShow, DATE_TIME_FORMAT} from '@/common/function/date-time';
import {initClassDetail, STATUS_CODES} from '@/common/constants';
import {useMemoriedSelector, useRouter} from '@/hooks';
import {ClassDetail, IStudent} from '@custom-type';
import {
  selectors as classSelectors,
  actions as classActions,
  models as classModels,
} from '@/ducks/class';
import {IParams} from './init-data';
import './styles.scss';

interface Props {}

const {Column, HeaderCell, Cell} = Table;

const AppPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {
    params: {id},
  } = useRouter<IParams>();

  const classDetailResponse: classModels.ClassDetailResponse =
    useMemoriedSelector(classSelectors.classDetail).response;

  const getClassDetailRequest = useCallback(
    (request: classModels.ClassDetailRequest) =>
      dispatch(classActions.classDetail.request(request)),
    [dispatch],
  );

  const resetClassDetail = useCallback(
    (request: classModels.ClassDetailResponse) =>
      dispatch(classActions.classDetail.success(request)),
    [dispatch],
  );

  useEffect(() => {
    getClassDetailRequest({
      id: +id,
    });
  }, [id]);

  useEffect(() => {
    return () => {
      resetClassDetail(classModels.initState.classDetail.response);
    };
  }, []);

  const classDetail = useMemo((): ClassDetail => {
    if (classDetailResponse.status === STATUS_CODES.OK) {
      if (
        classDetailResponse.data &&
        !Array.isArray(classDetailResponse.data)
      ) {
        const {data} = classDetailResponse;
        return data;
      }
    }
    return initClassDetail;
  }, [classDetailResponse]);

  const students = useMemo((): IStudent[] => {
    if (classDetail.students.length > 0) {
      return classDetail.students;
    }
    return [];
  }, [classDetail]);

  return (
    <div className="class__detail__container">
      <div className="class__detail__heading">
        {classDetail.name} (
        {dateTimeToShow(classDetail.startDate, DATE_TIME_FORMAT.DATE_FORMAT)} -{' '}
        {dateTimeToShow(classDetail.endDate, DATE_TIME_FORMAT.DATE_FORMAT)})
      </div>
      <div className="class__detail__number__of__student">
        Sĩ số: {classDetail.numberStudent} / {classDetail.maxNumberStudent}
      </div>
      <div className="class__detail__student__container">
        <Table
          affixHorizontalScrollbar
          data={students}
          rowHeight={100}
          cellBordered
          affixHeader
          autoHeight
          bordered
        >
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              HỌ VÀ TÊN
            </HeaderCell>
            <Cell
              children={(content: any) => {
                return (
                  <div className="class__detail__table__student__name">
                    <img className="img-response" src={content?.avatar} />
                    <div className="class__detail__student__name">
                      {content?.name}
                    </div>
                  </div>
                );
              }}
            />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              NGÀY SINH
            </HeaderCell>
            <Cell
              dataKey="birthday"
              renderCell={(content: string) => {
                return dateTimeToShow(content, DATE_TIME_FORMAT.DATE_FORMAT);
              }}
            />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              TRẠNG THÁI
            </HeaderCell>
            <Cell
              dataKey="active"
              renderCell={(content: any) => {
                return `${content}`;
              }}
            />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              BÀI TẬP ĐÃ LÀM
            </HeaderCell>
            <Cell
              dataKey=""
              renderCell={(content: any) => {
                return '';
              }}
            />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              ĐỀ THI ĐÃ LÀM
            </HeaderCell>
            <Cell
              dataKey=""
              renderCell={(content: any) => {
                return '';
              }}
            />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              EMAIL
            </HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell className="class__detail__table__header">
              SỐ ĐIỆN THOẠI
            </HeaderCell>
            <Cell dataKey="phoneNumber" />
          </Column>
        </Table>
      </div>
    </div>
  );
};

AppPage.displayName = 'AppPage';
export {AppPage};
