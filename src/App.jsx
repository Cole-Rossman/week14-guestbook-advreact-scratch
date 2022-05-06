import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserHome from './views/UserHome/UserHome';
import Auth from './views/Auth/Auth';
import Header from './components/Header/Header';
import { useUser } from './context/UserContext';


export default function App() {
  const { currentUser } = useUser();
  return (
    <>
    <Header />
    <Switch>
      <Route path="/login">
        {!currentUser ? <Auth /> : <Redirect to="/" /> }
      </Route>
      <PrivateRoute path="/">
        <UserHome />
      </PrivateRoute>
    </Switch>
    </>
  );
}
