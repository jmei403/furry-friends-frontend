import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentUser } from "./adapters/SessionsAdapter";
import { fetchLikes } from "./adapters/LikesAdapter";
import NavBar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import SearchPage from "./components/SearchPage";
import Login from "./components/Login";
import Profile from "./containers/Profile";
import PetPage from "./containers/PetPage";
import UserEdit from "./components/UserEdit";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchLikes();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (currentUser.id) {
                  return <Home />;
                } else {
                  return <Welcome />;
                }
              }}
            />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/edit" component={UserEdit} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/pets" component={SearchPage} />
            <Route
              path="/pets/:id"
              render={(props) => {
                const id = props.match.params.id;
                const history = props.history;
                return <PetPage id={id} history={history} />;
              }}
            />
            <Route
              exact
              path="/types/:type"
              render={(props) => {
                const type = props.match.params.type;
                return <SearchPage type={type} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser,
  };
};

export default connect(mapStateToProps, { getCurrentUser, fetchLikes })(App);
