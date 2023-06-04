import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './RegisterPage.scss';
import { registerCall } from '../../auth/authApiCalls';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordvisible] = useState('password');

  const emailRef = useRef();

  const navigate = useNavigate();

  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    const username = email.substring(0, email.indexOf('@'));
    try {
      await registerCall({ email, password, username }, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/login?redirect=/');
    }
  }, [navigate, user]);

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              <MarkEmailReadIcon />
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type={passwordVisible}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <VisibilityOffIcon
              className={
                passwordVisible === 'password' ? 'icon' : 'icon-hidden'
              }
              onClick={() => setPasswordvisible('text')}
            />
            <VisibilityIcon
              className={passwordVisible === 'text' ? 'icon' : 'icon-hidden'}
              onClick={() => setPasswordvisible('password')}
            />
            <button
              className="registerButton"
              onClick={handleFinish}
              disabled={isFetching}
            >
              <CheckCircleIcon />
            </button>
          </form>
        )}
        <div className="signin">
          <span>
            Already have an account?{' '}
            <Link className="link link-signin" to="/login">
              Sign in here!
            </Link>
          </span>
        </div>
      </div>
          
    </div>
  );
};

export default RegisterPage;
