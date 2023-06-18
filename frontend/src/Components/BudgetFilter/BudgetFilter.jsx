import { useState } from 'react';
import './BudgetFilter.scss';
import { useDispatch, useSelector } from 'react-redux';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import TimeInterval from '../TimeInterval/TimeInterval';
import Overlay from '../Overlay/Overlay';
import Button from '../../ui/Button/Button';
import SpendPopup from '../SpendPopup/SpendPopup';
import IncomePopup from '../IncomePopup/IncomePopup';
import { toggleSpendPopup, toggleIncomePopup } from '../../store/slices/togglePopupSlice';
import plus from '../../Images/icons/plus.svg';
import minus from '../../Images/icons/minus.svg';
import arrow from '../../Images/icons/icon-arrow-right.svg';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

export default function BudgetFilter({
  selectedTimeInterval,
  handleTimeIntervalChange,
  onChange,
  startDate,
  endDate,
  dateFormatter,
}) {
  const dispatch = useDispatch();

  const [isTimeIntervalSelectOpen, setIsTimeIntervalSelectOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { isIncomePopupOpen, isSpendPopupOpen } = useSelector((state) => state.popup);

  const handleSpendClick = () => dispatch(toggleSpendPopup(true));
  const handleIncomeClick = () => dispatch(toggleIncomePopup(true));

  const closeSpendPopup = () => dispatch(toggleSpendPopup(false));
  const closeIncomePopup = () => dispatch(toggleIncomePopup(false));

  const toggleTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(!isTimeIntervalSelectOpen);
  };

  const closeTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  return (
    <div className="budget-filter">
      <div className="budget-filter__wrapper">
        <div className="budget-filter__select">
          <button
            className={`budget-filter__select-button ${
              isTimeIntervalSelectOpen ? 'budget-filter__select-button--open' : ''
            }`}
            type="button"
            onClick={toggleTimeIntervalSelect}
          >
            <TimeInterval
              selectedTimeInterval={selectedTimeInterval}
              dateFormatter={dateFormatter}
            />
          </button>

          <Overlay isOpen={isTimeIntervalSelectOpen} onClose={closeTimeIntervalSelect}>
            <TimeIntervalSelect
              selectedTimeInterval={selectedTimeInterval}
              onTimeIntervalChange={handleTimeIntervalChange}
            />
          </Overlay>
        </div>

        <div className="budget-filter__calendar-block">
          <button
            type="button"
            className={`budget-filter__date-button ${
              isCalendarOpen ? 'budget-filter__date-button--open' : ''
            }`}
            onClick={toggleCalendar}
          >
            По дате
          </button>

          <Overlay isOpen={isCalendarOpen} onClose={closeCalendar}>
            <div className="budget-filter__calendar-wrapper">
              <CustomDatePicker
                type="date"
                onChange={onChange}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange={true}
                selectsDisabledDaysInRange={true}
              />
            </div>
          </Overlay>
        </div>
      </div>

      <div className="budget-filter__button-wrapper">
        <Button
          variant="secondary"
          content="icon-text"
          image={minus}
          text="Расход"
          size="medium"
          onClick={handleSpendClick}
        />
        <Button
          variant="secondary"
          content="icon-text"
          image={plus}
          text="Доход"
          size="medium"
          onClick={handleIncomeClick}
        />
        <Button
          variant="secondary"
          content="icon-text"
          image={arrow}
          text="Перевод"
          size="medium"
          onClick={handleIncomeClick}
        />
      </div>
      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}
      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
    </div>
  );
}
