import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllWishlistThunk } from "../../store/wishlists";
import Footer from "../Homepage/Footer";
import Header from "../Homepage/Header";
import LoadingBlock from "../LoadingBlock";
import "./index.css";

function Wishlist() {
  const dispatch = useDispatch();
  const history = useHistory();

  const wishlists = useSelector((state) => state.wishlists.userWishlists);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllWishlistThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      {!loaded && <LoadingBlock />}
      {loaded && (
        <main className="wl-container">
          <div className="wl-top">
            <div>
              <h1 className="wl-top-h1">Wishlists</h1>
            </div>
          </div>
          <div className="wl-bottom">
            {Object.keys(wishlists).length > 0 ? (
              <ul className="wl-ul">
                {Object.keys(wishlists).map((title) => (
                  <li className="wl-li" key={title}>
                    {/* make this alink later */}
                    <div
                      className="wl-li-link"
                      onClick={() => {
                        history.push(`/users/wishlists/${title}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="wl-li-top">
                        <div className="wl-tl">
                          <img
                            className="wl-img"
                            src={
                              Object.values(wishlists[title][0])[0].spot
                                .images[0].url
                            }
                            alt="wishlist image"
                          />
                        </div>
                        <div className="wl-tr">
                          <img
                            className="wl-img"
                            src={
                              Object.values(wishlists[title][0])[0].spot
                                .images[0].url
                            }
                            alt="wishlist image"
                          />
                        </div>
                        <div className="wl-br">
                          <img
                            className="wl-img"
                            src={
                              Object.values(wishlists[title][0])[0].spot
                                .images[0].url
                            }
                            alt="wishlist image"
                          />
                        </div>
                      </div>
                      <div className="wl-li-bottom">
                        <div className="wl-lb-title">{title}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-spots-container">
                <div className="no-spots-text">
                  There is nothing in your wishlist yet.
                </div>
                <div className="create-spot-text">
                  Click{" "}
                  <span className="click-to-create" onClick={handleClick}>
                    here
                  </span>{" "}
                  to save some places in your wishlist!
                </div>
              </div>
            )}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}

export default Wishlist;
