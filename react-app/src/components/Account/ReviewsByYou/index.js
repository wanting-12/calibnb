import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deleteReviewThunk, getUserReviewsThunk } from "../../../store/reviews";
import { dateTransfer } from "../../Helper/dateTransfer";
import EditReviewModal from "../EditReviewModal";
import "./index.css";

function ReviewsByYou() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showReviewModal, setEditReviewModal] = useState(false);
  const [showDelModal, setDelModal] = useState(false);
  const [editReview, setEditReview] = useState("");
  const [delReview, setDelReview] = useState("");

  const userReviews = useSelector((state) => state.reviews.userReviews);

  const handleDelete = async (e, reviewId) => {
    e.preventDefault();

    await dispatch(deleteReviewThunk(reviewId))
      .then(() => dispatch(getUserReviewsThunk()))
      .then(() => setDelModal(false));
  };

  return (
    <>
      <h2 className="rp-header-h2 flex center">
        <div className="mr-8">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="rp-star-svg"
          >
            <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
          </svg>
        </div>
        {Object.values(userReviews).length >= 1
          ? Object.values(userReviews).length + " reviews"
          : Object.values(userReviews).length + " review"}
      </h2>
      <div className="rp-body">
        {Object.values(userReviews).length > 0 ? (
          <section>
            {Object.values(userReviews).map((review) => (
              <div key={review.id}>
                <div className="rp-block">
                  <div className="flex">
                    <div className="rp-block-left">
                      <div
                        className="link-to-sd"
                        onClick={() => history.push(`/spots/${review.spot.id}`)}
                      >
                        <img
                          src={
                            review.spot.owner.icon
                              ? review.spot.owner.icon
                              : "/default.JPG"
                          }
                          className="rp-owner-icon"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                      <div className="flex-column">
                        <button
                          className="er-edit-bt"
                          onClick={() => {
                            setEditReview(review);
                            setEditReviewModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="er-delete-bt"
                          onClick={() => {
                            setDelReview(review);
                            setDelModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="rp-block-right">
                      <div className="rp-owner-info flex s-b">
                        <span className="rp-owner-name">
                          Host by {review.spot.owner.firstName}
                        </span>
                        <span className="rp-date">
                          You reviewed in{" "}
                          {dateTransfer("month", review.created) +
                            " " +
                            dateTransfer("year", review.created)}
                        </span>
                      </div>
                      <div className="mt-16">
                        <div className="rp-content">
                          {review.content}
                          {/* {review.content.length > 255 ? (
                            review.content
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <></>
        )}
      </div>
      {showReviewModal && (
        <Modal onClose={() => setEditReviewModal(false)}>
          <EditReviewModal
            setEditReviewModal={setEditReviewModal}
            review={editReview}
          />
        </Modal>
      )}
      {showDelModal && (
        <Modal onClose={() => setDelModal(false)}>
          <form className="del-modal-box">
            <div className="flex-column">
              <div className="del-msg">
                <span>Are you sure you want to delete this review? </span>
              </div>
              <div className="del-bt-box">
                <button
                  className="del-bt"
                  onClick={() => {
                    setDelReview("");
                    setDelModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="del-bt"
                  onClick={(e) => handleDelete(e, delReview.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default ReviewsByYou;
