import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";
import AuthContext from "../../Store/auth-context";

const ProfileForm = () => {
  const changePassRef = useRef();
  const [isPassChanged, setIsPassChanged] = useState(false);
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const changePassHandler = async (e) => {
    e.preventDefault();
    const newPassword = changePassRef.current.value;

    const resposne = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDcdflJp-G2T89bLDDioXs_TqRFjo_QfC8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(resposne);
    if (!resposne.ok) throw new Error("Invalid passowrd");

    setIsPassChanged(true);
    setTimeout(() => {
      history.replace("/");
    }, 1500);
  };

  return (
    <form className={classes.form} onSubmit={changePassHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={changePassRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {isPassChanged && (
        <div>
          <h3>Password changed successfully</h3>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
