import 'dayjs/locale/mn';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import toObject from 'dayjs/plugin/toObject';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Ulaanbaatar');
dayjs.locale('mn');
dayjs.extend(customParseFormat);
dayjs.extend(isYesterday);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(toObject);

const calculateDays = (
  rangeDates: Dayjs[],
): { totalDays: number; totalNights: number } => {
  const start = rangeDates[0].startOf('day'); // Normalize to start of the day for accuracy
  const end = rangeDates[1].startOf('day'); // Normalize to start of the day

  // Calculate total nights based on a typical hotel stay definition
  const totalNights = end.diff(start, 'day');

  // Calculate total days for staying (end day not included)
  const totalDays = totalNights + 1; // Normally same as nights unless time spans are considered

  return { totalDays, totalNights };
};

function getAllDaysAsString(startDate: Dayjs, endDate: Dayjs) {
  const start = startDate;
  const end = endDate;
  let current = start;
  const dates = [];

  while (current.isBefore(end) || current.isSame(end, 'day')) {
    dates.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  return dates;
}

export { dayjs, calculateDays, getAllDaysAsString };
