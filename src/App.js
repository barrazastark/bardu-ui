import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthProvider } from 'components';
import { Login, Main } from 'Views';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/app" />} />
          <Route path="/login" component={Login} />
          <Route path="/app" component={Main} />
          <Route path="*" component={() => <Redirect to="/app" />} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
