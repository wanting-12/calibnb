import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { cancelBookingThunk, getUserBookingsThunk } from "../../store/bookings";
import { getUserReviewsThunk } from "../../store/reviews";
import ReviewsToWrite from "../Account/ReviewsToWrite";
import { dateTransfer } from "../Helper/dateTransfer";
import Header from "../Homepage/Header";
import LoadingBlock from "../LoadingBlock";
import "./index.css";

function TripsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const trips = useSelector((state) => state.bookings.userBookings);

  let allTrips;
  let uTrips = [];
  let pTrips = [];
  // let cTrips = [];
  const [bookingId, setBookingId] = useState("");
  const [cancel, setCancel] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // console.log("trips in tripspage", trips);

  useEffect(() => {
    dispatch(getUserBookingsThunk())
      .then(() => dispatch(getUserReviewsThunk()))
      .then(() => setLoaded(true));
  }, [dispatch]);

  const handleCancel = async (e, id) => {
    e.preventDefault();

    await dispatch(cancelBookingThunk(id))
      .then(() => dispatch(getUserBookingsThunk()))
      .then(() => setCancel(false));
  };

  if (loaded) {
    allTrips = Object.values(trips);

    for (let trip of allTrips) {
      if (
        new Date(trip.start) >
        new Date(new Date().setDate(new Date().getDate() - 1))
      ) {
        uTrips.push(trip);
      } else {
        pTrips.push(trip);
      }
    }
  }

  console.log("upcoming trips", uTrips);
  console.log("past trips", pTrips);
  return (
    <>
      <Header />
      {!loaded && <LoadingBlock />}
      {loaded && (
        <>
          <main className="tp-container">
            <div className="tp-header-container">
              <h1 className="tp-header-h1">Trips</h1>
            </div>
            <div className="tp-ut-container">
              {uTrips.length > 0 ? (
                <>
                  <div className="tp-ut-header">
                    <h2 className="tp-ut-header-h2">Upcomming Trips</h2>
                  </div>
                  <div>
                    <ul className="grid-ul">
                      {uTrips.map((trip) => (
                        <li className="grid-li" key={trip.id}>
                          {/* may change it to a link later */}
                          <div>
                            <div className="grid-li-flex">
                              <div
                                className="grid-li-left"
                                onClick={() => {
                                  history.push(`/spots/${trip.spotInfo.id}`);
                                  window.scrollTo(0, 0);
                                }}
                              >
                                <img
                                  className="tp-img"
                                  src={trip.spotInfo.images[0].url}
                                  alt="trip image"
                                  onError={(e) => {
                                    e.currentTarget.src = "/default.JPG";
                                  }}
                                />
                                <p className="tp-img-text">
                                  Click to view more details
                                </p>
                              </div>
                              <div className="grid-li-right">
                                <div>
                                  <span className="tc-text">
                                    {trip.spotInfo.city}
                                  </span>
                                </div>
                                <div className="tc-host">
                                  <span className="tc-host-text">
                                    Hosted by {trip.spotInfo.owner.firstName}
                                  </span>
                                </div>
                                <div className="tc-date">
                                  <span className="tc-date-text">
                                    {dateTransfer("s_month", trip.start)}{" "}
                                    {dateTransfer("date_num", trip.start)}
                                    {dateTransfer("year", trip.start) ===
                                    dateTransfer("year", trip.end)
                                      ? "-"
                                      : dateTransfer("year", trip.start) +
                                        " - "}
                                    {dateTransfer("s_month", trip.start) ===
                                    dateTransfer("s_month", trip.end)
                                      ? dateTransfer("date_num", trip.end)
                                      : dateTransfer("s_month", trip.end) +
                                        " " +
                                        dateTransfer("date_num", trip.end)}
                                    {dateTransfer("year", trip.start) ===
                                    dateTransfer("year", trip.end)
                                      ? ", " + dateTransfer("year", trip.start)
                                      : dateTransfer("year", trip.start)}
                                  </span>
                                </div>
                                <div className="grid-li-review">
                                  <button
                                    className="rtr-review-bt"
                                    onClick={() => {
                                      setBookingId(trip.id);
                                      setCancel(true);
                                    }}
                                  >
                                    <span>Cancel booking</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="tp-no-ut">
                    <div className="grid-no-ut">
                      <div className="nout-left-flex">
                        <div className="hand-svg-container">
                          <svg
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hand-svg"
                          >
                            <path
                              opacity={0.2}
                              d="M 15.629 22.596 l -2.735 2.801 a 2 2 0 0 1 -2.792 0.07 L 7.554 22.67 c -0.73 2.89 -1.162 4.807 -1.295 5.75 c -0.134 0.942 -0.213 1.72 -0.238 2.334 c -0.005 0.238 0.013 0.6 0.056 1.086 c 0.17 1.21 0.515 2.33 1.011 3.333 c 1.825 3.69 5.47 5.748 8.949 5.869 c 3.31 0.115 5.517 -0.794 8.313 -3.48 l 2.715 -2.752 l -11.436 -12.214 Z"
                            ></path>
                            <path
                              // opacity={0.7}
                              d="M 28.207 9.793 c 0.469 0.468 0.79 1.028 0.965 1.622 l 0.62 -0.622 a 3.828 3.828 0 0 1 5.755 5.026 a 3.829 3.829 0 0 1 1.81 6.23 l -1.77 1.78 c 0.452 0.133 0.885 0.351 1.272 0.655 l 0.348 0.309 a 3.828 3.828 0 0 1 0.154 5.252 l -10.437 10.56 c -1.044 0.935 -1.74 1.522 -2.086 1.76 c -1.884 1.375 -3.787 2.15 -6.1 2.464 c -0.723 0.155 -1.868 0.196 -3.432 0.123 c -7.054 -0.575 -12.678 -6.198 -13.257 -13.25 c -0.146 -2.892 0.572 -6.85 2.153 -11.876 c 1.019 -3.917 1.793 -6.789 2.323 -8.616 c 0.239 -1.315 2.137 -1.414 3.72 -0.754 l 0.327 0.15 c 1.867 0.933 2.87 2.808 2.462 5.299 l -0.735 4.381 L 22.793 9.793 a 3.828 3.828 0 0 1 5.414 0 Z m -3.877 1.302 L 12.836 22.578 c 4.186 4.427 4.186 11.502 -0.204 16.054 l -1.414 -1.414 c 3.64 -3.642 3.708 -9.504 0.153 -13.28 L 9.93 22.343 l 1.09 -6.54 c 0.351 -1.752 -0.204 -2.84 -1.341 -3.409 c -0.34 -0.18 -0.777 -0.286 -1.31 -0.317 c -1.986 7.282 -3.228 11.911 -3.726 13.886 c -0.422 1.887 -0.634 3.556 -0.634 5.01 c 0.235 6.32 5.165 11.443 11.405 11.98 c 1.127 0.058 2.14 0.024 3.039 -0.104 c 1.998 -0.271 3.588 -0.919 5.221 -2.11 c 0.613 -0.33 4.653 -4.311 12.12 -11.946 a 1.828 1.828 0 0 0 -2.463 -2.698 l -6.057 6.045 l -1.362 -1.467 l 9.882 -9.88 a 1.829 1.829 0 0 0 0.203 -2.345 l -0.203 -0.24 a 1.828 1.828 0 0 0 -2.586 0 l -9.785 9.784 l -1.363 -1.467 l 11.734 -11.732 a 1.829 1.829 0 0 0 0.203 -2.345 l -0.203 -0.24 a 1.829 1.829 0 0 0 -2.463 -0.113 L 19.57 23.844 l -1.362 -1.467 l 8.586 -8.584 a 1.829 1.829 0 0 0 0.112 -2.463 l -0.235 -0.235 a 1.829 1.829 0 0 0 -2.34 0 Z M 47 17 v 2 h -5 v -2 h 5 Z M 42.293 4.293 l 1.414 1.414 l -4 4 l -1.414 -1.414 l 4 -4 Z M 31 1 v 5 h -2 V 1 h 2 Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="nout-text-box">
                          <span className="nout-text-bold">
                            No trips booked...yet!
                          </span>
                        </div>
                        <div className="nout-text-box">
                          <span className="nout-text">
                            Time to dust off your bags and start palnning your
                            next adventure
                          </span>
                        </div>
                        <div className="nout-link-box">
                          <div
                            className="nout-link"
                            onClick={() => history.push("/")}
                          >
                            <span>Start searching</span>
                          </div>
                        </div>
                      </div>
                      <div className="nout-right">
                        <img
                          className="nout-img"
                          src="https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=320"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="tp-pt-container">
              {pTrips.length > 0 ? (
                <>
                  <div className="tp-ut-header">
                    <h2 className="tp-ut-header-h2">Where you've been</h2>
                  </div>
                  <div>
                    <ul className="grid-ul">
                      {pTrips.map((trip) => (
                        <li className="grid-li" key={trip.id}>
                          {/* may change it to a link later */}
                          <div>
                            <div className="grid-li-flex">
                              <div
                                className="grid-li-left"
                                onClick={() => {
                                  history.push(`/spots/${trip.spotInfo.id}`);
                                  window.scrollTo(0, 0);
                                }}
                              >
                                <img
                                  className="tp-img"
                                  src={trip.spotInfo.images[0].url}
                                  alt="trip image"
                                  onError={(e) => {
                                    e.currentTarget.src = "/default.JPG";
                                  }}
                                />
                                <p className="tp-img-text">
                                  Click to view more details
                                </p>
                              </div>
                              <div className="grid-li-right">
                                <div>
                                  <span className="tc-text">
                                    {trip.spotInfo.city}
                                  </span>
                                </div>
                                <div className="tc-host">
                                  <span className="tc-host-text">
                                    Hosted by {trip.spotInfo.owner.firstName}
                                  </span>
                                </div>
                                <div className="tc-date">
                                  <span className="tc-date-text">
                                    {dateTransfer("s_month", trip.start)}{" "}
                                    {dateTransfer("date_num", trip.start)}-
                                    {dateTransfer("s_month", trip.start) ===
                                    dateTransfer("s_month", trip.end)
                                      ? dateTransfer("date_num", trip.end)
                                      : dateTransfer("s_month", trip.end) +
                                        " " +
                                        dateTransfer("date_num", trip.end)}
                                    , {dateTransfer("year", trip.start)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="tp-ct-container">
              <ReviewsToWrite />
            </div>
            {cancel && (
              <Modal onClose={() => setCancel(false)}>
                <form className="del-modal-box">
                  <div className="flex-column">
                    <div className="del-msg">
                      <span>Are you sure you want to cancel the booking?</span>
                    </div>
                    <div className="del-bt-box">
                      <button
                        className="del-bt"
                        onClick={() => {
                          setBookingId("");
                          setCancel(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="del-bt"
                        onClick={(e) => handleCancel(e, bookingId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </Modal>
            )}
          </main>
        </>
      )}
    </>
  );
}

export default TripsPage;
