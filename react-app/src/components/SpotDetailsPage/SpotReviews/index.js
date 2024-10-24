import React from "react";
import { dateTransfer } from "../../Helper/dateTransfer";
import "./index.css";

function PartThree({ reviews, spot }) {
  reviews = Object.values(reviews);

  return (
    <div className="flex bb">
      <div className="ptb-48 w-100">
        <section>
          <div className="mb-36 flex center">
            <span className="mr-8 ">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="rbox-star"
              >
                <path d="M 15.094 1.579 l -4.124 8.885 l -9.86 1.27 a 1 1 0 0 0 -0.542 1.736 l 7.293 6.565 l -1.965 9.852 a 1 1 0 0 0 1.483 1.061 L 16 25.951 l 8.625 4.997 a 1 1 0 0 0 1.482 -1.06 l -1.965 -9.853 l 7.293 -6.565 a 1 1 0 0 0 -0.541 -1.735 l -9.86 -1.271 l -4.127 -8.885 a 1 1 0 0 0 -1.814 0 Z"></path>
              </svg>
            </span>
            <span className="flex">
              <span className="rbox-review-count">
                {spot.averages.avg > 0 ? spot.averages.avg.toFixed(1) : "New"}
                {" · "} {spot.reviews} {spot.reviews > 1 ? "reviews" : "review"}
              </span>
            </span>
          </div>
          <div className="rate-container">
            <div className="mb-26">
              <div className="rate-bar-container">
                <div className="rating-block relative">
                  <div className="mb-20">
                    <div className="flex center s-b w-100">
                      <div className="f-20">Cleanliness</div>
                      <div className="flex w-50 center">
                        <div className="rating-bar">
                          <span
                            className="rating-bar-black"
                            style={{
                              width: `${(spot.averages.avg_c / 5) * 100}%`,
                            }}
                          ></span>
                        </div>
                        <span className="bar-rating-num">
                          {spot.averages.avg_c.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rating-block relative">
                  <div className="mb-20">
                    <div className="flex center s-b w-100">
                      <div className="f-20">Accuracy</div>
                      <div className="flex w-50 center">
                        <div className="rating-bar">
                          <span
                            className="rating-bar-black"
                            style={{
                              width: `${(spot.averages.avg_a / 5) * 100}%`,
                            }}
                          ></span>
                        </div>
                        <span className="bar-rating-num">
                          {spot.averages.avg_a.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rating-block relative">
                  <div className="mb-20">
                    <div className="flex center s-b w-100">
                      <div className="f-20">Communication</div>
                      <div className="flex w-50 center">
                        <div className="rating-bar">
                          <span
                            className="rating-bar-black"
                            style={{
                              width: `${(spot.averages.avg_cm / 5) * 100}%`,
                            }}
                          ></span>
                        </div>
                        <span className="bar-rating-num">
                          {spot.averages.avg_cm.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rating-block relative">
                  <div className="mb-20">
                    <div className="flex center s-b w-100">
                      <div className="f-20">Location</div>
                      <div className="flex w-50 center">
                        <div className="rating-bar">
                          <span
                            className="rating-bar-black"
                            style={{
                              width: `${(spot.averages.avg_l / 5) * 100}%`,
                            }}
                          ></span>
                        </div>
                        <span className="bar-rating-num">
                          {spot.averages.avg_l.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rating-block relative">
                  <div className="mb-20">
                    <div className="flex center s-b w-100">
                      <div className="f-20">Check-in</div>
                      <div className="flex w-50 center">
                        <div className="rating-bar">
                          <span
                            className="rating-bar-black"
                            style={{
                              width: `${(spot.averages.avg_ci / 5) * 100}%`,
                            }}
                          ></span>
                        </div>
                        <span className="bar-rating-num">
                          {spot.averages.avg_ci.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rating-block relative">
                  <div className="mb-20">
                    <div className="flex center s-b w-100">
                      <div className="f-20">Value</div>
                      <div className="flex w-50 center">
                        <div className="rating-bar">
                          <span
                            className="rating-bar-black"
                            style={{
                              width: `${(spot.averages.avg_v / 5) * 100}%`,
                            }}
                          ></span>
                        </div>
                        <span className="bar-rating-num">
                          {spot.averages.avg_v.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="review-container">
            <div className="review-content-container">
              {reviews.map((r) => (
                <div className="review-content-block" key={r.id}>
                  <div className="content-text-container">
                    <div className="r-text-top">
                      <div className="r-ml-16">
                        <h3 className="r-name">{r.user.username}</h3>
                        <div className="flex">
                          <div className="r-date">
                            {dateTransfer("month", r.created)}{" "}
                            {dateTransfer("year", r.created)}
                          </div>
                        </div>
                      </div>
                      <div className="r-icon">
                        {/* maybe change it to a button later */}
                        {/* <div className="br-50"> */}
                        <img
                          className="r-img"
                          src={r.user.icon}
                          alt="reviewer"
                          onError={(e) => {
                            e.currentTarget.src = "/default.JPG";
                          }}
                        />
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="r-text-bottom">
                      <div className="r-text-container">{r.content}</div>
                      {/* {r.content.length >= 160 && (
                        <div className="r-show-more">
                          <button className="r-show-more-button">
                            Show more {">"}
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="all-review-button-container"></div>
        </section>
      </div>
    </div>
  );
}

export default PartThree;
