/**
 * @app VuonDau
 * @author phutruongck
 */

import {TableLocale} from 'antd/lib/table/interface';
import React from 'react';
import _ from 'lodash';
import {IMoney, ItemType} from '@custom-type';
import axios from '@/ducks/axios';

export const wait = (timeout: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

export const shallowEqual = (
  o1: {[x: string]: any},
  o2: {[x: string]: any},
) => {
  const k1 = Object.keys(o1);
  const k2 = Object.keys(o2);
  if (k1.length !== k2.length) {
    return false;
  }
  for (const k of k1) {
    if (o1[k] !== o2[k]) {
      return false;
    }
  }
  return true;
};

export const formatDataBeforeCompare = (
  obj1: {[x: string]: any},
  obj2: {[x: string]: any},
) => {
  let o1 = _.clone(obj1);
  const k1 = typeof o1 === 'object' ? Object.keys(o1) : [];
  for (const k of k1) {
    const v1 = getKeyValue(o1)(k);
    const v2 = getKeyValue(obj2)(k);
    if (v1 === v2) {
      continue;
    } else {
      o1[k] = `${v1}`;
    }
  }
  return {
    obj1: o1,
    obj2,
  };
};

export const sameDataCheck = (object1: any, object2: any) => {
  let cloneO1 = _.clone(object1);
  const cloneO2 = _.clone(object2);
  for (const k in cloneO1) {
    if (!cloneO2.hasOwnProperty(k)) {
      cloneO1 = _.omit(cloneO1, k);
    }
  }
  const obj = formatDataBeforeCompare(cloneO1, cloneO2);
  if (shallowEqual(obj.obj1, obj.obj2)) {
    return true;
  }
  return false;
};

export const locale: TableLocale = {
  emptyText: 'Không có dữ liệu!',
  selectInvert: 'Chọn ngược lại',
  selectNone: 'Bỏ chọn tất cả',
  selectionAll: 'Chọn tất cả',
  triggerDesc: 'Giảm dần',
  triggerAsc: 'Tăng dần',
  cancelSort: 'Mặc định',
};

export const getExtensionFromType = (type: string) => {
  switch (type) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    default:
      return 'png';
  }
};

export const UploadTypeAllow = ['image/png', 'image/jpg', 'image/jpeg'];

export const imageToBase64 = async (file: File) => {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
};

export const getValueOrNull = (value: string) => {
  if (!value) return '';
  return String(value);
};

export const dateToObject = (date: string) => {
  if (!date) return null;
  const _date = date.split('/');
  const [day, month, year] = _date;
  return {
    day,
    month,
    year,
  };
};

export const formatMoney = ({text, comma = '.', prefix = ''}: IMoney) => {
  const _rs = text
    ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `${comma}`)
    : '0';
  const __rs = `${_rs}${prefix ? ' ' + prefix : ''}`;
  return __rs;
};

export const convertResponseToDropdown = (props: {
  data: any[];
  keys?: ItemType;
  renderLabel?: (item?: any) => string;
}): ItemType[] | [] => {
  const dropdownKeys: ItemType = props.keys || {
    label: 'name',
    value: 'id',
  };
  if (dropdownKeys.label && typeof dropdownKeys.label === 'string') {
    if (props?.renderLabel) {
      return props.data.map((i: any) => ({
        label: props.renderLabel
          ? props.renderLabel(i)
          : i[dropdownKeys.label + ''],
        value: i[dropdownKeys.value] + '',
        otherValue: dropdownKeys.otherValue ? i[dropdownKeys.otherValue] : '',
      }));
    } else {
      return props.data.map((i) => ({
        label: i[dropdownKeys.label + ''],
        value: i[dropdownKeys.value] + '',
        otherValue: dropdownKeys.otherValue ? i[dropdownKeys.otherValue] : '',
      }));
    }
  }
  return [];
};

export const convertResponseData = (
  res: any[],
  keys: string[],
  addOn?: any,
) => {
  let rs: any = [];
  if (res.length > 0) {
    const responseList = [...res];
    responseList.forEach((i: any, index: number) => {
      let item: any = {};
      item['index'] = index + 1;
      item['key'] = index;
      if (addOn) {
        let addOnKeys: string[] = Object.keys(addOn);
        addOnKeys.forEach((k) => {
          item[k] = addOn.hasOwnProperty(k) ? addOn[k] : undefined;
        });
      }
      keys.forEach((j) => {
        if (i.hasOwnProperty(j)) {
          item[j] = i[j];
        }
      });
      rs = [...rs, item];
    });
  }
  return rs;
};

export const random = (length: number = 10, isCharacter: boolean = true) => {
  let rs: string = '';
  const characters = isCharacter
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    : '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    rs += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return rs;
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str.toLocaleLowerCase();
};

export const searchString = (target: string = '', key: string = '') => {
  const _key = removeVietnameseTones(key);
  const _target = removeVietnameseTones(target);
  return _target.includes(_key);
};

export const formatPermissionData = (i: string) => {
  switch (i) {
    case 'manufacturers':
      return 'Hãng';
    case 'voucherTypes':
      return 'Loại chứng chỉ';
    case 'territories':
      return 'Tỉnh/Thành Phố';
    case 'warehouses':
      return 'Kho';
    case 'categories':
      return 'Nhóm hàng';
    case 'branches':
      return 'Chi nhánh';
    case 'staffs':
      return 'Nhân viên';
    case 'stores':
      return 'Cửa hàng';
    default:
      return '';
  }
};

export const toObject = (arr?: any[]) => {
  if (!arr || (Array.isArray(arr) && arr.length <= 0)) return undefined;
  let rv: any = {};
  arr.forEach((i) => {
    rv['sort'] = i['sort'];
  });
  return rv;
};

export const formatShortUrl = (name: string = '') => {
  if (!name) return '';
  const formatName = removeVietnameseTones(name);
  const shortUrl = formatName.replaceAll(' ', '-');
  return shortUrl;
};

export const toShortUrl = (
  name: string | React.ReactNode,
  id?: number | string,
) => {
  if (!name || !id || typeof name !== 'string') return '';
  const formatName = removeVietnameseTones(name);
  const shortUrl = formatName.replaceAll(' ', '-');
  return `${shortUrl}-vd${id}`;
};

export const toCategoryUrl = ({
  displayGroups,
  category,
}: {
  displayGroups: any[];
  category: any;
}): string => {
  let url = '';
  if (displayGroups && Array.isArray(displayGroups)) {
    const _displayGroups = displayGroups.filter((i: any) => i?.categoryId);
    if (_displayGroups.length === 1) {
      const _categoryId = _displayGroups[0].id;
      const _categoryName = _displayGroups[0].name;
      url = toShortUrl(_categoryName, _categoryId);
    } else if (_displayGroups.length > 1) {
      const _categoryId = _displayGroups[0].id;
      const _categoryName = _displayGroups[0].name;
      const _categoryIds = _displayGroups.find(
        (j: any) => j?.id === category?.id,
      );
      if (_categoryIds) {
        url = toShortUrl(_categoryIds?.name, _categoryIds?.id);
      } else {
        url = toShortUrl(_categoryName, _categoryId);
      }
    } else {
      url = toShortUrl(category?.name, category?.id);
    }
  } else {
    url = toShortUrl(category?.name, category?.id);
  }
  return url;
};

export const getSubOptionConfig = (name: string) => {
  if (!name || !name.includes('_'))
    return {
      subOptionItemId: undefined,
      subOptionId: undefined,
      type: undefined,
    };
  const rs = name.split('_');
  return {
    subOptionItemId: +rs[2],
    subOptionId: +rs[1],
    type: rs[0],
  };
};

export const getPromotionConfig = (name: string) => {
  if (!name || !name.includes('_'))
    return {
      name: undefined,
      type: undefined,
      id: undefined,
    };
  const rs = name.split('_');
  return {
    type: +rs[2],
    name: rs[0],
    id: +rs[1],
  };
};

export const getCheckboxConfig = (name: string) => {
  if (!name || !name.includes('_'))
    return {
      parentId: undefined,
      name: undefined,
      id: undefined,
    };
  const rs = name.split('_');
  return {
    parentId: +rs[1],
    name: rs[0],
    id: +rs[2],
  };
};

export const truncate = (str: string = '', n: number = 30) => {
  if (n === 0) {
    return str;
  }
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

export const explodeURL = (url: string = ''): string[] => {
  if (url.includes('&')) {
    return url.split('&');
  }
  return [url];
};

export const urlKeyValue = (url: string = '') => {
  if (url.includes('=')) {
    const [param, value] = url.split('=');
    return {
      param,
      value,
    };
  }
  return {
    param: '',
    value: '',
  };
};

export const showLoginMessage = (fullName: string = '') => {
  const hour = new Date().getHours();
  let message = '';
  if (hour) {
    if (hour >= 4 || hour <= 12) {
      message = `Chào buổi sáng ${fullName}`;
    } else {
      message = `Xin chào ${fullName}`;
    }
  }
  return message;
};
