import React from "react";
import { useSelector } from "react-redux";
import { dateTransfer } from "../../Helper/dateTransfer";
import "./index.css";

function PartFive({ ownerSpots, owner }) {
  let review_length = 0;
  for (let key in ownerSpots) {
    review_length += ownerSpots[key].reviews;
  }

  const spotAvg = useSelector((state) => state.spots.singleSpot).averages.avg;

  return (
    <div className="ptb-48">
      <div>
        <section>
          <div className="flex center mb-24 jc-ini">
            <div className="mr-16">
              <div className="wh-76">
                {/* change it to a link later maybe */}
                <div className="pf-host-icon">
                  <img
                    src={owner.icon ? owner.icon : "/default.JPG"}
                    alt="owner icon"
                    className="pf-host-img"
                    onError={(e) => {
                      e.currentTarget.src = "/default.JPG";
                    }}
                  />
                </div>
                {/* <div className="ab-superhost">
                  <svg viewBox="0 0 14 24" className="pf-sh-svg">
                    <path
                      fill="#fff"
                      d="m 10.5 20.0005 c 0 1.93268 -1.56704 3.49949 -3.5 3.49949 s -3.5 -1.56682 -3.5 -3.49949 c 0 -1.93268 1.56704 -3.50051 3.5 -3.50051 s 3.5 1.56783 3.5 3.50051 m -9.99486 -18.5876 l -0.00513752 8.13836 c 0 0.457964 0.216821 0.889929 0.588807 1.17091 l 5.07731 3.8317 c 0.487076 0.367971 1.16837 0.367971 1.65647 0.0009994 l 5.08142 -3.8267 c 0.371986 -0.278978 0.589834 -0.710944 0.590861 -1.16791 c 0.0010271 -1.75186 0.0041101 -6.21051 0.0051391 -8.14036 c 0 -0.50396 -0.420283 -0.912928 -0.939216 -0.912928 l -11.1164 -0.00699945 c -0.517904 -0.00099942 -0.938187 0.407969 -0.939215 0.912928"
                    ></path>
                  </svg>
                </div> */}
              </div>
            </div>
            <div>
              <h2 className="pf-host-by">Hosted by {owner.firstName}</h2>
              <div className="pt-8">
                <div className="pf-join-date">
                  Joined in {dateTransfer("month", owner.created)},{" "}
                  {dateTransfer("year", owner.created)}
                </div>
              </div>
            </div>
          </div>
          <div className="pf-host-detail">
            <div className="plr-16-left">
              <div className="mb-16">
                <ul className="pf-ul-style">
                  <li className="pf-li-style">
                    <div className="flex">
                      <span>
                        <svg
                          style={{
                            display: "block",
                            height: "16px",
                            width: "16px",
                          }}
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
                        </svg>
                      </span>
                      <span className="pf-total-review">
                        {review_length}{" "}
                        {review_length > 1 ? "Reviews" : "Review"}
                      </span>
                    </div>
                  </li>
                  <li className="pf-li-style">
                    <div className="flex">
                      <span>
                        <svg
                          style={{
                            display: "block",
                            height: "16px",
                            width: "16px",
                          }}
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M 16 0.798 l 0.555 0.37 C 20.398 3.73 24.208 5 28 5 h 1 v 12.5 C 29 25.574 23.21 31 16 31 S 3 25.574 3 17.5 V 5 h 1 c 3.792 0 7.602 -1.27 11.445 -3.832 L 16 0.798 Z m 7 9.08 l -9.5 9.501 l -4.5 -4.5 L 6.879 17 l 6.621 6.621 L 25.121 12 L 23 9.879 Z"></path>
                        </svg>
                      </span>
                      <span className="pf-total-review">Identity verified</span>
                    </div>
                  </li>
                  <li className="pf-li-style">
                    <div className="flex">
                      {spotAvg >= 3.7 && (
                        <>
                          <span>
                            <i className="fa-solid fa-trophy" />
                          </span>
                          <span className="pf-total-review">Superhost</span>
                        </>
                      )}
                    </div>
                  </li>
                  <li className="pf-li-style">
                    <div className="flex">
                      <span>
                        <svg
                          style={{
                            display: "block",
                            height: "20px",
                            width: "20px",
                          }}
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#FA3E5F"
                            d="M 1.999 11.06 A 22.24 22.24 0 0 0 16 15.994 a 22.24 22.24 0 0 0 13.963 -4.902 c 0.025 0.122 0.037 0.248 0.037 0.376 v 18.398 A 2.144 2.144 0 0 1 27.846 32 H 4.154 A 2.144 2.144 0 0 1 2 29.865 V 11.466 a 2 2 0 0 1 0.036 -0.376 l -0.037 -0.03 Z M 19 20 h -6 l -0.15 0.005 a 2 2 0 0 0 -1.844 1.838 L 11 22 v 10 h 2 V 22 h 6 v 10 h 2 V 22 l -0.005 -0.15 A 2 2 0 0 0 19 20 Z M 17.309 0.444 l 11.436 9.06 A 20.248 20.248 0 0 1 16 13.995 c -4.825 0 -9.258 -1.681 -12.745 -4.49 L 14.687 0.439 a 2.17 2.17 0 0 1 2.622 0.006 Z M 16 6 a 3 3 0 1 0 0 6 a 3 3 0 0 0 0 -6 Z m 0 2 a 1 1 0 1 1 0 2 a 1 1 0 0 1 0 -2 Z"
                          ></path>
                        </svg>
                      </span>
                      <span className="pf-total-review">
                        Calibnb.org supporter
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              {spotAvg >= 3.7 && (
                <div className="mb-24">
                  <div className="mb-10">
                    <div className="fs-20">
                      {owner.firstName} is a Superhost
                    </div>
                  </div>
                  <span className="super-text">
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                  </span>
                </div>
              )}
            </div>
            <div className="pf-host-detail-right">
              <ul className="pf-re-ul-style">
                <li className="pf-re-li">
                  Response rate: <span>100%</span>
                </li>
                <li className="pf-re-li">
                  Response time: <span>within an hour</span>
                </li>
              </ul>
              {/* <div className="mt-32"> */}
              {/* change it to a link later */}
              {/* <div className="contact-button">Contact Host Button</div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PartFive;
