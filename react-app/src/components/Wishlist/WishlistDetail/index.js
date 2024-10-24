import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlistThunk,
  editWishlistThunk,
  getOneWishlist,
} from "../../../store/wishlists";
import LoadingBlock from "../../LoadingBlock";
import Header from "../../Homepage/Header";
import Footer from "../../Homepage/Footer";
import { WishlistModal } from "../../../context/Modal";
import "./index.css";

function WishlistDetail() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { title } = useParams();
  // const wishlist = useSelector((state) => state.wishlists.userWishlists[title]);
  const wishlist = useSelector((state) => state.wishlists.singleWishlist);
  const [newTitle, setNewTitle] = useState(title);
  const [editWishlistModal, setEditWishlistModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // dispatch(getAllWishlistThunk())
    dispatch(getOneWishlist(title)).then(() => setLoaded(true));
    // dispatch(getOneWishlist(title)).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const errs = {};
    if (newTitle.length === 0)
      errs.noTitle = "You need to enter the title for the wishlist.";
    if (newTitle.length > 50) errs.toLong = "The title is too long.";

    setErrors(errs);
  }, [newTitle]);

  const handleDelete = async (e) => {
    e.preventDefault();

    const titleData = { title: newTitle };
    await dispatch(deleteWishlistThunk(title, titleData)).then(() =>
      history.push("/users/wishlists")
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // console.log("title in comp", title, newTitle);

    let promise_arr = [];
    Object.values(wishlist).forEach((w) => {
      const titleData = { title: newTitle.trim() };
      promise_arr.push(dispatch(editWishlistThunk(w.id, titleData)));
    });

    Promise.all(promise_arr)
      .then(() => setEditWishlistModal(false))
      .then(() => dispatch(getOneWishlist(newTitle.trim())))
      .then(() => history.push(`/users/wishlists/${newTitle.trim()}`));
  };

  // console.log("wishlist", singleWishlist);

  return (
    <>
      <Header />
      {!loaded && <LoadingBlock />}
      {loaded && (
        <main className="wd-container">
          <div className="wd-top">
            <div className="flex center s-b">
              <button className="wd-go-back">
                <i
                  className="fa-solid fa-arrow-left"
                  onClick={() => history.push("/users/wishlists")}
                />
              </button>
              <button
                className="wd-more"
                onClick={() => setEditWishlistModal("edit")}
              >
                <i className="fa-solid fa-ellipsis" />
              </button>
            </div>
          </div>
          <div className="wd-mid">
            <h2 className="wd-mid-h2">{title}</h2>
          </div>
          <div className="wd-bottom">
            <div className="wd-grid">
              {Object.values(wishlist).map((item) => (
                <NavLink
                  className="wd-grid-card"
                  key={item.id}
                  to={`/spots/${item.spot.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  // key={Object.values(item)[0].id}
                  // to={`/spots/${Object.values(item)[0].spot.id}`}
                >
                  <div className="grid-column">
                    <div className="flex one-spot">
                      <div className="mb-16 wd-img-box">
                        <img
                          className="wd-one-spot-img"
                          src={item.spot.images[0].url}
                          // src={Object.values(item)[0].spot.images[0].url}
                          alt="spot"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                      <div className="flex s-b plr-8 font-16">
                        <div className="flex-column left">
                          <div className="location">
                            {item.spot.city}
                            {/* {Object.values(item)[0].spot.city} */}
                          </div>
                          <div className="type">{item.spot.type}</div>
                          <div className="date"></div>
                          <div className="price">
                            <span className="price-d">${item.spot.price}</span>{" "}
                            night
                          </div>
                        </div>
                        <div>
                          <div className="flex center">
                            <span className="star-svg-box">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                className="hp-star-svg"
                              >
                                <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                              </svg>
                            </span>
                            <span className="avg-rating">
                              {item.spot.averages.avg > 0
                                ? item.spot.averages.avg
                                : "New"}{" "}
                              {item.spot.reviews > 0
                                ? "(" + item.spot.reviews + ")"
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </main>
      )}
      {editWishlistModal === "edit" && (
        <WishlistModal onClose={() => setEditWishlistModal(false)}>
          <div className="wl-form">
            <div className="wl-x-cancel">
              {/* onClick handle close modal and reopen the lst modal*/}
              <button
                className="wl-x-bt"
                onClick={() => setEditWishlistModal(false)}
              >
                <span className="wl-x-text">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="wl-x-svg"
                  >
                    <path d="m 6 6 l 20 20"></path>
                    <path d="m 26 6 l -20 20"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="ewl-header">
              <div className="wl-header-left"></div>
              <div className="wl-header-mid">
                <h1 className="ewl-header-text">Setting</h1>
              </div>
              <div className="wl-header-right">
                <button
                  className="ewl-del-bt"
                  onClick={() => setEditWishlistModal("ed-del")}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="ewl-body-new">
              <div className="wl-input-box">
                <input
                  className="wl-input"
                  placeholder="Name"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                ></input>
              </div>
              <div className="pt-8">
                {/* {errors ? ( */}
                {errors.noTitle && (
                  <div className="wl-max-text red">* {errors.noTitle}</div>
                )}
                {errors.toLong && (
                  <div className="wl-max-text red">* {errors.toLong}</div>
                )}
                {Object.values(errors).length === 0 && (
                  <div className="wl-max-text">50 Characters maximum</div>
                )}
              </div>
            </div>
            <div className="ewl-footer">
              <button
                className="ewl-cancel-bt"
                onClick={() => setEditWishlistModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`ewl-save-bt${
                  newTitle.length === 0 ? "-disable" : ""
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </WishlistModal>
      )}
      {editWishlistModal === "ed-del" && (
        <WishlistModal onClose={() => setEditWishlistModal(false)}>
          <div className="ed-del-modal">
            <div className="wl-x-cancel">
              {/* onClick handle close modal and reopen the lst modal*/}
              <button
                className="wl-x-bt"
                onClick={() => setEditWishlistModal("edit")}
              >
                <span className="wl-x-text">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="wl-x-svg"
                  >
                    <path d="m 6 6 l 20 20"></path>
                    <path d="m 26 6 l -20 20"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="ewl-header">
              <div className="wl-header-left"></div>
              <div className="wl-header-mid">
                <h1 className="ewl-header-text">Delete this wishlist</h1>
              </div>
              <div className="wl-header-right"></div>
            </div>
            <div className="dwl-body-new">
              Are you sure you want to delete {title}
            </div>
            <div className="ewl-footer">
              <button
                className="ewl-cancel-bt"
                onClick={() => setEditWishlistModal("edit")}
              >
                Cancel
              </button>
              <button
                // onClick={handleSave}
                onClick={(e) => handleDelete(e, title)}
                className={`ewl-save-bt${
                  newTitle.length === 0 ? "-disable" : ""
                }`}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </WishlistModal>
      )}
      <Footer />
    </>
  );
}

export default WishlistDetail;
