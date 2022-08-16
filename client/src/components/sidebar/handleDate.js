import * as moment from 'moment';

export default function(date) {
  if (moment(date).isSame(moment(), 'day')) {
    return `Today at ${moment(date, ['x']).format('h:mm A')}`;
  } if (moment(date).isSame(moment().subtract(1, 'day'), 'day')) {
    return `Yesterday at ${moment(date, ['x']).format('h:mm A')}`;
  } if (moment(date).isBefore(moment().subtract(1, 'day'), 'day')) {
    return `${moment(date, ['x']).format('ddd hh:mm A')}`;
  }
  return `${moment(date, ['x']).format('MMM Do, yyyy, h:mm A')}`;
}
