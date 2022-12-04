/**
 * @app VuonDau
 * @author phutruongck
 */

export const validateURL = (str: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return !!pattern.test(str);
};

export function validateStringNumber(str: string) {
  // validate string have number, string, uppercase, lowercase, special characters but string can vietnamese
  const reg = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]).{8,}$',
  );
  return reg.test(str);
}

export function validateFullName(str: string) {
  const reg = new RegExp('^[a-zA-Z ]+ [a-zA-Z]+$');
  const len = str.length;
  if (len <= 64 && reg.test(str)) return true;
  return false;
}

export function validatePhone(phone: string) {
  const patternPhone = new RegExp(
    '\\+?((84[1-9])+(\\d{8})|(0[1-9])+(\\d{8}))\\b',
  );
  return patternPhone.test(phone);
}

export function validatePhone2(phone: string) {
  const patternPhone = new RegExp(
    '\\+?((84[1])+(\\d{9})|(84[98])+(\\d{8})|(09|08|07|05|03|01)+(\\d{8}))\\b',
  );
  return patternPhone.test(phone);
}

export function validatePassword(password: string) {
  const patternPassword = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
  );
  return patternPassword.test(password);
}

export function validateValueVietNamese(value: string) {
  const patternVietnamCharacter =
    'ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢĐẾỀỂỄỆÊÉÈẺẼÍÌỈĨỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴắằẳẵặăấầẩẫậâáàãảđếềểễệêéèẻẽíìỉĩốồổỗộôớờởỡợơóòõỏứừửữựưúùủũụýỳỷỹỵ';
  const arrayCheck = value.split('');
  let check = true;
  arrayCheck.map((item) => {
    if (patternVietnamCharacter.indexOf(item) > -1) check = false;
  });
  return check;
}

export function validateWhiteSpace(value: string) {
  return value.indexOf(' ') < 0;
}

export function validateUserName(value: string) {
  const regex = new RegExp('^[a-zA-Z0-9]{3,20}$'); // not special character and vietnamese, limit 3 -> 20 letters
  return regex.test(value);
}

export function validateSpecialCharacters(value: string) {
  const regex = new RegExp('^[_A-z0-9]*((-|\\s)*[_A-z0-9])*$'); // not special character and vietnamese
  return regex.test(value);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export const validateEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

/**
 * validate location
 * @param location
 * @returns {boolean}
 */
export const validateLocation = (location: string): boolean => {
  const re = /^[\d|.]+$/;
  return re.test(String(location).toLowerCase());
};

export const validateLink = (value: string) => {
  const re = /(http|https)(\:\/\/)+?/gim;
  return re.test(String(value).toLowerCase());
};

export const validateLength = (value: string, length: number) => {
  if (value.length > length) {
    return false;
  }
  return true;
};

export function isNumeric(str: string) {
  const reg = new RegExp('^[0-9]*$');
  return reg.test(str);
}
