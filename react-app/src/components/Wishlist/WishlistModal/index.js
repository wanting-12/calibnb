import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
// import { saveWishlist } from "../../../store/session";
import {
  createWishlistThunk,
  getAllWishlistThunk,
} from "../../../store/wishlists";
import "./index.css";

function WishlistModal({ spotId }) {
  const dispatch = useDispatch();

  const [setWishlistModal, wishlistModal] = useState(false);
  const [name, setName] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const userWishlists = useSelector((state) => state.wishlists.userWishlists);

  useEffect(() => {
    dispatch(getAllWishlistThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const newErrors = {};

    if (name.length === 0)
      newErrors.noWishlist = "Please enter the name of your new wishlist.";
    if (name.length > 50) newErrors.toLong = "The title is too long.";

    // setSubmit(false);
    setErrors(newErrors);
  }, [name]);

  const handleSave = async (e) => {
    e.preventDefault();

    // console.log("errors here", errors);
    if (Object.values(errors).length === 0) {
      const wishlist = { title: name };
      await dispatch(createWishlistThunk(wishlist, spotId))
        // .then(() => dispatch(saveWishlist(spotId)))
        .then(() => dispatch(getAllWishlistThunk()))
        .then(() => {
          setWishlistModal(false);
        });
    }
  };

  const handleSaveExist = async (e, title) => {
    e.preventDefault();

    const wishlist = { title: title };
    await dispatch(createWishlistThunk(wishlist, spotId))
      // .then(() => dispatch(saveWishlist(spotId)))
      .then(() => dispatch(getAllWishlistThunk()))
      .then(() => setWishlistModal(false));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setWishlistModal("create_new_wl");
  };

  let wishlistOption = [];
  if (userWishlists) {
    wishlistOption = Object.keys(userWishlists);
  }

  // console.log("name and errors", name, errors, name.length);
  // console.log("the value of wishlistModal", wishlistModal);
  // console.log("create modal open", createModal);
  // console.log("name", name, name.length);
  // console.log("wishlist option", wishlistOption);
  //   console.log("save exist and create new", saveExist, createNew);
  return (
    loaded && (
      <>
        <div className="wl-form">
          <div className="wl-x-cancel">
            {/* onClick handle close modal */}
            <button className="wl-x-bt" onClick={() => setWishlistModal(false)}>
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
          <div className="wl-header">
            <div className="wl-header-left"></div>
            <div className="wl-header-mid">
              <h1 className="wl-header-text">Your wishlists</h1>
            </div>
            <div className="wl-header-right"></div>
          </div>
          <div className="wl-body">
            <div className="wl-block">
              {/* onClick to handle create new wishlist */}
              <button
                className="wl-block-bt"
                // onClick={() => setWishlistModal("create_new_wl")}
                onClick={handleNext}
                // onClick={() => {
                //   setCreateWishlishModal(true);
                //   setWishlistModal(false);
                // }}
              >
                <div className="flex s-b center pt-2">
                  <div className="ptb-8 br-1 flex">
                    <div className="mr-16">
                      <div className="block-plus">
                        <img
                          className="block-plus-img"
                          src="https://a0.muscache.com/im/pictures/da1a2f06-efb0-4079-abce-0f6fc82089e0.jpg"
                        />
                      </div>
                    </div>
                    <div className="wl-block-right">
                      <div className="wl-br-text">Create new wishlist</div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            {Object.values(userWishlists).length > 0 &&
              wishlistOption.map((wishlist) => (
                <div key={wishlist}>
                  <button
                    className="wl-block-bt"
                    onClick={(e) => {
                      handleSaveExist(e, wishlist);
                    }}
                  >
                    <div className="flex s-b center pt-2">
                      <div className="ptb-8 br-1 flex">
                        <div className="flex">
                          <div className="mr-16">
                            <div className="block-plus">
                              <img
                                className="block-plus-img"
                                src={
                                  userWishlists[wishlist][0].spot.images[0].url
                                }
                                alt="wishlist image"
                              />
                            </div>
                          </div>
                          <div className="wl-block-right">
                            <div className="wl-br-text">
                              {userWishlists[wishlist][0].title}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
          </div>
        </div>
        {wishlistModal === "create_new_wl" && (
          <Modal onClose={() => setWishlistModal(false)}>
            <div className="wl-form">
              <div className="wl-x-cancel">
                {/* onClick handle close modal and reopen the lst modal*/}
                <button
                  className="wl-x-bt"
                  onClick={() => setWishlistModal(false)}
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
              <div className="wl-header">
                <div className="wl-header-left"></div>
                <div className="wl-header-mid">
                  <h1 className="wl-header-text">Name this wishlist</h1>
                </div>
                <div className="wl-header-right"></div>
              </div>
              <div className="wl-body-new">
                <div className="wl-input-box">
                  <input
                    className="wl-input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="pt-8">
                  {errors.noTitle && (
                    <div className="wl-max-text red">* {errors.noTitle}</div>
                  )}
                  {errors.toLong && (
                    <div className="wl-max-text red">* {errors.toLong}</div>
                  )}
                  {Object.values(errors).length === 0 && (
                    <div className="wl-max-text">50 Characters maximum</div>
                  )}
                  {/* <div className="wl-max-text">50 Characters maximum</div> */}
                </div>
              </div>
              <div className="wl-footer">
                <button
                  onClick={handleSave}
                  className={`wl-create-bt${
                    name.length === 0 ? "-disable" : ""
                  }`}
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>
        )}
      </>
    )
  );
}

export default WishlistModal;
