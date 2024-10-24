const LOAD_ALL = "spots/loadAllSpots";
const LOAD_ONE = "spots/loadOneSpot";
const LOAD_CURR = "spots/loadCurrUserSpots";
const DELETE_SPOT = "spots/deleteSpot";

const ADD = "images/addImage";

const loadAll = (spots) => ({
  type: LOAD_ALL,
  spots,
});

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});

const loadOwner = (spots) => ({
  type: LOAD_CURR,
  spots,
});

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

const addImg = (image, spotId) => ({
  type: ADD,
  image,
  spotId,
});

export const getAllSpotThunk = (type) => async (dispatch) => {
  const response = await fetch(`/api/spots?type=${type}`);
  // console.log("response", response.ok);

  if (response.ok) {
    const spots = await response.json();
    // console.log("spots in thunk", spots);
    dispatch(loadAll(spots.spots));

    return spots;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    // console.log("spot", spot);
    dispatch(loadOne(spot));

    return spot;
  }
};

export const getOwnerSpotsThunk = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/spots/owner/${ownerId}`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadOwner(spots.spots));

    return spots;
  }
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();

    dispatch(loadOne(spot));
    return spot;
  }
};

export const editSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));

    return spot;
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // console.log("delete spot");
    dispatch(deleteSpot(spotId));

    return response;
  }
};

export const addImageThunk = (spotId, image, preview) => async (dispatch) => {
  const formData = new FormData();
  // console.log("formdata--------", formData);
  formData.append("image", image);
  formData.append("preview", preview);

  // console.log("image-----", image);
  // console.log("formdata--------", formData);
  //
  const response = await fetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: formData,
  });

  // console.log("response", response);
  if (response.ok) {
    const new_img = await response.json();
    // console.log("new img int hunk", new_img);
    await dispatch(addImg(new_img.new_img, spotId));
    return new_img;
  }
};

const initialState = { allSpots: {}, singleSpot: {}, ownerSpots: {} };

export default function spotReducer(state = initialState, action) {
  // let newState = { ...state };
  let newState = {};
  switch (action.type) {
    case LOAD_ALL:
      const allSpots = {};
      action.spots.forEach((spot) => (allSpots[spot.id] = spot));
      // action.spots.forEach((spot) => (newState.allSpots[spot.id] = spot));
      // return { ...state, allSpots: action.spots };
      newState.allSpots = allSpots;
      return newState;
    case LOAD_CURR:
      const ownerSpots = {};
      action.spots.forEach((spot) => (ownerSpots[spot.id] = spot));
      newState.ownerSpots = ownerSpots;
      // action.spots.forEach((spot) => (newState.ownerSpots[spot.id] = spot));
      return newState;
    // return { ...state, currUserSpots: action.spots };
    case LOAD_ONE:
      newState = { ...state };
      newState.singleSpot = action.spot;
      return newState;
    // return { ...state, singleSpot: action.spot };
    case DELETE_SPOT:
      newState = { ...state };
      delete newState.ownerSpots[action.spotId];
      return newState;
    case ADD:
      // if (!newState.singleSpot.images)
      //   newState.singleSpot.images = [action.image];
      newState = { ...state };
      newState.singleSpot.images.push(action.image);
      return newState;
    default:
      return state;
  }
}
