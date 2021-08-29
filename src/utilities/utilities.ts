import dayjs, { Dayjs } from 'dayjs';

/**
 * objectから特定のpropertyを除去する関数
 * @param {object} obj - 元の object
 * @param {string} deleteKey - 除去したい key
 * @returns {object}
 *
 * 例) const newObj = objectOmit<originObjType, 'deleteKey'>(originObj, 'deleteKey');
 */
export const objectOmit = <T extends Record<string, unknown>, U extends string>(
  obj: T,
  deleteKey: string
): Omit<T, U> =>
  ((internalObj: T) => {
    return ((internalDeleteKey: string): Omit<T, U> => {
      const omit = ({ [internalDeleteKey]: _, ...newObject }) =>
        newObject as Omit<T, U>;
      return omit(internalObj);
    })(deleteKey);
  })(obj);

/**
 * NOTE: 日付変換系
 */

//  date → ISO規格
export const formatDateToISO = (date: string | Dayjs): string => {
  return dayjs(date).toISOString();
};

//  ISO規格 → YYYY年M月D日
export const formatISOToJaDate = (isoDate: string): string => {
  return dayjs(isoDate).format('YYYY[年]M[月]D[日]');
};

//  ISO規格 => YYYY/MM/DD
export const formatISOToSlashDate = (isoDate: string): string => {
  // NOTE: マイページの申し込み物件カードで引き渡し日がnullで受け取る可能性があるため条件分けしている
  if (isoDate === null) return '-';
  return dayjs(isoDate).format('YYYY/MM/DD');
};

//  ISO規格 => YYYY/MM/DD HH:mm(nullの場合は空文字を返す)
export const formatISOToDateTime = (isoDate: string | null): string => {
  return isoDate === null ? '' : dayjs(isoDate).format('YYYY/MM/DD HH:mm');
};

/**
 * NOTE: 数字7桁を郵便番号形式(xxx-xxxx)に変換する
 */
export const formatPostcode = (num: number | null): string | void => {
  // NOTE: 職業が無職 or その他の場合勤務先郵便番号がnullになるので条件分けしている
  if (num === null) return '-';
  const regex = /^\d{7}$/;
  const postcode = num.toString();
  return regex.test(postcode)
    ? `${postcode.slice(0, 3)}-${postcode.slice(-4)}`
    : console.error('Error at formatPostcode(): postcode did not pass regex');
};
