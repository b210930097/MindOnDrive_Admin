import 'dayjs/locale/mn';
import dayjs from 'dayjs';
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

function formatDate(date: Date) {
  return dayjs(date).format('YYYY.MM.DD HH:mm:ss');
}

export { dayjs, formatDate };
