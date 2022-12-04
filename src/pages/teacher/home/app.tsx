/**
 * @app VuonDau
 * @author phutruongck
 */

import {BsFillCalendar3WeekFill} from 'react-icons/bs';
import {FaDiscourse} from 'react-icons/fa';
import {MdClass} from 'react-icons/md';
import {Link} from 'react-router-dom';
import React from 'react';
import {TEACHER_URL_PAGE} from '@/router/teacher/navigation';
import './styles.scss';

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  return (
    <div className="teacher__page__container">
      <Link to={TEACHER_URL_PAGE.COURSE.CHILD.LIST.PATH}>
        <div className="teacher__item__container">
          <FaDiscourse
            size={30}
            style={{
              marginBottom: 10,
            }}
          />
          <div>Quản lý khoá học</div>
        </div>
      </Link>
      <Link to={TEACHER_URL_PAGE.CLASS.CHILD.LIST.PATH}>
        <div className="teacher__item__container">
          <MdClass
            size={30}
            style={{
              marginBottom: 10,
            }}
          />
          <div>Quản lý lớp học</div>
        </div>
      </Link>
      <Link to={TEACHER_URL_PAGE.TIME_TABLE.CHILD.CREATE.PATH}>
        <div className="teacher__item__container">
          <BsFillCalendar3WeekFill
            size={30}
            style={{
              marginBottom: 10,
            }}
          />
          <div>Thời khoá biểu</div>
        </div>
      </Link>
    </div>
  );
});

AppPage.displayName = 'AppPage';
export {AppPage};
