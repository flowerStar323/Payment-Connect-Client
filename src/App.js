import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
// const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Admin = React.lazy(() => import('./component/Admin'));
const Matchups = React.lazy(() => import('./component/Matchups'));
const Login = React.lazy(() => import('./component/login/login'));
const Register = React.lazy(() => import('./component/register/register'));
const Leaderboard = React.lazy(() => import('./component/Leaderboard/index'));
const Profile = React.lazy(() => import('./component/Profile'));
const Teammatch = React.lazy(() => import('./component/Admin/Match'));
const Entries = React.lazy(() => import('./component/Admin/ShowUser'));
const Payment = React.lazy(() => import('./component/Payment'));
const EntryHistory = React.lazy(() => import('./component/EntryHistory'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Home" render={props => <Leaderboard {...props} />} />
            <Route exact path="/teammatch" name="Home" render={props => <Admin {...props} />} />
            <Route exact path="/matchup" name="Matchup" render={props => <Matchups {...props} />} />
            <Route exact path="/login" name="Login" render={props => <Login {...props} />} />
            <Route exact path="/register" name="register" render={props => <Register {...props} />} />
            <Route exact path="/profile" name="profile" render={props => <Profile {...props} />} />
            <Route exact path="/user" name="user" render={props => <Entries {...props} />} />
            <Route exact path="/donate" name="payment" render={props => <Payment {...props} />} />
            <Route exact path="/history" name="history" render={props => <EntryHistory {...props} />} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
export default connect(
  mapStateToProps
)(App);




