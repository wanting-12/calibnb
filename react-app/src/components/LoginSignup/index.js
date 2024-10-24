import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./index.css";

export default function LoginSignup() {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <>
      <div className="top-text">
        <div
          className="signup"
          onClick={() => {
            setShowModal(true);
            setLogin(false);
          }}
        >
          Sign up
        </div>
      </div>
      <div
        className="login"
        onClick={() => {
          setShowModal(true);
          setLogin(true);
        }}
      >
        Log in
      </div>

      {/* <Modal onClose={() => setShowModal(false)}>
        <LoginForm />
      </Modal> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? (
            <LoginForm login={login} setLogin={setLogin} />
          ) : (
            <SignupForm login={login} setLogin={setLogin} />
          )}
        </Modal>
      )}
    </>
  );
}
