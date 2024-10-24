const GET_ALL = "images/getAllImages";
// const GET_ONE = "images/getOneImage"
const CHANGE = "images/changeImage";
// const ADD = "images/addImage";
const DELETE = "images/deleteImage";

const getAll = (images, spotId) => ({
  type: GET_ALL,
  images,
  spotId,
});

// // const getOne = image => ({
// //     type: GET_ONE,
// //     image
// // })

const changeImg = (image) => ({
  type: CHANGE,
  image,
});

// const addImg = (image) => ({
//   type: ADD,
//   image,
// });

const deleteImg = (imageId) => ({
  type: DELETE,
  imageId,
});

export const getImgsBySpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/images`);

  if (response.ok) {
    const images = await response.json();
    // console.log("images in thunk", images);
    dispatch(getAll(images.images, spotId));
  }
};

export const changeImgThunk = (imgId, imgFile, preview) => async (dispatch) => {
  // console.log("enter change image thubk ------------------");
  const formData = new FormData();
  formData.append("image", imgFile);
  formData.append("preview", preview);

  const response = await fetch(`/api/images/${imgId}`, {
    method: "PUT",
    body: formData,
  });

  // console.log("enter change image thubk response ------------------", response);
  if (response.ok) {
    const img = await (await response).json();
    // console.log("img in thunk edit ------------", img);
    await dispatch(changeImg(img));
    return img;
  }
};

const initialState = { allImages: {} };

export default function imageReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL:
      newState = { ...state };
      const spotImgs = {};
      action.images.forEach((img) => {
        // const newImg = {};
        // newImg[img.id] = img;
        spotImgs[img.id] = img;
        // newState.allImages[action.spotId] = newImg;
      });
      newState.allImages[action.spotId] = spotImgs;
      return newState;
    case CHANGE:
      newState = { ...state };
      newState.allImages[action.image.id] = action.image;
      return newState;
    default:
      return state;
  }
}
