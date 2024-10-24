import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import { DayPickerRangeController, isInclusivelyAfterDay } from "react-dates";
import { extendMoment } from "moment-range";
import "./DatePicker.css";
import { getSpotBookingsThunk } from "../../../store/bookings";

function CalendarForm({
  start,
  end,
  setStartDate,
  setEndDate,
  setStartSelected,
  setEndSelected,
  startSelected,
  endSelected,
}) {
  const dispatch = useDispatch();
  const moment = extendMoment(Moment);

  const spot = useSelector((state) => state.spots.singleSpot);
  const bookings = useSelector((state) => state.bookings.spotBookings);

  const [focusedInput, setFocusedInput] = useState("startDate");
  // const [calNumber, setCalNumber] = useState();
  // const [unvaliable, setUnvaliable] = useState([]);

  useEffect(() => {
    dispatch(getSpotBookingsThunk(spot.id));
  }, [dispatch]);

  // useEffect(() => {
  //   if (window.innerWidth < 1200) setCalNumber(1);
  //   else setCalNumber(2);

  //   const handleWindowSize = (e) => {
  //     if (window.innerWidth < 1200) setCalNumber(1);
  //     else setCalNumber(2);
  //   };

  //   window.addEventListener("resize", handleWindowSize);
  //   return () => document.removeEventListener("resize", handleWindowSize);
  // }, []);

  // console.log("calendar number", calNumber);
  const isDayBlocked = (date) => {
    // create a list for all booked dates
    let bookedDate = [];

    // if the start date selected before the most recent unavaliable date
    // the dates after that date should be unavaliable
    const bookingArr = Object.values(bookings);
    // Find out the earlest booking date from now
    let earlestBooking = moment(bookingArr[bookingArr.length - 1]?.start);

    bookingArr.forEach((b) => {
      // If start date is selected, update the earlest date that is booked
      if (startSelected && moment(b.start) > start) {
        // console.log("b.start > start");
        if (moment(b.start) < earlestBooking) earlestBooking = moment(b.start);
      }
      const unvaliableRange = moment.range(b.start, b.end);
      bookedDate.push(unvaliableRange);
    });

    // if the selected start date is before the earlest booked date
    // then unable the dates after the ealest booked date
    if (startSelected && startSelected < earlestBooking) {
      // If re-select start after end date selected
      // and re-selected start date is before earlest booked date:
      // need to remove selected end date
      if (endSelected && moment(endSelected) > earlestBooking) {
        setEndDate();
        setEndSelected(false);
      }
      bookedDate.push(moment.range(earlestBooking));
    }

    // update the block dates for the function
    const blockedDates = bookedDate.find((dateRange) =>
      dateRange.contains(date)
    );
    return blockedDates;
  };

  const onDatesChange = (dates) => {
    setStartSelected(dates.startDate);
    setEndSelected(dates.endDate);
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  return (
    <DayPickerRangeController
      numberOfMonths={2}
      minimumNights={2}
      isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
      isDayBlocked={isDayBlocked}
      onDatesChange={onDatesChange}
      onFocusChange={onFocusChange}
      focusedInput={focusedInput || "startDate"}
      startDate={start}
      endDate={end}

      //   initialVisibleMonth={() => moment().add(2, "M")} // PropTypes.func or null,
      //   startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      //   startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      //   endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      //   endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      //   onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
      //   focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      //   onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
    />
  );
}

export default CalendarForm;
