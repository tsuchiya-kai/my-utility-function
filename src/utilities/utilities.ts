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

/**
 * @param {string | Dayjs} date -変換対象の date
 * @returns {string} - ISO規格の日付
 */
export const formatDateToISO = (date: string | Dayjs): string => {
  return dayjs(date).toISOString();
};

/**
 *
 * @param {string | null} isoDate  - 変換対象のISO8601形式の文字列
 * @returns {string} - YYYY年M月D日 or '-'
 */
export const formatISOToJaDate = (isoDate: string): string => {
  if (isoDate === null) return '-';
  return dayjs(isoDate).format('YYYY[年]M[月]D[日]');
};

/**
 *
 * @param {string | null} isoDate  - 変換対象のISO8601形式の文字列
 * @returns {string} - YYYY/MM/DD or '-'
 */
export const formatISOToSlashDate = (isoDate: string | null): string => {
  if (isoDate === null) return '-';
  return dayjs(isoDate).format('YYYY/MM/DD');
};

/**
 *
 * @param {string | null} isoDate  - 変換対象のISO8601形式の文字列
 * @returns {string} - YYYY/MM/DD HH:mm or '-'
 */
export const formatISOToDateTime = (isoDate: string | null): string => {
  return isoDate === null ? '' : dayjs(isoDate).format('YYYY/MM/DD HH:mm');
};

/**
 * 数字7桁を郵便番号形式(xxx-xxxx)に変換する
 * @param num - 変換対象の7桁の number
 * @returns {string} - 7桁の数値であれば整形、それ以外の場合はエラー
 */
export const formatPostcode = (num: number | null): string | void => {
  if (num === null) {
    console.error('Error at formatPostcode(): postcode did not pass regex');
    return;
  }

  const postcode = num.toString();

  if (/^\d{7}$/.test(postcode))
    return `${postcode.slice(0, 3)}-${postcode.slice(-4)}`;

  console.error('Error at formatPostcode(): postcode did not pass regex');
};
