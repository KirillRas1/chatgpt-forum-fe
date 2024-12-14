import { formatDistanceToNow, subDays, subMonths, subYears } from 'date-fns';
import _ from 'lodash';

/**
 * Returns a formatted string representing the time elapsed since the given timestamp
 * @param {number} startTimeTimestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted time distance string (e.g. "2 hours ago")
 */
export function getFormattedTimedelta(startTimeTimestamp) {
  return formatDistanceToNow(startTimeTimestamp, { addSuffix: true });
}

/**
 * Time threshold configuration for different time ranges
 */
const TIME_RANGES = [
  { name: 'past 24 hours', getTime: (date) => subDays(date, 1).getTime() },
  { name: 'past week', getTime: (date) => subDays(date, 7).getTime() },
  { name: 'past month', getTime: (date) => subMonths(date, 1).getTime() },
  { name: 'past year', getTime: (date) => subYears(date, 1).getTime() },
  { name: 'all time', getTime: () => new Date(0).getTime() }
];

/**
 * Returns an array of timestamp thresholds based on the current date
 * @param {Date} [currentDate=new Date()] - Reference date for calculating thresholds
 * @returns {number[]} Array of Unix timestamps for each threshold
 */
export const getTimeThresholds = (currentDate = new Date()) => {
  return TIME_RANGES.map(range => range.getTime(currentDate));
};

/**
 * Returns an array of objects containing time threshold names and their corresponding timestamps
 * @param {Date} [currentTime=new Date()] - Reference date for calculating thresholds
 * @returns {Array<{name: string, time: number}>} Array of threshold objects
 */
export const getTimeThresholdsDict = (currentTime = new Date()) => {
  return TIME_RANGES.map(range => ({
    name: range.name,
    time: range.getTime(currentTime)
  }));
};