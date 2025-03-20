import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmitSuccess = (jwtToken: string) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    navigate('/');
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    const { username, password } = formData;
    
    try {
      const result = await axios.post('http://localhost:3001/login', { username, password });
      if (result.data.jwtToken) {
        onSubmitSuccess(result.data.jwtToken);
      } else {
        setShowSubmitError(true);
        setErrorMsg('Invalid login credentials!');
      }
    } catch (err) {
      console.log(err);
      setShowSubmitError(true);
      setErrorMsg('Failed to login. Please try again!');
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
    </>
  );

  return (
    <div className="login-form-container">
      <img
        src="/logoimage.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="/login.jpg"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="/logoimage.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};
