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
    <div>Auth</div>
  )
}
