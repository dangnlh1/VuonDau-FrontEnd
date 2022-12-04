/**
 * @app VuonDau
 * @author phutruongck
 */

import {AiFillClockCircle} from 'react-icons/ai';
import {SiGoogleclassroom} from 'react-icons/si';
import {FaUserFriends} from 'react-icons/fa';
import {IoWallet} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import React from 'react';
import {dateTimeToShow, DATE_TIME_FORMAT} from '@/common/function/date-time';
import {STUDENT_URL_PAGE} from '@/router/student/navigation';
import {formatMoney} from '@/common/function';
import {IClass} from '@custom-type';
import './styles.scss';

interface Props {
  className?: string;
  data: IClass;
}

const ClassItemComponent: React.FC<Props> = React.memo(({data, className}) => {
  return (
    <Link
      className={`class__item__container ${className}`}
      to={`${STUDENT_URL_PAGE.CLASS.CHILD.DETAIL.ROOT}/${data.id}`}
    >
      <div className="class__item__detail__container">
        <div className="class__item__information__container">
          <div className="class__item__name">
            <SiGoogleclassroom
              size={20}
              style={{
                marginRight: 5,
              }}
            />
            {data?.name}
          </div>
          <div className="class__item__number__student">
            <FaUserFriends
              size={16}
              style={{
                marginRight: 10,
              }}
            />
            {data?.numberStudent}/{data?.maxNumberStudent}
          </div>
          <div className="class__item__dateTime">
            <div className="class__item__dateTime__heading">
              <AiFillClockCircle
                style={{
                  marginRight: 10,
                }}
                size={16}
              />
              {dateTimeToShow(data.startDate, DATE_TIME_FORMAT.DATE_FORMAT)} -{' '}
              {dateTimeToShow(data.endDate, DATE_TIME_FORMAT.DATE_FORMAT)}
            </div>
            <div className="class__item__price__heading">
              <IoWallet
                size={16}
                style={{
                  marginRight: 10,
                }}
              />
              {formatMoney({
                text: data.unitPrice,
                prefix: 'VNĐ',
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

ClassItemComponent.displayName = 'ClassItemComponent';
export {ClassItemComponent};
