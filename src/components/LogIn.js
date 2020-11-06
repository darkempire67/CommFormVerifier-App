import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/28616-equity-smart";
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const LogIn = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogIn,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    setOfficeKey,
    officeKey,
    officeKeyError,
  } = props;
  return (
    <section className='login'>
      <div className='loginContainer'>
        <div className='lottie-style'>
          <Lottie options={defaultOptions} height={50} width={250} />
        </div>
        <label>Username</label>
        <input
          type='text'
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='errorMsg'>{emailError}</p>
        <label>Password</label>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='errorMsg'>{passwordError}</p>
        <label>Office Key</label>
        <input
          type='text'
          autoFocus
          required
          value={officeKey}
          onChange={(e) => setOfficeKey(e.target.value)}
        />
        <p className='errorMsg'>{officeKeyError}</p>
        <div className='btnContainer'>
          {hasAccount ? (
            <>
              <button onClick={handleLogIn}>Sign in</button>
              <p>
                Don't have an Account?
                <span
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}
                >
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Sign up</button>
              <p>
                Have an Account?
                <span
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default LogIn;
