import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editReviewThunk, getUserReviewsThunk } from "../../../store/reviews";
import "./index.css";

function EditReviewModal({ setEditReviewModal, review }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(review.content);
  const [cleanliness, setCleanliness] = useState(review.cleanliness);
  const [check_in, setCheckin] = useState(review.check_in);
  const [communication, setCommunication] = useState(review.communication);
  const [value, setValue] = useState(review.value);
  const [location, setLocation] = useState(review.location);
  const [accuracy, setAccuracy] = useState(review.accuracy);

  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    if (!content)
      newErrors.noContent = "Please enter your review of the place.";
    if (!cleanliness)
      newErrors.noCleanliness = "Please rate the cleanliness of the place.";
    if (!check_in)
      newErrors.noCheckin = "Please rate the check in of the place.";
    if (!communication)
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
    communication,
    value,
    location,
    accuracy,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    const newReview = {
      content,
      cleanliness,
      check_in,
      communication,
      value,
      location,
      accuracy,
    };

    if (Object.values(errors).length === 0) {
      await dispatch(editReviewThunk(newReview, review.id))
        .then(async () => await dispatch(getUserReviewsThunk()))
        .then(() => setEditReviewModal(false));
    }
  };

  const rating = [5, 4, 3, 2, 1];
  return (
    <>
      <form onSubmit={handleSubmit} className="er-form-box">
        <div className="cr-form-body flex-column">
          <div className="er-rating-block">
            <div className="er-label flex s-b center">
              <div className="er-label-text">Cleanliness</div>
              <select
                className="er-select"
                name="cleanRate"
                value={cleanliness}
                onChange={(e) => setCleanliness(parseInt(e.target.value))}
              >
                {rating.map((r) => (
                  <option key={"cl" + r}>{r}</option>
                ))}
              </select>
            </div>
            {submit && errors.noCleanliness && (
              <div className="er-form-error">
                <span>{errors.noCleanliness}</span>
              </div>
            )}
          </div>
          <div className="er-rating-block">
            <div className="er-label flex s-b center">
              <div className="er-label-text">Check in</div>
              <select
                className="er-select"
                name="checkinRate"
                value={check_in}
                onChange={(e) => setCheckin(parseInt(e.target.value))}
              >
                {rating.map((r) => (
                  <option key={"ch" + r}>{r}</option>
                ))}
              </select>
            </div>
            {submit && errors.noCheckin && (
              <div className="er-form-error">
                <span>{errors.noCheckin}</span>
              </div>
            )}
          </div>
          <div className="er-rating-block">
            <div className="er-label flex s-b center">
              <div className="er-label-text">Communication</div>
              <select
                className="er-select"
                name="commuRate"
                value={communication}
                onChange={(e) => setCommunication(parseInt(e.target.value))}
              >
                {rating.map((r) => (
                  <option key={"cm" + r}>{r}</option>
                ))}
              </select>
            </div>

            {submit && errors.noCommunication && (
              <div className="er-form-error">
                <span>{errors.noCommunication}</span>
              </div>
            )}
          </div>
          <div className="er-rating-block">
            <div className="er-label flex s-b center">
              <div className="er-label-text">Value</div>
              <select
                className="er-select"
                name="valueRate"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
              >
                {rating.map((r) => (
                  <option key={"va" + r}>{r}</option>
                ))}
              </select>
            </div>

            {submit && errors.noValue && (
              <div className="er-form-error">
                <span>{errors.noValue}</span>
              </div>
            )}
          </div>
          <div className="er-rating-block">
            <div className="er-label flex s-b center">
              <div className="er-label-text">Location</div>
              <select
                className="er-select"
                name="locaRate"
                value={location}
                onChange={(e) => setLocation(parseInt(e.target.value))}
              >
                {rating.map((r) => (
                  <option key={"lo" + r}>{r}</option>
                ))}
              </select>
            </div>

            {submit && errors.noLocation && (
              <div className="er-form-error">
                <span>{errors.noLocation}</span>
              </div>
            )}
          </div>
          <div className="er-rating-block">
            <div className="er-label flex s-b center">
              <div className="er-label-text">Accuracy</div>
              <select
                className="er-select"
                name="accRate"
                value={accuracy}
                onChange={(e) => setAccuracy(parseInt(e.target.value))}
              >
                {rating.map((r) => (
                  <option key={"ac" + r}>{r}</option>
                ))}
              </select>
            </div>
            {submit && errors.noAccuracy && (
              <div className="er-form-error">
                <span>{errors.noAccuracy}</span>
              </div>
            )}
          </div>
          <div className="er-content-block">
            <div className="er-content-label">Review</div>
            <textarea
              className="er-content-text"
              rows={5}
              placeholder="Describe your experience"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {submit && errors.noContent && (
              <div className="er-form-error">
                <span>{errors.noContent}</span>
              </div>
            )}
          </div>
          <div className="flex s-b plr-8">
            <button
              className="er-bt-block"
              onClick={() => setEditReviewModal(false)}
            >
              <span>Cancel</span>
            </button>
            <button className="er-bt-block" onClick={handleSubmit}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditReviewModal;
