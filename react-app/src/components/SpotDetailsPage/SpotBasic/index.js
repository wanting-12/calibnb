import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginModal, Modal, ShortModal } from "../../../context/Modal";
import {
  createWishlistThunk,
  deleteOneWishlistThunk,
  getAllWishlistThunk,
} from "../../../store/wishlists";
import { cap } from "../../Helper/capitalize";
import LoginForm from "../../LoginSignup/LoginForm";

import "./index.css";

function PartOne({ spot, imgs }) {
  const dispatch = useDispatch();
  const reviews = spot.reviews;
  const images = Object.values(imgs);
  const avgs = spot.averages;

  const userWishlists = useSelector((state) => state.wishlists.userWishlists);
  const currUser = useSelector((state) => state.session.user);
  // const saveList = currUser.saves.split(", ");
  // const save = saveList.includes(spot.id.toString());

  // console.log(
  //   "type of save",
  //   save,
  //   saveList,
  //   typeof saveList[0],
  //   typeof spot.id.toString()
  // );

  const [wishlistModal, setWishlistModal] = useState(false);
  const [spotId, setSpotId] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const newErrors = {};

    if (name.length === 0)
      newErrors.noTitle = "Please enter the name of your new wishlist.";
    if (name.length > 50) newErrors.toLong = "The title is too long.";

    setErrors(newErrors);
  }, [name]);

  const handleSave = async (e) => {
    e.preventDefault();
    // if (save) {
    //   await dispatch(deleteOneWishlistThunk(spot.id)).then(() =>
    //     getAllWishlistThunk()
    //   );
    // }

    const wishlist = { title: name };
    if (Object.values(errors).length === 0) {
      await dispatch(createWishlistThunk(wishlist, spotId))
        .then(() => dispatch(getAllWishlistThunk()))
        .then(() => {
          setWishlistModal(false);
        });
    }
  };

  const handleSaveButton = async (e) => {
    e.preventDefault();

    if (!currUser.error) {
      if (!save) {
        setWishlistModal("create_wl");
        setSpotId(spot.id);
      } else {
        await dispatch(deleteOneWishlistThunk(spot.id)).then(() =>
          dispatch(getAllWishlistThunk())
        );
      }
    } else {
      setLoginModal(true);
    }
  };

  const handleSaveExist = async (e, title) => {
    e.preventDefault();

    const wishlist = { title: title };
    await dispatch(createWishlistThunk(wishlist, spotId))
      .then(() => dispatch(getAllWishlistThunk()))
      .then(() => setWishlistModal(false));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setWishlistModal("create_new_wl");
  };

  let wishlistOption = [];
  let save_list = {};
  let save = false;

  if (userWishlists) {
    wishlistOption = Object.keys(userWishlists);
    const wishLists = [].concat(...Object.values(userWishlists));
    wishLists.forEach((wishlist) => {
      save_list[Object.keys(wishlist)[0]] = Object.keys(wishlist)[0];
    });
    save = save_list[spot.id] !== undefined;
  }

  // console.log("curr user", currUser.error);
  // console.log("wishlist save list", save_list);
  // console.log("save ", save);
  // console.log("type of wishlish key", userWishlists["wishlist one"][0]["1"]);
  // console.log("wishist option", wishlistOption);
  return (
    <>
      <div className="top-1 flex">
        <div className="flex-full-width plrt-80-24">
          <section>
            <div className="mb-4px">
              <span className="top-1-text">
                <h1 className="top-1-text">{spot.name}</h1>
              </span>
            </div>
            <div className="flex s-b">
              <div className="flex mt-0 fw">
                <span className="mt-4-flex">
                  <span className="mr-4-flex">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="star-top-1"
                    >
                      <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                    </svg>
                  </span>
                  <span className="avg">
                    {avgs?.avg > 0 ? avgs?.avg.toFixed(1) : "New"} ·{" "}
                  </span>
                  <span className="review-count">
                    <button className="show-review">
                      {" "}
                      {reviews} {reviews > 1 ? "reviews" : "review"}
                    </button>
                  </span>
                </span>
                <span className="m-8-0">·</span>
                {avgs?.avg >= 3.7 && (
                  <>
                    <span className="mt-4-flex">
                      <span className="mr-4-flex">
                        <i className="fa-solid fa-trophy" />
                      </span>
                      <span className="superhost">Superhost</span>
                    </span>
                    <span className="m-8-0">·</span>
                  </>
                )}
                <span className="mt-4-flex">
                  <button className="show-map">
                    <span className="show-map-address">
                      {cap(spot.city)}, {cap(spot.state)}, {cap(spot.country)}
                    </span>
                  </button>
                </span>
              </div>
              <div className="flex flex-end">
                <div>
                  <button
                    className={`save${save ? "d" : ""}-button`}
                    onClick={handleSaveButton}
                    //   async () => {
                    //   if (!save) {
                    //     setWishlistModal("create_wl");
                    //     setSpotId(spot.id);
                    //   } else {
                    //     await dispatch(deleteOneWishlistThunk(spot.id)).then(
                    //       () => getAllWishlistThunk()
                    //     );
                    //   }
                    // }
                  >
                    <div className="flex center">
                      <span className="mr-8">
                        <svg
                          viewBox="0 0 32 32"
                          className={`save${save ? "d" : ""}-svg`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m 16 28 c 7 -4.733 14 -10 14 -17 c 0 -1.792 -0.683 -3.583 -2.05 -4.95 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 l -2.051 2.051 l -2.05 -2.051 c -1.367 -1.366 -3.158 -2.05 -4.95 -2.05 c -1.791 0 -3.583 0.684 -4.949 2.05 c -1.367 1.367 -2.051 3.158 -2.051 4.95 c 0 7 7 12.267 14 17 Z"></path>
                        </svg>
                      </span>
                      Save{save ? "d" : ""}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="top-2">
        <div className="flex m-auto">
          <div className="m-auto">
            <div className="pt-24">
              <div className="brd-12">
                <div className="image-container">
                  <div className="img-1">
                    {/* maybe change it to a button later for reviews all images */}
                    <img
                      className="img-size"
                      src={images[0]?.url}
                      alt="spot pic"
                      onError={(e) => {
                        e.currentTarget.src = "/default.JPG";
                      }}
                    />
                  </div>
                  <div className="flex-column img-2-3">
                    <div className="full-wh">
                      <div className="h-50">
                        <img
                          className="img-size"
                          src={images[1]?.url}
                          alt="spot pic"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                      <div className="h-50 pt-8">
                        <img
                          className="img-size"
                          src={images[2]?.url}
                          alt="spot pic"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* come back to change the image display */}
                  <div className="flex-column img-4-5">
                    <div className="full-wh">
                      <div className="h-50">
                        <img
                          className="img-size"
                          src={images[3]?.url}
                          alt="spot pic"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                      <div className="h-50 pt-8">
                        <img
                          className="img-size"
                          src={images[4]?.url}
                          alt="spot pic"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* when use not logined, login modal pop up */}
      {/* {wishlistModal === "create_wl" && currUser.error && (
        <Modal onClose={}
      )} */}
      {wishlistModal === "create_wl" && !currUser.error && (
        <ShortModal onClose={() => setWishlistModal(false)}>
          {/* <WishlistModal
            setWishlistModal={setWishlistModal}
            spotId={spotId}
            wishlistModal={wishlistModal}
          /> */}
          <div className="wl-form">
            <div className="wl-x-cancel">
              {/* onClick handle close modal */}
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
                                    userWishlists[wishlist][0][
                                      Object.keys(userWishlists[wishlist][0])[0]
                                    ]?.spot.images[0].url
                                  }
                                  onError={(e) => {
                                    e.currentTarget.src = "/default.JPG";
                                  }}
                                  alt="wishlist image"
                                />
                              </div>
                            </div>
                            <div className="wl-block-right">
                              <div className="wl-br-text">
                                {
                                  userWishlists[wishlist][0][
                                    Object.keys(userWishlists[wishlist][0])[0]
                                  ]?.title
                                }
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
        </ShortModal>
      )}
      {wishlistModal === "create_new_wl" && (
        <ShortModal onClose={() => setWishlistModal(false)}>
          <div className="wl-form">
            <div className="wl-x-cancel">
              {/* onClick handle close modal and reopen the lst modal*/}
              <button
                className="wl-x-bt"
                onClick={() => setWishlistModal("create_wl")}
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
                className={`wl-create-bt${name.length === 0 ? "-disable" : ""}`}
              >
                Create
              </button>
            </div>
          </div>
        </ShortModal>
      )}
      {loginModal && (
        <LoginModal onClose={() => setLoginModal(false)}>
          <LoginForm setLoginModal={setLoginModal} />
        </LoginModal>
      )}
    </>
  );
}

export default PartOne;
