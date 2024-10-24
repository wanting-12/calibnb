import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOwnerSpotsThunk } from "../../store/spots";
import Header from "../Homepage/Header";
import LoadingBlock from "../LoadingBlock";
import SpotCard from "./SpotCard";
import "./index.css";

function Calibnb() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currUser = useSelector((state) => state.session.user);
  const userSpots = useSelector((state) => state.spots.ownerSpots);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOwnerSpotsThunk(currUser.id)).then(() => setLoaded(true));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/spots/current/new");
  };

  return (
    <>
      <Header />
      {!loaded && <LoadingBlock />}
      {loaded && (
        <>
          <main className="calibnb-container">
            <div className="cc-header">
              <h1 className="cc-header-h1">Properties hosted by you</h1>
            </div>
            <section className="w-100">
              {Object.values(userSpots).length === 0 ? (
                <div className="no-spots-container">
                  <div className="no-spots-text">
                    You don't have any property posted yet!
                  </div>
                  <div className="create-spot-text">
                    Click{" "}
                    <span className="click-to-create" onClick={handleClick}>
                      here
                    </span>{" "}
                    to host your first property!
                  </div>
                </div>
              ) : (
                <SpotCard spots={userSpots} />
              )}
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default Calibnb;
