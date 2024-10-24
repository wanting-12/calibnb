import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSpotThunk } from "../../store/spots";

function NextStepForm({ setNextStepModal, data }) {
  const dispatch = useDispatch();

  const [tags, setTags] = useState("");
  const [guests, setGuests] = useState();
  const [bedroom, setBedroom] = useState();
  const [beds, setBeds] = useState();
  const [bath, setBath] = useState();
  const [service, setService] = useState();
  const [clean, setClean] = useState();
  const [price, setPrice] = useState();

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const newErros = {};

    if (!tags) newErros.noTags = "Please select the tag for your spot";
    if (!guests)
      newErros.noGuests = "Please select the maximum guests of your spot";
    if (!bedroom)
      newErros.noBedroom = "Please select the bedroom number of your spot";
    if (!beds) newErros.noBed = "Please select the bed number of your spot";
    if (!bath) newErros.noBath = "Please select the bath number of your spot";
    if (!service)
      newErros.noService =
        "Please enter the service fee as percentage of your spot";
    if (!clean)
      newErros.noClean =
        "Please enter the clean fee as percentage of your spot";

    if (!price)
      newErros.noPrice = "Please enter the price of your spot per night.";

    setErrors(newErros);
  }, [tags, guests, bedroom, beds, bath, service, clean]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const newSpot = {
      ...data,
      tags,
      guests,
      bedroom,
      beds,
      bath,
      service,
      clean,
    };

    // console.log("new spot", newSpot);

    dispatch(createSpotThunk(newSpot)).apply.catch(async (res) => {
      const data = await res.json();
      // console.log("data in thunk comp", data);
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="flex-column login-form">
      <div className="x"></div>
      <div className="login-header flex s-b center">
        <div className="header-left"></div>
        <div className="mlr-16">
          <h1 className="h1-inherit">Calibnb your home</h1>
        </div>
        <div className="header-right"></div>
      </div>
      <div className="p-24 login-body">
        <div className="mtb-8-24">
          <h3 className="mb-8">Continue</h3>
        </div>
        <form className="login-form">
          <div className="mt-16">
            <div className="br relative">
              <div className="flex input-box">
                <select
                  //   className="input-text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                >
                  <option value="" disabled>
                    Please select a tag
                  </option>
                  <option>Camping</option>
                  <option>Cabins</option>
                  <option>Amazing views</option>
                </select>
              </div>
              {/* {nextStep && errors.noAddress && (
                  <div className="error-cs">{errors.noAddress}</div>
                )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Guests number"
                />
              </div>
              {/* {nextStep && errors.noCity && (
                  <div className="error-cs">{errors.noCity}</div>
                )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={bedroom}
                  onChange={(e) => setBedroom(e.target.value)}
                  placeholder="Bedroom(s)"
                />
              </div>
              {/* {nextStep && errors.noState && (
                  <div className="error-cs">{errors.noState}</div>
                )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  //   required
                  placeholder="Bed(s)"
                />
              </div>
              {/* {nextStep && errors.noCountry && (
                  <div className="error-cs">{errors.noCountry}</div>
                )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={bath}
                  onChange={(e) => setBath(e.target.value)}
                  placeholder="Bath number"
                />
              </div>
              {/* {nextStep && errors.noName && (
                  <div className="error-cs">{errors.noName}</div>
                )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="decimal"
                  value={clean}
                  onChange={(e) => setClean(e.target.value)}
                  placeholder="Clean fee (in %)"
                />
              </div>
              {/* {nextStep && errors.noType && (
                  <div className="error-cs">{errors.noType}</div>
                )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="decimal"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Service fee (in %)"
                />
              </div>
            </div>
          </div>

          <div className="mtb-16-24">
            <div
              className="p-14-24"
              onClick={(e) => {
                e.preventDefault();
                // setCreateSpotModal(false);
                // setNextStep(true);
                setNextStepModal(false);
              }}
            >
              <span>Submit</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NextStepForm;
