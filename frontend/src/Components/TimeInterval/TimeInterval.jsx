import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDateStart, setDateEnd } from '../../store/slices/dateSlice';

export default function TimeInterval({ selectedTimeInterval, dateFormatter }) {
  const dispatch = useDispatch();
  const today = new Date();

  const startDate = useSelector((state) => state.dates.startDate);
  const endDate = useSelector((state) => state.dates.endDate);

  useEffect(() => {
    const updateDateRange = () => {
      switch (selectedTimeInterval) {
        case 'today': {
          const formattedToday = dateFormatter.format(today);
          dispatch(setDateStart(formattedToday));
          dispatch(setDateEnd(''));
          break;
        }
        case 'week': {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - 6);
          const formattedWeekStart = dateFormatter.format(weekStart);
          const formattedWeekEnd = dateFormatter.format(today);
          dispatch(setDateStart(formattedWeekStart));
          dispatch(setDateEnd(formattedWeekEnd));
          break;
        }
        case 'month': {
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          const formattedMonthAgo = dateFormatter.format(monthAgo);
          const formattedToday = dateFormatter.format(today);
          dispatch(setDateStart(formattedMonthAgo));
          dispatch(setDateEnd(formattedToday));
          break;
        }
        case 'year': {
          const yearAgo = new Date(today);
          yearAgo.setFullYear(today.getFullYear() - 1);
          const formattedYearAgo = dateFormatter.format(yearAgo);
          const formattedTodayForYear = dateFormatter.format(today);
          dispatch(setDateStart(formattedYearAgo));
          dispatch(setDateEnd(formattedTodayForYear));
          break;
        }
        case 'all':
          dispatch(setDateStart(''));
          dispatch(setDateEnd(''));
          break;
        default:
          break;
      }
    };

    updateDateRange();
  }, [selectedTimeInterval, dateFormatter, dispatch, today]);

  const getTimeInterval = () => {
    switch (selectedTimeInterval) {
      case 'today':
        return `Сегодня: ${dateFormatter.format(today)}`;
      case 'week':
        return `На этой неделе: ${startDate} - ${endDate}`;
      case 'month':
        return `За месяц: ${startDate} - ${endDate}`;
      case 'year':
        return `За год: ${startDate} - ${endDate}`;
      case 'all':
        return 'Вся история';
      default:
        return 'Выберите период';
    }
  };

  const timeInterval = getTimeInterval();

  return <span>{timeInterval}</span>;
}
