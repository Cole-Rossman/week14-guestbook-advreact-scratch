import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserHome from './views/UserHome/UserHome';
import Auth from './views/Auth/Auth';


export default function App() {
  return (
    <Switch>
      <Route path="/login">
        <Auth />
      </Route>
      <PrivateRoute path="/">
        <UserHome />
      </PrivateRoute>
    </Switch>
  );
}
