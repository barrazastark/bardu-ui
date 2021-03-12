import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthProvider, Alert } from 'components';
import { Login, Main } from 'Views';

function App() {
  const message = useSelector((state) => state.message.message);
  return (
    <AuthProvider>
      <Alert message={message.text} type={message.type} />
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
