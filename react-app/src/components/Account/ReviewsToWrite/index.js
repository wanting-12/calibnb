import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { dateTransfer } from "../../Helper/dateTransfer";
import "./index.css";

function ReviewsToWrite() {
  const history = useHistory();

  const userBookings = useSelector((state) => state.bookings.userBookings);
  const userReviews = useSelector((state) => state.reviews.userReviews);

  let reviewsToWrite = [];
  if (Object.values(userBookings).length > Object.values(userReviews).length) {
    const pastBooking = Object.values(userBookings).filter(
      (booking) => new Date(booking.end) < new Date()
    );

    let spotReviewed = [];
    for (let key in userReviews) {
      spotReviewed.push(userReviews[key].spot.id);
    }

    for (let i in pastBooking) {
      if (!spotReviewed.includes(pastBooking[i].spotInfo.id)) {
        reviewsToWrite.push(pastBooking[i]);
      }
    }
  }

  return (
    <>
      <div className="tp-ut-header">
        <h2 className="tp-ut-header-h2">Reviews to write</h2>
      </div>
      {reviewsToWrite.length > 0 ? (
        <>
          <ul className="grid-ul">
            {reviewsToWrite.map((booking) => (
              <li className="grid-li" key={booking.id}>
                <div>
                  <div className="grid-li-flex">
                    <div className="grid-li-left">
                      <img
                        className="tp-img"
                        src={booking.spotInfo.images[0].url}
                        alt="trip image"
                        onError={(e) => {
                          e.currentTarget.src = "/default.JPG";
                        }}
                      />
                      <p className="tp-img-text">Click to view more details</p>
                    </div>
                    <div className="grid-li-right">
                      <div>
                        <span className="tc-text">{booking.spotInfo.city}</span>
                      </div>

                      {/* <div className="tc-host">
                        <span className="tc-host-text">
                          Hosted by {booking.spotInfo.owner.firstName}
                        </span>
                      </div> */}
                      <div className="tc-date">
                        <span className="tc-date-text">
                          {dateTransfer("s_month", booking.start)}{" "}
                          {dateTransfer("date_num", booking.start)}-
                          {dateTransfer("s_month", booking.start) ===
                          dateTransfer("s_month", booking.end)
                            ? dateTransfer("date_num", booking.end)
                            : dateTransfer("s_month", booking.end) +
                              " " +
                              dateTransfer("date_num", booking.end)}
                          , {dateTransfer("year", booking.start)}
                        </span>
                      </div>
                      <div className="grid-li-review">
                        <button
                          className="rtr-review-bt"
                          onClick={() =>
                            history.push(`/bookings/${booking.id}/review`)
                          }
                        >
                          <span>Leave a review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mb-16 mt-8">
          <span>
            Nobody to review right now. Looks like it's time for another trip!
          </span>
        </div>
      )}
    </>
  );
}

export default ReviewsToWrite;
