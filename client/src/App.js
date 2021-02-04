import './App.css';

import { // react-router-dom import
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// 컴포넌트 import
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        <Switch> {/* 주소에 따라 표시할 컴포넌트를 기입*/}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
