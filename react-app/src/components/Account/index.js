import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../Homepage/Header";
import { useDispatch, useSelector } from "react-redux";
import ReviewsByYou from "./ReviewsByYou";
import { getUserReviewsThunk } from "../../store/reviews";
import LoadingBlock from "../LoadingBlock";
import { dateTransfer } from "../Helper/dateTransfer";

function Account() {
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);

  // const [openLeft, setOpenLeft] = useState(true);
  // const [openRight, setOpenRight] = useState(false);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserReviewsThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Header />
      {!loaded && <LoadingBlock />}
      {loaded && (
        <main className="account-profile">
          <div className="profile-frame">
            <div className="profile-content">
              <div className="pc-left">
                <div className="pc-left-body">
                  <div className="pc-icon-frame">
                    <div className="pc-icon-container">
                      <img
                        className="pc-icon"
                        src={currUser.icon ? currUser.icon : "/default.JPG"}
                        onError={(e) => {
                          e.currentTarget.src = "/default.JPG";
                        }}
                        alt="profile icon"
                      />
                    </div>
                    <div className="pc-icon-text">
                      {/* <div className="link-to-update">Update photo</div> */}
                    </div>
                  </div>
                  <div className="mb-16">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pc-svg"
                    >
                      <path d="M 16 0.798 l 0.555 0.37 C 20.398 3.73 24.208 5 28 5 h 1 v 12.5 C 29 25.574 23.21 31 16 31 S 3 25.574 3 17.5 V 5 h 1 c 3.792 0 7.602 -1.27 11.445 -3.832 L 16 0.798 Z m 0 2.394 l -0.337 0.213 C 12.245 5.52 8.805 6.706 5.352 6.952 L 5 6.972 V 17.5 c 0 6.831 4.716 11.357 10.713 11.497 L 16 29 c 6.133 0 11 -4.56 11 -11.5 V 6.972 l -0.352 -0.02 c -3.453 -0.246 -6.893 -1.432 -10.311 -3.547 L 16 3.192 Z m 7 7.394 L 24.414 12 L 13.5 22.914 L 7.586 17 L 9 15.586 l 4.5 4.499 l 9.5 -9.5 Z"></path>
                    </svg>
                  </div>
                  <div className="pc-email">Email</div>
                  <div className="mb-16 pc-email-text">{currUser.email}</div>
                </div>
              </div>
              <div className="pc-right">
                <div className="pc-right-body">
                  <section>
                    <div className="mb-48">
                      <div className="mb-8">
                        <div className="pc-right-header mb-16">
                          <h1 className="pc-right-h1">
                            Hi, I'm {currUser.username}
                          </h1>
                        </div>
                        <div className="pc-right-join">
                          Joined in {dateTransfer("year", currUser.created)}
                        </div>
                      </div>
                      <div className="pc-edit-profile">
                        {/* <button className="pc-edit-button">Edit profile</button> */}
                      </div>
                    </div>
                    <div className="pcr-header">
                      <div
                        className="pcr-left-title selected"
                        // className={`pcr-left-title ${
                        //   openLeft ? "selected" : ""
                        // }`}
                        // onClick={() => {
                        //   setOpenLeft(true);
                        //   setOpenRight(false);
                        // }}
                      >
                        Reviews by you
                      </div>
                    </div>
                    <div className="pc-show-left">
                      <ReviewsByYou />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Account;
