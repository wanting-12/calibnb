import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ShortModal } from "../../../context/Modal";
import { getImgsBySpotThunk } from "../../../store/images";
import { deleteSpotThunk, getOneSpotThunk } from "../../../store/spots";
import { dateTransfer } from "../../Helper/dateTransfer";
import "./index.css";

function SpotCard() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userSpots = Object.values(
    useSelector((state) => state.spots.ownerSpots)
  );

  const [showDelSpotModal, setDelSpotModal] = useState(false);
  const [delId, setDelId] = useState();

  const handleEdit = (e, spotId) => {
    e.preventDefault();
    dispatch(getOneSpotThunk(spotId))
      .then(() => dispatch(getImgsBySpotThunk(spotId)))
      .then(() => history.push(`/spots/${spotId}/edit`));
  };

  const handleDelete = async (e, spotId) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spotId)).then(() => setDelSpotModal(false));
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/spots/current/new");
  };

  return (
    <>
      {userSpots.length === 0 && (
        <div className="no-spots-container">
          <div className="no-spots-text">You don't have any spot yet!</div>
          <div className="create-spot-text">
            Click{" "}
            <span className="click-to-create" onClick={handleClick}>
              here
            </span>{" "}
            to host your first property!
          </div>
        </div>
      )}
      <div className="spot-card">
        {userSpots.map((spot) => (
          <div className="sc-one flex" key={spot.id}>
            <div className="flex-column w-70">
              <div className="sc-img-container">
                <img
                  className="cs-img"
                  src={spot.images[0]?.url}
                  alt="spot image"
                  onError={(e) => {
                    e.currentTarget.src = "/default.JPG";
                  }}
                />
              </div>
              <div className="sc-date">
                <div className="sc-date-text">
                  Posted {dateTransfer("month", spot.created)},{" "}
                  {dateTransfer("year", spot.created)}
                </div>
              </div>
            </div>
            <div className="sc-buttons flex-column">
              <div className="sc-edit" onClick={(e) => handleEdit(e, spot.id)}>
                <button className="sc-edit-bt">Edit</button>
              </div>
              <div
                className="sc-del mtb-16-24"
                onClick={() => {
                  setDelSpotModal(true);
                  setDelId(spot.id);
                }}
              >
                <button className="sc-del-bt">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDelSpotModal && (
        <ShortModal onClose={() => setDelSpotModal(false)}>
          <form className="del-modal-box">
            <div className="flex-column">
              <div className="del-msg">
                <span>Are you sure you want to delete this spot? </span>
              </div>
              <div className="del-bt-box">
                <button
                  className="del-bt"
                  onClick={() => setDelSpotModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="del-bt"
                  onClick={(e) => handleDelete(e, delId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </ShortModal>
      )}
    </>
  );
}

export default SpotCard;
