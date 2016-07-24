import moment from 'moment';

/**
 * Gets the hour diff between two dates
 * @param {String} dateOne - The ISO String of the first date
 * @param {String} dateTwo - The ISO String of the second date
 * @returns {Number} - The absolute hour difference between the two dates
 */
export default (dateOne, dateTwo) => {
  const hrDiff = moment.duration(moment(dateOne).diff(moment(dateTwo))).asHours();
  return Math.abs(hrDiff);
};
