import { useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Auth() {
  const { login } = useUser();
  const location = useLocation();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    // add preventDefault to prevent 1996 behavior in the form
    try{
      event.preventDefault();
      await login(email,password);
      const url = location.state.origin ? location.state.origin.pathname: '/';
      history.replace(url);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <h1>Welcome. Please login or sign up</h1>
    <form onSubmit={handleSubmit}>
      <input
      placeholder='Email Address'
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      />
      <input
      placeholder='Password'
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      />
      <button type='submit'>Login</button>
      <p>{error}</p>
    </form>
    </>
  )
}
