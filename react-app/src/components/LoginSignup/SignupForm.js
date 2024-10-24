import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

const checkValidName = (name) => {
  return name.split("").filter((el) => !isNaN(el)).length > 0;
};

function SignupForm({ setSignupModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const button = document.querySelector(".signup-hover-effect");
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) * 100) / button.clientWidth;
      const y = ((e.clientY - rect.top) * 100) / button.clientHeight;
      button.style.setProperty("--mouse-x", x);
      button.style.setProperty("--mouse-y", y);
    });
    button.addEventListener("mouseleave", (e) => {
      button.style.setProperty("--mouse-x", 0);
      button.style.setProperty("--mouse-y", 0);
    });
  }, []);

  useEffect(() => {
    const newErrors = {};

    if (firstName && checkValidName(firstName))
      newErrors.validFirstName = "Please provide a valid first name";
    if (lastName && checkValidName(lastName))
      newErrors.validLastName = "Please provide a valid last name";
    if (
      (username && email && username === email) ||
      username.split("").includes("@")
    )
      newErrors.same = "Username cannot be an email";
    if (password && confirm && password !== confirm)
      newErrors.samePw = "Please enter the same password";
    if (email && !email.split("").includes("@"))
      newErrors.validEmail = "Please provide a valid email.";

    if (!firstName) newErrors.noFirst = "Please enter your first name.";
    if (!lastName) newErrors.noLast = "Please enter your last name.";
    if (!username) newErrors.noUsername = "Please enter your username.";
    if (!email) newErrors.noEmail = "Please enter your email.";
    if (!password) newErrors.noPsw = "Please enter your password.";
    if (!confirm) newErrors.noConfirm = "Please confirm your password.";

    setSubmit(false);
    setErrors(newErrors);
  }, [firstName, lastName, username, email, password, confirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    const data = await dispatch(
      signUp(firstName, lastName, username, email, password)
    );

    if (!data) {
      setSignupModal(false);
      history.push("/");
    }
    // else if (data.errors.length > 0) {
    //   const errs = {};
    //   for (let i in data.errors) {
    //     const errName = data.errors[i].split(" : ")[0];
    //     const errMsg = data.errors[i].split(" : ")[1];

    //     errs[errName] = errMsg;
    //   }
    //   setErrors(errs);
    // }
  };

  return (
    <div className="flex-column login-form">
      <div className="x"></div>
      <div className="signup-header flex s-b center">
        <div className="header-left"></div>
        <div className="mlr-16">
          <h1 className="h1-inherit">Sign up</h1>
        </div>
        <div className="header-right"></div>
      </div>
      <div className="p-10-24 login-body">
        <div className="mtb-8-24">
          <h3 className="mb-8">Welcome to Calibnb</h3>
        </div>
        <form className="signup-form login-form" onSubmit={handleSubmit}>
          <div className="mt-16">
            <div className="signup-block">
              <div className="signup-label">First Name</div>
              <div className="flex signup-input-box">
                <input
                  className="input-text"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              {errors.validFirstName && (
                <p className="su-err-msg">{errors.validFirstName}</p>
              )}
              {submit && errors.noFirst && (
                <p className="su-err-msg">{errors.noFirst}</p>
              )}
            </div>

            <div className="signup-block">
              <div className="signup-label">Last Name</div>
              <div className="flex signup-input-box">
                <input
                  className="input-text"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              {errors.validLastName && (
                <p className="su-err-msg">{errors.validLastName}</p>
              )}
              {submit && errors.noLast && (
                <p className="su-err-msg">{errors.noLast}</p>
              )}
            </div>

            <div className="signup-block">
              <div className="signup-label">Email</div>
              <div className="flex signup-input-box">
                <input
                  className="input-text"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {submit && errors.email && (
                <p className="su-err-msg">{errors.email}</p>
              )}
              {errors.validEmail && (
                <p className="su-err-msg">{errors.validEmail}</p>
              )}
              {submit && errors.noEmail && (
                <p className="su-err-msg">{errors.noEmail}</p>
              )}
            </div>
            <div className="signup-block">
              <div className="signup-lable">Username</div>
              <div className="flex signup-input-box">
                <input
                  className="input-text"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.same && <p className="su-err-msg">{errors.same}</p>}
              {errors.validUsername && (
                <p className="su-err-msg">{errors.validUsername}</p>
              )}
              {submit && errors.validUsername && (
                <p className="su-err-msg">{errors.validUsername}</p>
              )}
              {submit && errors.noUsername && (
                <p className="su-err-msg">{errors.noUsername}</p>
              )}
              {submit && errors.username && (
                <p className="su-err-msg">{errors.username}</p>
              )}
            </div>
            <div className="signup-block">
              <div className="signup-label">Password</div>
              <div className="flex signup-input-box">
                <input
                  className="input-text"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                />
              </div>
              {submit && errors.noPsw && (
                <p className="su-err-msg">{errors.noPsw}</p>
              )}
            </div>
            <div className="signup-block">
              <div className="signup-label">Confirm Password</div>
              <div className="flex signup-input-box">
                <input
                  className="input-text"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              {/* {errors.confirm && (
          <p className="su-err-msg">{errors.confirm}</p>
        )} */}
              {errors.samePw && <p className="su-err-msg">{errors.samePw}</p>}
              {submit && errors.noConfirm && (
                <p className="su-err-msg">{errors.noConfirm}</p>
              )}
            </div>
            <div className="mtb-16-24">
              <button type="submit" className="p-14-24 signup-hover-effect">
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
