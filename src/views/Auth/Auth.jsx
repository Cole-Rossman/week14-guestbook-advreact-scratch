import { useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signUpUser } from '../../services/user';
import authStyle from './Auth.css'

export default function Auth() {
  const { setUser, login } = useUser()

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('sign-in');

  const handleSubmit = async (event) => {
    // add preventDefault to prevent 1996 behavior in the form
    event.preventDefault();
    try{
    if (type === 'sign-in') {
      const resp = await login(email,password);
      // not setting user here because login function does so in context
      history.push('/');
    } else {
      const resp = await signUpUser(email, password);
      // console.log('resp', resp)
      setUser(resp.email);
      history.push('/');
    }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <h1>
      <span className={type === 'sign-in' && authStyle.active} onClick={() => setType('sign-in')}>
          Sign In
      </span>
      <span className={type === 'sign-up' && authStyle.active} onClick={() => setType('sign-up')}>
          Sign Up
      </span>
    </h1>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
      <input
      placeholder='Email Address'
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      />
      </label>
      <label>
        Password:
      <input
      placeholder='Password'
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      />
      </label>
      <button type='submit'>Submit</button>
      <p>{error}</p>
    </form>
    </>
  )
}
