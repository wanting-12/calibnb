import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBookingThunk } from "../../../store/bookings";
import { cap } from "../../Helper/capitalize";
import CalendarForm from "./Calendar";
import "./index.css";
import { Modal } from "../../../context/Modal";
import LoginForm from "../../LoginSignup/LoginForm";

function PartTwo({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const reviews = spot.reviews;
  const avgs = spot.averages;
  const currUser = useSelector((state) => state.session.user);

  const [start, setStartDate] = useState(moment());
  const [end, setEndDate] = useState(moment());
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [checkinInput, setCheckinInput] = useState(false);
  const [checkoutInput, setCheckoutInput] = useState(false);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    let err = "";
    if (!startSelected || !endSelected)
      err = "Please select the dates for your stay.";

    setSubmit(false);
    setError(err);
  }, [startSelected, endSelected]);

  useEffect(() => {
    const button = document.querySelector(".button-hover-effect");
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) * 100) / button.clientWidth;
      const y = ((e.clientY - rect.top) * 100) / button.clientHeight;
      button.style.setProperty("--mouse-x", x);
      button.style.setProperty("--mouse-y", y);
    });
  }, []);

  const handleReserve = async () => {
    setSubmit(true);

    // console.log("curruser", !currUser.error, currUser, error);
    if (!error && !currUser.error) {
      const booking = {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };

      await dispatch(createBookingThunk(spot.id, booking)).then(() => {
        history.push("/users/trips");
        window.scrollTo(0, 0);
      });
    } else if (currUser.error) {
      setError("");
      setLoginModal(true);
    }
  };

  let stay;
  if (start && end) stay = end.diff(start, "days");
  const s_fee = Math.round((spot.service_fee / 100) * spot.price);
  const c_fee = Math.round((spot.clean_fee / 100) * spot.price);

  // console.log("after clear, start -----", start);
  // console.log("after clear, end -----", end);
  // console.log("after clear, startseleted -----", startSelected);
  // console.log("after clear, end selected -----", endSelected);
  // console.log("heckin in cal", checkinInput);
  return (
    <>
      <div className="max-width">
        <div className="flex">
          <div className="mlr-0-left relative">
            <div className="block-container">
              <div className="ptb-48-24">
                <section>
                  <div className="flex">
                    <div className="flex-0-1">
                      <div className="mb-8-house">
                        <h2 className="mb-8-text">
                          {cap(spot.tags)} hosted by {cap(spot.owner.firstName)}
                        </h2>
                      </div>
                      <ol className="ol">
                        <li className="inline-block">
                          <span>
                            {spot.guests}
                            {spot.guests > 1 ? " guests" : " guest"}
                          </span>
                        </li>
                        <li className="inline-block pl-3">
                          <span>
                            <span> · </span>
                          </span>
                          <span>
                            {spot.bedroom}
                            {spot.bedroom > 1 ? " bedrooms" : " bedroom"}
                          </span>
                        </li>
                        <li className="inline-block pl-3">
                          <span>
                            <span> · </span>
                          </span>
                          <span>
                            {spot.beds}
                            {spot.beds > 1 ? " bedss" : " beds"}
                          </span>
                        </li>
                        <li className="inline-block pl-3">
                          <span>
                            <span> · </span>
                          </span>
                          <span>
                            {spot.bath}
                            {spot.bath > 1 ? " bath" : " bath"}
                          </span>
                        </li>
                      </ol>
                    </div>
                    <div className="ml-16">
                      <div className="wh-76">
                        <div className="wh-100-img">
                          <img
                            className="img-size-host"
                            src={
                              spot.owner.icon ? spot.owner.icon : "/default.JPG"
                            }
                            alt="host icon"
                            onError={(e) => {
                              e.currentTarget.src = "/default.JPG";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="block-container">
              <div className="ptb-32">
                <div className="flex mb-24">
                  <div className="mw-24">
                    <svg
                      className="svg-spotdetail"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 26 2 a 1 1 0 0 1 0.922 0.612 l 0.04 0.113 l 2 7 a 1 1 0 0 1 -0.847 1.269 L 28 11 h -3 v 5 h 6 v 2 h -2 v 13 h -2 l 0.001 -2.536 a 3.976 3.976 0 0 1 -1.73 0.527 L 25 29 H 7 a 3.982 3.982 0 0 1 -2 -0.535 V 31 H 3 V 18 H 1 v -2 h 5 v -4 a 1 1 0 0 1 0.883 -0.993 L 7 11 h 0.238 L 6.086 8.406 l 1.828 -0.812 L 9.427 11 H 12 a 1 1 0 0 1 0.993 0.883 L 13 12 v 4 h 10 v -5 h -3 a 1 1 0 0 1 -0.987 -1.162 l 0.025 -0.113 l 2 -7 a 1 1 0 0 1 0.842 -0.718 L 22 2 h 4 Z m 1 16 H 5 v 7 a 2 2 0 0 0 1.697 1.977 l 0.154 0.018 L 7 27 h 18 a 2 2 0 0 0 1.995 -1.85 L 27 25 v -7 Z m -16 -5 H 8 v 3 h 3 v -3 Z m 14.245 -9 h -2.491 l -1.429 5 h 5.349 l -1.429 -5 Z"></path>
                    </svg>
                  </div>
                  <div className="ml-16 mb-10">
                    <div className="text-19">Dedicated workspace</div>
                    <div className="text-17">
                      A private room with wifi that's well-suited for working.
                    </div>
                  </div>
                </div>
                <div className="flex mb-24">
                  <div className="mw-24">
                    <svg
                      className="svg-spotdetail"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m 24.3334 1.66675 c 1.05437 0 1.91817 0.815871 1.99451 1.85074 l 0.0054857 0.149263 l -0.00065 24.666 l 3.00065 0.00075 v 2 h -26.6667 v -2 l 3 -0.00075 v -24.666 c 0 -1.05437 0.815873 -1.91817 1.85074 -1.99451 l 0.149263 -0.00548571 Z m -4.00065 2 h -12.666 l -0.00075 24.6663 l 12.6667 -0.00025 Z m 4.00065 0 h -2.00065 v 24.666 l 2.00025 0.00025 Z m -7.0001 11 c 0.736378 0 1.33333 0.596952 1.33333 1.33333 s -0.596952 1.33333 -1.33333 1.33333 s -1.33333 -0.596952 -1.33333 -1.33333 s 0.596952 -1.33333 1.33333 -1.33333 Z"></path>
                    </svg>
                  </div>
                  <div className="ml-16 mb-10">
                    <div className="text-19">Self check-in</div>
                    <div className="text-17">
                      Check yourself in with the lockbox.
                    </div>
                  </div>
                </div>
                <div className="flex mb-0">
                  <div className="mw-24">
                    <svg
                      className="svg-spotdetail"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m 11.6667 0 l -0.00095 1.666 h 8.667 l 0.00055 -1.666 h 2 l -0.00055 1.666 l 6.00065 0.00063 c 1.05437 0 1.91817 0.815871 1.99451 1.85074 l 0.0054857 0.149263 v 15.9191 c 0 0.47157 -0.166444 0.925866 -0.466903 1.28447 l -0.11889 0.129831 l -8.74769 8.74769 c -0.33343 0.333253 -0.77231 0.536756 -1.2382 0.577865 l -0.175821 0.0077398 h -12.9192 c -2.68874 0 -4.88182 -2.12233 -4.99538 -4.78311 l -0.00461954 -0.216888 v -21.6667 c 0 -1.05436 0.815876 -1.91816 1.85074 -1.9945 l 0.149263 -0.00548569 l 5.999 -0.00063 l 0.00095 -1.666 Z m 16.666 11.666 h -24.666 v 13.6673 c 0 1.59766 1.24893 2.90366 2.82373 2.99491 l 0.176271 0.0050928 l 10.999 -0.0003 l 0.00095 -5.6664 c 0 -2.68874 2.12236 -4.88182 4.78321 -4.99538 l 0.216893 -0.0046196 l 5.66595 -0.0006 Z m -0.081 8 l -5.58495 0.0006 c -1.59773 0 -2.90376 1.24895 -2.99501 2.82373 l -0.0050929 0.17627 l -0.00095 5.5864 Z m -18.586 -16 l -5.999 0.00062 v 5.99938 h 24.666 l 0.00065 -5.99938 l -6.00065 -0.00062 l 0.00055 1.66733 h -2 l -0.00055 -1.66733 h -8.667 l 0.00095 1.66733 h -2 Z"></path>
                    </svg>
                  </div>
                  <div className="ml-16">
                    <div className="text-19">
                      Free cancellation before "a specific date" (change later)
                    </div>
                    <div className="text-17"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-container">
              <div className="ptb-32">
                <section>
                  <div className="flex mb-16">
                    <h2 className="bir">Cir</h2>
                    <h2 className="cover">cover</h2>
                  </div>
                  <div className="mb-16 lh-26">
                    Every booking includes free protection from Host
                    cancellations, listing inaccuracies, and other issues like
                    trouble checking in.
                  </div>
                  {/* <button className="showmore-button">
                  Show more (change later)
                </button> */}
                </section>
              </div>
            </div>
            {/* <div className="block-container not-sure-yet">
            Where you'll sleep block
          </div>
          <div className="block-container not-sure-yet">
            what this place offers block
          </div> */}
            <div className="block-container-no-border w-100">
              <div className="ptm-48 w-100">
                <div className="calender-header">
                  <div className="stay-nights">
                    <h2 className="block-header-h2">
                      {!startSelected ? "Select check-in date" : ""}
                      {startSelected && !endSelected
                        ? "Select checkout date"
                        : ""}
                      {/* {startSelected && endSelected
                      ? stay + " nights " + "in " + spot.city
                      : "Select check-in date"} */}
                      {/* // {stay} nights in {spot.city} */}
                    </h2>
                    {stay > 0 && (
                      <h2 className="block-header-h2">
                        {stay} nights in {spot.city}
                      </h2>
                    )}
                  </div>
                  <div className="stay-dates pt-8">
                    {startSelected && endSelected && (
                      <div className="ava-date">
                        {start.format("MMM D, YYYY") +
                          " - " +
                          end.format("MMM D, YYYY")}
                      </div>
                    )}
                    {!startSelected && !endSelected && (
                      <div className="ava-date">
                        Add your travel dates for exact pricing
                      </div>
                    )}
                    {startSelected && !endSelected && (
                      <div className="ava-date">Minimum stay: 2 nights</div>
                    )}
                    {/* <div className="ava-date">
                    {startSelected && !endSelected
                      ? "Minimum stay: 2 nights"
                      : ""}
                    {!startSelected && !endSelected
                      ? "Add your travel dates for exact pricing"
                      : start?.format("MMM D, YYYY") +
                        " - " +
                        end?.format("MMM D, YYYY")}
                  </div> */}
                  </div>
                </div>
                <div className="w-100">
                  <CalendarForm
                    start={start}
                    end={end}
                    startSelected={startSelected}
                    endSelected={endSelected}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setStartSelected={setStartSelected}
                    setEndSelected={setEndSelected}
                  />
                </div>
                <div
                  className="flex w-100 fl-end center pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setStartDate(moment());
                    setEndDate(moment());
                    setStartSelected(false);
                    setEndSelected(false);
                  }}
                >
                  Clear
                </div>
              </div>
            </div>
          </div>
          <div className="mr-0-right retative">
            <div className="sticky z-1 pr-1">
              <div className="pb-48">
                <div className="mt-48">
                  <div className="with-shadow">
                    <div className="default-style-booking">
                      <div className="flex-column">
                        <div className="flex s-b bbox-top">
                          <div>
                            <span className="bbox-price">${spot.price}</span>
                            <span className="bbox-night">night</span>
                          </div>

                          <div className="mt-8">
                            <span className="flex baseline">
                              <span className="font-12">
                                <svg
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="bbox-star"
                                >
                                  <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                                </svg>
                              </span>
                              <span className="bbox-avg">
                                {avgs?.avg > 0 ? avgs?.avg.toFixed(1) : "New"} ·{" "}
                              </span>
                              <span className="review-count">
                                <button className="show-review bbox-color">
                                  {" "}
                                  {reviews} {reviews > 1 ? "reviews" : "review"}
                                </button>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="bbox-mid">
                          <div className="flex bb relative">
                            {/* buttons for calender */}
                            <button
                              className="bbox-calender-button "
                              onClick={() => setCheckinInput(true)}
                            >
                              <div className="bbox-calender-left">
                                <div className="bbox-calender-text">
                                  Check-in
                                </div>
                                <div className="bbox-calender-date">
                                  {startSelected
                                    ? start.format("MM/D/YYYY")
                                    : ""}
                                </div>
                              </div>
                              <div className="bbox-calender-right">
                                <div className="bbox-calender-text">
                                  Check-out
                                </div>
                                <div className="bbox-calender-date">
                                  {endSelected ? end.format("MM/D/YYYY") : ""}
                                </div>
                              </div>
                            </button>
                            {checkinInput && (
                              <div className="cal-absolute">
                                <div className="cal-ab-top">
                                  <div className="cat-left">
                                    <div className="cat-stay-nights">
                                      <h2 className="cat-header-h2">
                                        {!startSelected || !endSelected
                                          ? "Select dates"
                                          : ""}
                                      </h2>
                                      {(!startSelected || !endSelected) && (
                                        <div className="ava-date">
                                          Minimum stay: 2 nights
                                        </div>
                                      )}
                                      {stay > 0 && (
                                        <h2 className="block-header-h2">
                                          {stay} nights in {spot.city}
                                        </h2>
                                      )}
                                    </div>
                                    <div className="stay-dates pt-8">
                                      {startSelected && endSelected && (
                                        <div className="ava-date">
                                          {start.format("MMM D, YYYY") +
                                            " - " +
                                            end.format("MMM D, YYYY")}
                                        </div>
                                      )}
                                    </div>
                                    {/* <div className="cat-left-top">
                                      </div>
                                      <div className="cat-left-bottom"></div> */}
                                  </div>
                                  <div className="cat-right">
                                    <div className="bbox-calender-left">
                                      <div className="bbox-calender-text">
                                        Check-in
                                      </div>
                                      <div className="bbox-calender-date">
                                        {startSelected
                                          ? start.format("MM/D/YYYY")
                                          : ""}
                                      </div>
                                    </div>
                                    <div className="bbox-calender-right">
                                      <div className="bbox-calender-text">
                                        Check-out
                                      </div>
                                      <div className="bbox-calender-date">
                                        {endSelected
                                          ? end.format("MM/D/YYYY")
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cal-ab-bottom">
                                  <div>
                                    <CalendarForm
                                      start={start}
                                      end={end}
                                      startSelected={startSelected}
                                      endSelected={endSelected}
                                      setStartDate={setStartDate}
                                      setEndDate={setEndDate}
                                      setStartSelected={setStartSelected}
                                      setEndSelected={setEndSelected}
                                    />
                                  </div>
                                  <div className="cat-clear">
                                    <button
                                      className="cat-clear-date"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setStartDate(moment());
                                        setEndDate(moment());
                                        setStartSelected(false);
                                        setEndSelected(false);
                                      }}
                                    >
                                      Clear dates
                                    </button>
                                    <div className="cat-close">
                                      <button
                                        className="cat-close-bt"
                                        onClick={() => setCheckinInput(false)}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* <div className="flex holder">
                            guests dropdown holder
                          </div> */}
                        </div>

                        <button
                          className="bbox-bottom button-hover-effect"
                          onClick={handleReserve}
                        >
                          <span>Reserve</span>
                        </button>
                      </div>
                      {error && submit ? (
                        <div className="reserve-error">* {error}</div>
                      ) : (
                        <ul className="flex-column other-text">
                          <li className="mt-8">You won't be charged yet</li>
                          {/* <li className="mt-8 f-12 color-71">
                            Please scroll down to select the dates.
                          </li> */}
                          {/* {error && submit ? (
                        <li className="reserve-error">* {error}</li>
                      ) : ( */}
                          {/* )} */}
                        </ul>
                      )}
                      <div className="mt-24">
                        {startSelected && endSelected && (
                          <section>
                            <div className="price-detail">
                              <div className="price-block">
                                <span>
                                  {spot.price} x {stay} nights
                                </span>
                                <span>{spot.price * stay}</span>
                              </div>
                              <div className="price-block pt-16">
                                <span>Cleaning fee</span>
                                <span>$ {c_fee}</span>
                              </div>
                              <div className="price-block pt-16">
                                <span>Service fee</span>
                                <span>$ {s_fee * stay}</span>
                              </div>
                            </div>
                            <div className="mt-24 pt-24 border-top">
                              <div className="price-block">
                                <span className="fw-500">
                                  Total before taxes
                                </span>
                                <span className="fw-500">
                                  $ {spot.price * stay + s_fee * stay + c_fee}
                                </span>
                              </div>
                            </div>
                          </section>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-24">
                <div className="rare-fine-box">
                  <div className="flex">
                    <div className="pr-16">block placeholder</div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginModal && (
        <Modal
          onClose={() => {
            setError("");
            setLoginModal(false);
          }}
        >
          <LoginForm setLoginModal={setLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default PartTwo;
