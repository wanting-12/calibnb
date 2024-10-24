import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ShortModal } from "../../../context/Modal";
import { changeImgThunk, getImgsBySpotThunk } from "../../../store/images";
import { addImageThunk, editSpotThunk } from "../../../store/spots";
import Header from "../../Homepage/Header";
import "./index.css";

function EditSpot() {
  const { spotId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector((state) => state.spots.singleSpot);
  const imgs = useSelector((state) => state.images.allImages[spotId]);

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [name, setName] = useState(spot.name);
  const [type, setType] = useState(spot.type);
  const [tags, setTags] = useState(spot.tags);
  const [guests, setGuests] = useState(spot.guests);
  const [bedroom, setBedroom] = useState(spot.bedroom);
  const [beds, setBeds] = useState(spot.beds);
  const [bath, setBath] = useState(spot.bath);
  const [service_fee, setservice_fee] = useState(spot.service_fee);
  const [clean_fee, setclean_fee] = useState(spot.clean_fee);
  const [price, setPrice] = useState(spot.price);
  const [preview_img, setPreviewImg] = useState(spot.images[0].url);
  const [images, setImages] = useState(imgs);

  const [newImgs, setNewImgs] = useState({});
  const [updateImgs, setUpdateImgs] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getImgsBySpotThunk(spotId)).then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    const newErrors = {};
    if (!address)
      newErrors.noAddress = "Please enter the address of your new spot.";
    if (!city) newErrors.noCity = "Please enter the city of your new spot.";
    if (!state) newErrors.noState = "Please choose the state of your new spot.";
    if (!country)
      newErrors.noCountry = "Please choose the country of your new spot.";
    if (!name) newErrors.noName = "Please enter the name of your new spot.";
    if (!type) newErrors.noType = "Please enter the type of your new spot.";
    if (!tags) newErrors.noTags = "Please select the tag of your new spot.";
    if (!guests)
      newErrors.noGuests =
        "Please enter the the maximum number of guests of your new spot.";
    if (!bedroom)
      newErrors.noBedroom =
        "Please enter the the number of bedroom in your new spot.";
    if (!beds)
      newErrors.noBeds = "Please enter the number of beds in your new spot.";
    if (!bath)
      newErrors.noBath = "Please enter the number of baths in your new spot.";
    if (!price)
      newErrors.noPrice = "Please enter the price of your spot per night.";
    if (!service_fee)
      newErrors.noservice_fee =
        "Please enter the service fee of your new spot.";
    if (!clean_fee)
      newErrors.noclean_fee = "Please enter the cleaning fee of your new spot.";
    if (!preview_img)
      newErrors.noPreviewImg = "Please choose the preview image for your spot.";
    if (name && name.length > 255)
      newErrors.longName = "The spot name you entered is too long.";

    if (images && Object.values(images).length < 4)
      newErrors.shortImage =
        "Please upload at least five images for your spot (preview image included).";
    if (price && price <= 0)
      newErrors.invalidPrice =
        "Invalid price (Price needs to be greater than zero).";
    if (service_fee && (service_fee > 100 || service_fee < 0))
      newErrors.invalidService =
        "Service fee needs to be greater or equal to 0, and less than 100.";
    if (clean_fee && (clean_fee > 100 || clean_fee < 0))
      newErrors.invalidClean =
        "Clean fee needs to be greater or equal to 0, and less than 100.";

    if (guests && beds && guests > beds * 3)
      newErrors.tooManyGuests = "Too many guests for your property.";
    if (guests && guests <= 0)
      newErrors.invalidGuest = "Guest number needs to be greater than 0.";
    if (bedroom && bedroom <= 0)
      newErrors.invalidBedroom = "Bedroom number needs to be greater than 0.";
    if (beds && beds <= 0)
      newErrors.invalidBeds = "Bed number needs to be greater than 0.";
    if (bath && bath <= 0)
      newErrors.invalidBath = "Bath number needs to be greater than 0.";

    setSubmit(false);
    setErrors(newErrors);
  }, [
    address,
    city,
    state,
    country,
    name,
    type,
    tags,
    guests,
    bedroom,
    beds,
    bath,
    service_fee,
    clean_fee,
    price,
    preview_img,
    images,
  ]);

  const updateImage = (e, id) => {
    const file = e.target.files[0];
    setPreviewImg(file);

    if (imgs[id]) {
      const obj = {};
      obj[id] = file;
      setUpdateImgs({ ...updateImgs, ...obj });
    }

    const image = document.getElementById("preview-img");
    image.src = URL.createObjectURL(file);
  };

  const updateImages = (e, id) => {
    const file = e.target.files[0];

    if (!images[id]) {
      const obj = {};
      obj[id] = file;
      setNewImgs({ ...newImgs, ...obj });
    } else {
      const obj = {};
      obj[id] = file;
      setImages({ ...images, ...obj });

      if (file) {
        setUpdateImgs({ ...updateImgs, ...obj });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSubmit(true);
    const spotData = {
      ...spot,
      address,
      city,
      state,
      country,
      name,
      price,
      tags,
      type,
      guests,
      bedroom,
      beds,
      bath,
      clean_fee,
      service_fee,
    };

    await dispatch(editSpotThunk(spotData));

    let promiseArr = [];

    // console.log("go in");
    if (Object.values(updateImgs).length > 0) {
      for (let key in updateImgs) {
        // console.log("key in uppdate image", key);
        promiseArr.push(
          dispatch(changeImgThunk(key, updateImgs[key], imgs[key].preview))
        );
      }
    }

    if (Object.values(newImgs).length > 0) {
      for (let key in newImgs) {
        promiseArr.push(dispatch(addImageThunk(spotId, newImgs[key], false)));
      }
    }
    Promise.all(promiseArr).then(() => {
      history.push(`/spots/${spotId}`);
      window.scrollTo(0, 0);
    });
  };

  const total =
    Number(price) +
    Math.round(price * service_fee) +
    Math.round(price * clean_fee);

  let boxes;
  if (loaded) {
    boxes = Array(8)
      .fill(null)
      .map((_, i) => i + parseInt(Object.keys(imgs)[0]) + 1);
  }

  return (
    loaded && (
      <>
        <Header />
        <div className="cs-container plr-40">
          <div className="cs-body flex-column">
            <div className="cs-imgs-container flex-column">
              <div className="cs-imgs-header flex center">
                <h3 className="cs-ih-h3">* Upload your spot images</h3>
                {submit && errors.shortImage && (
                  <div className="error-cs">* {errors.shortImage}</div>
                )}
              </div>
              <div className="cs-imgs-body flex">
                <div className="flex-column">
                  <div className="cs-preview-img-box">
                    <img
                      //   src={spot.preview_img}
                      src={Object.values(images)[0].url}
                      id="preview-img"
                      alt="preview image"
                      className="cs-preview-img"
                      onError={(e) => {
                        e.currentTarget.src = "/default.JPG";
                      }}
                    />
                  </div>
                  <input
                    className="cs-preview-img-content"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateImage(e, Object.values(images)[0].id)
                    }
                  />
                  {submit && errors.noPreviewImg && (
                    <div className="error-cs">* {errors.noPreviewImg}</div>
                  )}
                </div>
                {/* <div className="cs-other-imgs flex"> */}
                <div className="cs-imgs-grid">
                  {boxes.map((box) => (
                    <div
                      className="cs-grid-one flex-column fc-align"
                      key={`a${box}`}
                    >
                      {images[box] ? (
                        <>
                          <div className="wh-200">
                            <img
                              // id="images-1"
                              id={`img-uploaded-${box}`}
                              src={
                                images[box].url
                                  ? images[box].url
                                  : URL.createObjectURL(images[box])
                              }
                              alt="spot image"
                              className="image-uploaded-edit"
                            />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="cs-imgs-one-input"
                            onChange={(e) => updateImages(e, images[box].id)}
                          />
                        </>
                      ) : (
                        <>
                          {newImgs[box] ? (
                            <div className="wh-200">
                              <img
                                src={URL.createObjectURL(newImgs[box])}
                                className="image-uploaded-edit"
                              />
                            </div>
                          ) : (
                            <div className="cs-imgs-one-box-edit">
                              <i className="fa-solid fa-folder-plus" />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="cs-imgs-one-input"
                            onChange={(e) => updateImages(e, box)}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="cs-detail-container flex-column">
              <div className="cs-detail-header">
                <h3 className="cs-ih-h3">Spot information</h3>
              </div>
              <div className="cs-detail-body flex-column">
                <div className="cs-detail-top">
                  <div className="cs-dt-block">
                    <div className="cs-dt-name flex-column w-45 mrb-40-20">
                      <label className="cs-detail-label">Spot name</label>
                      <input
                        type="text"
                        className="p-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {submit && errors.noName && (
                        <div className="error-cs">* {errors.noName}</div>
                      )}
                    </div>
                    <div className="cs-dt-type flex-column w-35 mrb-40-20">
                      <label className="cs-detail-label">
                        Spot tags (i.e. Entire Home)
                      </label>
                      <input
                        type="text"
                        className="p-10"
                        value={tags}
                        onChange={(e) => setType(e.target.value)}
                      />
                      {submit && errors.noTags && (
                        <div className="error-cs">* {errors.noTags}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="cs-detail-mid">
                  <div className="cs-dm-block">
                    <div className="cs-dm-address flex-column w-60 mrb-40-20">
                      <label className="cs-detail-label">Address</label>
                      <input
                        type="text"
                        className="p-10"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {submit && errors.noAddress && (
                        <div className="error-cs">* {errors.noAddress}</div>
                      )}
                    </div>
                    <div className="cs-dm-city flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">City</label>
                      <input
                        type="text"
                        className="p-10"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      {submit && errors.noCity && (
                        <div className="error-cs">* {errors.noCity}</div>
                      )}
                    </div>
                    <div className="cs-dm-state flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">State</label>
                      <select
                        className="p-6"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="" disable="true">
                          Please select the state
                        </option>
                        <option>California</option>
                      </select>
                      {submit && errors.noState && (
                        <div className="error-cs">* {errors.noState}</div>
                      )}
                    </div>
                    <div className="cs-dm-country flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Country</label>
                      <select
                        className="p-6"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="" disable="true">
                          Please select the country
                        </option>
                        <option>United States</option>
                      </select>
                      {submit && errors.noCountry && (
                        <div className="error-cs">* {errors.noCountry}</div>
                      )}
                      {/* <input type="text" /> */}
                    </div>
                  </div>
                </div>
                <div className="cs-detail-bottom">
                  <div className="cs-db-block">
                    <div className="cs-db-guests flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Guests number</label>
                      <input
                        type="number"
                        className="p-10"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      />
                      {submit && errors.noGuests && (
                        <div className="error-cs">* {errors.noGuests}</div>
                      )}
                    </div>
                    <div className="cs-db-beds flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Bed number</label>
                      <input
                        type="number"
                        className="p-10"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                      />
                      {submit && errors.noBeds && (
                        <div className="error-cs">* {errors.noBeds}</div>
                      )}
                    </div>
                    <div className="cs-db-bedroom flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Bedroom number</label>
                      <input
                        type="number"
                        className="p-10"
                        value={bedroom}
                        onChange={(e) => setBedroom(e.target.value)}
                      />
                      {submit && errors.noBedroom && (
                        <div className="error-cs">* {errors.noBedroom}</div>
                      )}
                    </div>
                    <div className="cs-db-bath flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Bath number</label>
                      <input
                        type="number"
                        className="p-10"
                        value={bath}
                        onChange={(e) => setBath(e.target.value)}
                      />
                      {submit && errors.noBath && (
                        <div className="error-cs">* {errors.noBath}</div>
                      )}
                    </div>
                    <div className="cs-db-tags flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Tags</label>
                      <select
                        className="p-6"
                        value={type}
                        onChange={(e) => setTags(e.target.value)}
                      >
                        <option value="" disable="true">
                          Please select one type
                        </option>
                        <option>camping</option>
                        <option>cabins</option>
                        <option>amazing views</option>
                      </select>
                      {submit && errors.noType && (
                        <div className="error-cs">* {errors.noType}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs-price-container">
              <div className="cs-price-header">
                <h3 className="cs-ih-h3">Price detail</h3>
              </div>
              <div className="cs-price-box">
                <div className="cs-price-body flex-column">
                  <div className="cs-pb-top flex">
                    <div className="cs-pb-price flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">
                        Price per night ($)
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="p-10"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {submit && errors.noPrice && (
                        <div className="error-cs">* {errors.noPrice}</div>
                      )}
                    </div>
                    <div className="cs-pb-service_fee flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">Service fee (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        className="p-10"
                        value={service_fee}
                        onChange={(e) => setservice_fee(e.target.value)}
                      />
                      {submit && errors.noservice_fee && (
                        <div className="error-cs">* {errors.noservice_fee}</div>
                      )}
                    </div>
                    <div className="cs-pb-clean_fee flex-column w-20 mrb-40-20">
                      <label className="cs-detail-label">
                        Cleaning fee (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        className="p-10"
                        value={clean_fee}
                        onChange={(e) => setclean_fee(e.target.value)}
                      />
                      {submit && errors.noclean_fee && (
                        <div className="error-cs">* {errors.noclean_fee}</div>
                      )}
                    </div>
                  </div>
                  <div className="cs-pb-bottom">
                    <div className="cs-pb-total">
                      <h2 className="cs-pb-total-text">
                        Total before tax per night :{" "}
                        <span>
                          $ {price && service_fee && clean_fee ? total : ""}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs-button-container-edit">
              <button
                className="cs-button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  history.push("/users/calibnb");
                }}
              >
                Cancel
              </button>
              <button className="cs-button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
        {submit && (
          <ShortModal>
            <div className="loading-create-spot">
              <div className="spinner-red" id="spinner"></div>
              <div className="spin-text">Updating your property...</div>
            </div>
          </ShortModal>
        )}
      </>
    )
  );
}

export default EditSpot;
