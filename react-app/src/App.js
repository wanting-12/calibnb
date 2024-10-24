import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
// import { getAllSpotThunk } from "./store/spots";
import Homepage from "./components/Homepage";
import SpotDetalsPage from "./components/SpotDetailsPage";
import CreateSpot from "./components/Calibnb/CreateSpot";
import Account from "./components/Account";
import Calibnb from "./components/Calibnb";
import EditSpot from "./components/Calibnb/EditSpot";
import TripsPage from "./components/Trips";
import ReviewForm from "./components/Account/CreateReviewForm";
import Footer from "./components/Homepage/Footer";
// import LoadingBlock from "./components/LoadingBlock";
// import Header from "./components/Homepage/Header";
// import Banner from "./components/Homepage/Banner";
import Wishlist from "./components/Wishlist";
// import WishlistModal from "./components/Wishlist/WishlistModal";
import WishlistDetail from "./components/Wishlist/WishlistDetail";
import Loading from "./components/Homepage/Loading";
import SpotLoading from "./components/SpotDetailsPage/SpotLoading";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      // await dispatch(getAllSpotThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/test">
          <SpotLoading />
        </Route>
        <Route path="/users/wishlists/:title" exact={true}>
          <WishlistDetail />
        </Route>
        <Route path="/users/wishlists" exact={true}>
          <Wishlist />
        </Route>
        <Route path="/bookings/:bookingId/review" exact={true}>
          <ReviewForm />
          <Footer />
        </Route>
        <Route path="/users/trips" exact={true}>
          <TripsPage />
          <Footer />
        </Route>
        <Route path="/spots/:spotId/edit" exact={true}>
          <EditSpot />
          <Footer />
        </Route>
        <Route path="/users/calibnb" exact={true}>
          <Calibnb />
          <Footer />
        </Route>
        <Route path="/users/profile" exact={true}>
          <Account />
          <Footer />
        </Route>
        <Route path="/spots/current/new" exact={true}>
          <CreateSpot />
          <Footer />
        </Route>
        <Route path="/spots/:spotId" exact={true}>
          <SpotDetalsPage />
          <Footer />
        </Route>
        <Route path="/" exact={true}>
          <Homepage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
