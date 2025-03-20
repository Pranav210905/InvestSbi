import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './SignUp.css'

interface FormData {
  username: string;
  password: string;
  email: string;
}

export const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
  });
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    const { username, password, email } = formData;

    try {
      await axios.post('http://localhost:3001/signUp', { username, email, password });
      setRedirectToLogin(true);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.message 
        ? err.response.data.message 
        : 'Something went wrong. Try again!';
      setShowSubmitError(true);
      setErrorMsg(errorMessage);
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

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="email"
        id="email"
        className="username-input-field"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
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

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-[90%] max-w-[1110px] mx-auto md:flex-row md:justify-around">
      <img
        src="/logoimage.png"
        className="w-[165px] mt-[50px] mb-[35px] md:hidden"
        alt="website logo"
      />
      <img
        src="https://cdn.vectorstock.com/i/500p/83/45/customer-at-reception-modern-vector-21008345.jpg"
        className="w-[278px] md:w-[60%] md:max-w-[524px] md:flex-shrink-1 md:mr-5"
        alt="website signup"
      />
      <form 
        className="flex flex-col items-center p-5 rounded-lg w-full max-w-[350px] md:w-[350px] md:flex-shrink-0 md:shadow-lg md:p-16"
        onSubmit={submitForm}
      >
        <img
          src="/logoimage.png"
          className="hidden md:block w-[185px]"
          alt="website logo"
        />
        <div className="flex flex-col mt-5 w-full">{renderUsernameField()}</div>
        <div className="flex flex-col mt-5 w-full">{renderEmailField()}</div>
        <div className="flex flex-col mt-5 w-full">{renderPasswordField()}</div>

        <button 
          type="submit" 
          className="font-bold text-sm text-white h-10 w-full mt-5 mb-0.5 bg-blue-600 rounded-lg border-none cursor-pointer outline-none hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
        {showSubmitError && (
          <p className="self-start text-xs mt-0.75 mb-0 text-red-600">
            *{errorMsg}
          </p>
        )}
      </form>
    </div>
  );
};

