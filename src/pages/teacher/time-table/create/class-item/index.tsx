/**
 * @app VuonDau
 * @author phutruongck
 */

import {AiFillClockCircle} from 'react-icons/ai';
import {FaUserFriends} from 'react-icons/fa';
import React from 'react';
import {dateTimeToShow, DATE_TIME_FORMAT} from '@/common/function/date-time';
import {IClass} from '@custom-type';
import './styles.scss';

interface Props {
  setClassSelected: Function;
  classSelected: number;
  className?: string;
  data: IClass;
}

const ClassItemComponent: React.FC<Props> = React.memo(
  ({data, className, classSelected, setClassSelected}) => {
    const handleOnClick = () => {
      setClassSelected(data.id);
    };

    return (
      <div
        className={`time__table__class__item__container ${className} ${
          +classSelected === +data.id ? 'selected' : undefined
        }`}
        onClick={handleOnClick}
      >
        <div className="time__table__class__item__detail__container">
          <div className="time__table__class__item__information__container">
            <div className="time__table__class__item__name">{data?.name}</div>
            <div className="time__table__class__item__number__student">
              <FaUserFriends
                style={{
                  marginRight: 5,
                }}
                size={15}
              />
              {data?.numberStudent}/{data?.maxNumberStudent}
            </div>
            <div className="time__table__class__item__dateTime">
              <div className="time__table__class__item__dateTime__heading">
                <AiFillClockCircle
                  style={{
                    marginRight: 5,
                  }}
                  size={15}
                />
                {dateTimeToShow(data.startDate, DATE_TIME_FORMAT.DATE_FORMAT)} -{' '}
                {dateTimeToShow(data.endDate, DATE_TIME_FORMAT.DATE_FORMAT)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ClassItemComponent.displayName = 'ClassItemComponent';
export {ClassItemComponent};
