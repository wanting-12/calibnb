import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneBookingThunk } from "../../../store/bookings";
import { createReviewThunk } from "../../../store/reviews";
import { dateTransfer } from "../../Helper/dateTransfer";
import Header from "../../Homepage/Header";
import "./index.css";

function ReviewForm({}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { bookingId } = useParams();

  const [content, setContent] = useState("");
  const [cleanliness, setCleanliness] = useState();
  const [check_in, setCheckin] = useState();
  const [communicatoin, setCommunication] = useState();
  const [value, setValue] = useState();
  const [location, setLocation] = useState();
  const [accuracy, setAccuracy] = useState();
  const [loaded, setLoaded] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const booking = useSelector((state) => state.bookings.oneBooking);
  let spot;

  useEffect(() => {
    dispatch(getOneBookingThunk(bookingId)).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const newErrors = {};
    if (!content)
      newErrors.noContent = "Please enter your review of the place.";
    if (!cleanliness)
      newErrors.noCleanliness = "Please rate the cleanliness of the place.";
    if (!check_in)
      newErrors.noCheckin = "Please rate the check in of the place.";
    if (!communicatoin)
      newErrors.noCommunication = "Please rate the communication of the place.";
    if (!value) newErrors.noValue = "Please rate the value of the spot.";
    if (!location)
      newErrors.noLocation = "Please rate the location of the place.";
    if (!accuracy)
      newErrors.noAccuracy = "Please rate the accuracy of the place.";

    setSubmit(false);
    setErrors(newErrors);
  }, [
    content,
    cleanliness,
    check_in,
    communicatoin,
    value,
    location,
    accuracy,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    // review needs to be an object
    if (Object.values(errors).length === 0) {
      const cl = parseInt(cleanliness);
      const ch = parseInt(check_in);
      const cm = parseInt(communicatoin);
      const va = parseInt(value);
      const lo = parseInt(location);
      const ac = parseInt(accuracy);

      const review = {
        content: content,
        cleanliness: cl,
        check_in: ch,
        communicatoin: cm,
        value: va,
        location: lo,
        accuracy: ac,
      };

      // create the spot in database and redirect
      await dispatch(createReviewThunk(booking.spotId, review)).then(() => {
        history.push(`/users/profile`);
      });
      // }
    }
  };

  // get the spot info after dispatch
  if (loaded) {
    spot = booking.spot;
  }

  return (
    loaded && (
      <>
        <Header />
        <div className="cr-form-container">
          <div className="cr-form-spot-info">
            <div className="cr-form-sticky">
              <div className="pb-48 mt-20">
                <div className="with-shadow">
                  <div className="flex-column">
                    <div className="crfs-one">
                      <div className="crfs-img-container">
                        <img
                          src={spot.images[0].url}
                          className="crfs-img"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                    </div>
                    <div className="crfs-two">
                      <div className="crfs-location">
                        <div className="crfs-l-text">{spot.city}</div>
                      </div>
                      <div className="crfs-hosted">
                        <div className="crfs-text">
                          Hosted by {spot.owner.firstName} {spot.owner.lastName}
                        </div>
                      </div>
                      <div className="crfs-stay">
                        <div className="crfs-text">
                          Your stay:{" "}
                          <span className="tc-date-text">
                            {dateTransfer("s_month", booking.start)}{" "}
                            {dateTransfer("date_num", booking.start)}
                            {dateTransfer("year", booking.start) ===
                            dateTransfer("year", booking.end)
                              ? "-"
                              : dateTransfer("year", booking.start) + " - "}
                            {dateTransfer("s_month", booking.start) ===
                            dateTransfer("s_month", booking.end)
                              ? dateTransfer("date_num", booking.end)
                              : dateTransfer("s_month", booking.end) +
                                " " +
                                dateTransfer("date_num", booking.end)}
                            {dateTransfer("year", booking.start) ===
                            dateTransfer("year", booking.end)
                              ? ", " + dateTransfer("year", booking.start)
                              : dateTransfer("year", booking.start)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="cr-form-box">
            <div className="cr-form-body flex-column">
              <div className="cr-rating-block">
                <div className="cr-label">Cleanliness</div>
                <div className="cl-block">
                  <input
                    type="radio"
                    id="cl-star5"
                    name="rate1"
                    value="5"
                    onChange={(e) => setCleanliness(e.target.value)}
                  />
                  <label htmlFor="cl-star5" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cl-star4"
                    name="rate1"
                    value="4"
                    onChange={(e) => setCleanliness(e.target.value)}
                  />
                  <label htmlFor="cl-star4" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cl-star3"
                    name="rate1"
                    value="3"
                    onChange={(e) => setCleanliness(e.target.value)}
                  />
                  <label htmlFor="cl-star3" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cl-star2"
                    name="rate1"
                    value="2"
                    onChange={(e) => setCleanliness(e.target.value)}
                  />
                  <label htmlFor="cl-star2" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cl-star1"
                    name="rate1"
                    value="1"
                    onChange={(e) => setCleanliness(e.target.value)}
                  />
                  <label htmlFor="cl-star1" className="fas fa-star"></label>
                </div>
                {submit && errors.noCleanliness && (
                  <div className="cr-form-error">
                    <span>{errors.noCleanliness}</span>
                  </div>
                )}
              </div>
              <div className="cr-rating-block">
                <div className="cr-label">Check in</div>
                <div className="cl-block">
                  <input
                    type="radio"
                    id="ci-star5"
                    name="rate2"
                    value="5"
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <label htmlFor="ci-star5" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ci-star4"
                    name="rate2"
                    value="4"
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <label htmlFor="ci-star4" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ci-star3"
                    name="rate2"
                    value="3"
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <label htmlFor="ci-star3" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ci-star2"
                    name="rate2"
                    value="2"
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <label htmlFor="ci-star2" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ci-star1"
                    name="rate2"
                    value="1"
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <label htmlFor="ci-star1" className="fas fa-star"></label>
                </div>
                {submit && errors.noCheckin && (
                  <div className="cr-form-error">
                    <span>{errors.noCheckin}</span>
                  </div>
                )}
              </div>
              <div className="cr-rating-block">
                <div className="cr-label">Communication</div>
                <div className="cl-block">
                  <input
                    type="radio"
                    id="cm-star5"
                    name="rate3"
                    value="5"
                    onChange={(e) => setCommunication(e.target.value)}
                  />
                  <label htmlFor="cm-star5" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cm-star4"
                    name="rate3"
                    value="4"
                    onChange={(e) => setCommunication(e.target.value)}
                  />
                  <label htmlFor="cm-star4" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cm-star3"
                    name="rate3"
                    value="3"
                    onChange={(e) => setCommunication(e.target.value)}
                  />
                  <label htmlFor="cm-star3" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cm-star2"
                    name="rate3"
                    value="2"
                    onChange={(e) => setCommunication(e.target.value)}
                  />
                  <label htmlFor="cm-star2" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="cm-star1"
                    name="rate3"
                    value="1"
                    onChange={(e) => setCommunication(e.target.value)}
                  />
                  <label htmlFor="cm-star1" className="fas fa-star"></label>
                </div>
                {submit && errors.noCommunication && (
                  <div className="cr-form-error">
                    <span>{errors.noCommunication}</span>
                  </div>
                )}
              </div>
              <div className="cr-rating-block">
                <div className="cr-label">Value</div>
                <div className="cl-block">
                  <input
                    type="radio"
                    id="va-star5"
                    name="rate4"
                    value="5"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <label htmlFor="va-star5" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="va-star4"
                    name="rate4"
                    value="4"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <label htmlFor="va-star4" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="va-star3"
                    name="rate4"
                    value="3"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <label htmlFor="va-star3" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="va-star2"
                    name="rate4"
                    value="2"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <label htmlFor="va-star2" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="va-star1"
                    name="rate4"
                    value="1"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <label htmlFor="va-star1" className="fas fa-star"></label>
                </div>
                {submit && errors.noValue && (
                  <div className="cr-form-error">
                    <span>{errors.noValue}</span>
                  </div>
                )}
              </div>
              <div className="cr-rating-block">
                <div className="cr-label">Location</div>
                <div className="cl-block">
                  <input
                    type="radio"
                    id="lo-star5"
                    name="rate5"
                    value="5"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label htmlFor="lo-star5" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="lo-star4"
                    name="rate5"
                    value="4"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label htmlFor="lo-star4" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="lo-star3"
                    name="rate5"
                    value="3"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label htmlFor="lo-star3" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="lo-star2"
                    name="rate5"
                    value="2"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label htmlFor="lo-star2" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="lo-star1"
                    name="rate5"
                    value="1"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label htmlFor="lo-star1" className="fas fa-star"></label>
                </div>
                {submit && errors.noLocation && (
                  <div className="cr-form-error">
                    <span>{errors.noLocation}</span>
                  </div>
                )}
              </div>
              <div className="cr-rating-block">
                <div className="cr-label">Accuracy</div>
                <div className="cl-block">
                  <input
                    type="radio"
                    id="ac-star5"
                    name="rate6"
                    value="5"
                    onChange={(e) => setAccuracy(e.target.value)}
                  />
                  <label htmlFor="ac-star5" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ac-star4"
                    name="rate6"
                    value="4"
                    onChange={(e) => setAccuracy(e.target.value)}
                  />
                  <label htmlFor="ac-star4" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ac-star3"
                    name="rate6"
                    value="3"
                    onChange={(e) => setAccuracy(e.target.value)}
                  />
                  <label htmlFor="ac-star3" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ac-star2"
                    name="rate6"
                    value="2"
                    onChange={(e) => setAccuracy(e.target.value)}
                  />
                  <label htmlFor="ac-star2" className="fas fa-star"></label>
                  <input
                    type="radio"
                    id="ac-star1"
                    name="rate6"
                    value="1"
                    onChange={(e) => setAccuracy(e.target.value)}
                  />
                  <label htmlFor="ac-star1" className="fas fa-star"></label>
                </div>
                {submit && errors.noAccuracy && (
                  <div className="cr-form-error">
                    <span>{errors.noAccuracy}</span>
                  </div>
                )}
              </div>
              <div className="cr-content-block">
                <div className="cr-content-label">Review</div>
                <textarea
                  className="cr-content-text"
                  // cols="30"
                  rows={5}
                  placeholder="Describe your experience"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                {submit && errors.noContent && (
                  <div className="cr-form-error">
                    <span>{errors.noContent}</span>
                  </div>
                )}
              </div>
              <div className="flex s-b plr-8">
                <button
                  className="cr-bt-block"
                  onClick={() => history.push("/users/trips")}
                >
                  <span>Cancel</span>
                </button>
                <button className="cr-bt-block" onClick={handleSubmit}>
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default ReviewForm;
