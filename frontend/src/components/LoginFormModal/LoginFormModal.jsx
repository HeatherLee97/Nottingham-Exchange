import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

const demoUser = (e) => {
  e.preventDefault();
  return dispatch(thunkLogin({
     email: "demo@user.io";
    password: "password";
  }))
  .then(closeModal)
  .then(navigate('/dashboard'))
  };

  const demoUser2 = (e) => {
    e.preventDefault();
    return dispatch(thunkLogin({
        email: 'barbiegirl@aa.io',
        password: 'password'
    }))
    .then(closeModal)
    .then(navigate('/dashboard'))
  };

  const demoUser3 = (e) => {
    e.preventDefault();
    return dispatch(thunkLogin({
      email: ''
    }))
    .then(closeModal)
    .then(navigate('/dashboard'))
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
