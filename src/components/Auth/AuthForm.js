import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const authCtx = useContext(AuthContext);
  const { login, error, setErrorMessage } = authCtx;
  const history = useHistory();

  const ChangeHandler = () => {
    setErrorMessage("");
  };

  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;
    setIsSending(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcdflJp-G2T89bLDDioXs_TqRFjo_QfC8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcdflJp-G2T89bLDDioXs_TqRFjo_QfC8";
    }
    try {
      const resposne = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await resposne.json();
      setIsSending(false);

      if (data.error) return setErrorMessage(data.error.message);

      login(data.idToken);
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
    setIsSending(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            ref={enteredEmailRef}
            type="email"
            id="email"
            required
            onChange={ChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            onChange={ChangeHandler}
            ref={enteredPasswordRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div> {error}</div>
        <div className={classes.actions}>
          {!isSending && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isSending && <p>Sending...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
