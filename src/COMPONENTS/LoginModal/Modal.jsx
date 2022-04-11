import React, { useEffect } from "react";
import "./Modal.scss";
import { signInWithGoogle, auth } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Modal(props) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className={props.modalIsActive ? "modal modal-active" : "modal"}>
      <button onClick={signInWithGoogle}>Sign In with google</button>
    </div>
  );
}
