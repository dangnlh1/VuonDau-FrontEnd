/**
 * @app VuonDau
 * @author phutruongck
 */

import moment from 'moment';

export const DATE_TIME_FORMAT = {
  VN_DATE_TIME_FORMAT: 'DD/MM/YYYY HH:mm:ss',
  MILLISECOND_TIME_FORMAT: 'HH:mm:ss',
  DATE_TIME: 'DD/MM/YYYY h:mm A',
  VN_DATE_FORMAT: 'DD/MM/YYYY',
  DATE_FORMAT: 'MM/DD/YYYY',
  TIME_FORMAT: 'HH:mm',
  LOCALE_US: 'en-US',
  AM_PM: 'h:mm A',
};

export const dateTimeToShow = (
  val?: string | Date,
  format: string = DATE_TIME_FORMAT.DATE_TIME,
) => {
  if (!val) return '';
  try {
    const d = moment(val).format(format);
    return d;
  } catch (e) {
    return '';
  }
};

export const getNow = (format = DATE_TIME_FORMAT.VN_DATE_FORMAT) => {
  if (format) {
    const now = moment().format(format).toString();
    return now;
  }
  return moment().toString();
};

export const isAfterDate = (
  date: string,
  dateCompare: string,
  isCompareSameDate?: boolean,
) => {
  if (!date) return false;
  const dateAfterFormat = moment(date).format(DATE_TIME_FORMAT.DATE_FORMAT);
  const dateCompareAfterFormat = moment(dateCompare).format(
    DATE_TIME_FORMAT.DATE_FORMAT,
  );
  const isAfter: boolean = moment(dateAfterFormat).isAfter(
    dateCompareAfterFormat,
  );

  if (isCompareSameDate) {
    const isSameDate: boolean = moment(dateAfterFormat).isSame(
      dateCompareAfterFormat,
    );

    if (isAfter || isSameDate) {
      return true;
    }
  }
  return isAfter;
};

export const formatDate = (
  value: string,
  format: string = DATE_TIME_FORMAT.VN_DATE_FORMAT,
  isTZ?: boolean,
) => {
  if (!value) return '';
  if (isTZ) {
    const split = value.includes(' ') ? value.split(' ') : [];
    if (split.length > 1) {
      const [date, time] = split;
      const globalTime = `${toGlobalDate(date)} ${time}`;
      return new Date(globalTime).toISOString();
    }
  }
  return moment(value).format(format);
};

export const formatTime = (value: string) => {
  if (!value) return '';
  return moment(value, [DATE_TIME_FORMAT.TIME_FORMAT]).format(
    DATE_TIME_FORMAT.AM_PM,
  );
};

export const reverseDate = (value: string) => {
  if (!value) return '';
  const a = value.split('/');
  return `${a[1]}/${a[0]}/${a[2]}`;
};

export const isAfter = (date: string, compare: string) => {
  if (!date || !compare) return false;
  const _date = moment(new Date(date));
  const _compare = moment(new Date(compare));
  return _compare.isAfter(_date) || _compare.isSame(_date);
};

export const isBefore = (date: string, compare: string) => {
  if (!date || !compare) return false;
  const _date = moment(new Date(date));
  const _compare = moment(new Date(compare));
  return _compare.isBefore(_date) || _compare.isSame(_date);
};

export const fullDateTime = (value: string) => {
  if (!value) return '';
  return new Date(value).toISOString();
};

export const toGlobalDate = (value: string) => {
  if (!value || (!!value && !value.includes('/'))) return '';
  const a = value.split('/');
  return `${a[2]}-${a[1]}-${a[0]}`;
};

export const nowDate: string = new Date().toLocaleDateString(
  DATE_TIME_FORMAT.LOCALE_US,
);

export const vnNowDate: string = moment().format(
  DATE_TIME_FORMAT.VN_DATE_FORMAT,
);

export const vnNowDateFix: string = new Date().toISOString();

export const nowTime: string = moment().format(DATE_TIME_FORMAT.TIME_FORMAT);

export function formatDateFilter(a: Date, b: Date) {
  const _s = toGlobalDate(new Date(a).toISOString().substring(0, 10));
  const _e = toGlobalDate(new Date(b).toISOString());
  const _fs = fullDateTime(_s);
  const _fe = fullDateTime(_e);
  return {
    startDate: new Date(a).toISOString().substring(0, 10),
    endDate: new Date(b).toISOString().substring(0, 10),
  };
}
