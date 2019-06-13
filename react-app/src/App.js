import React, { Component } from "react";
import "./App.css";
import SignUp from "./components/Signup/signup";
import SignIn from "./components/Signin/signin";
import SignUpSignIn from "./components/SignUpSignIn/SignUpSignIn";
import Quoteboard from "./components/Quoteboard/Quoteboard";
import Error from "./components/Error/Error";
import About from "./components/About/About";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";
import NavBarSignIn from "./components/Navbar/NavbarSignin";
import $ from "jquery";
import NavBar from "./components/Navbar/Navbar";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      isLoggedIn: false
    };
  }

  quoteboardAccess() {
    if (this.state.isLoggedIn) {
      // this.quoteboardOrSignup = "Quoteboard";
      return Quoteboard;
    } else {
      // this.quoteboardOrSignup = "SignUpSignIn";
      return SignUpSignIn;
    }
  }
  signupAccess() {
    if (this.state.isLoggedIn) {
      // this.quoteboardOrSignup = "Quoteboard";
      return Quoteboard;
    } else {
      // this.quoteboardOrSignup = "SignUpSignIn";
      return SignUpSignIn;
    }
  }

  navbarSelect() {
    if (this.state.isLoggedIn) {
      return <NavBar username={this.state.username} />;
    } else {
      return <NavBarSignIn />;
    }
  }

  getLoginStatus() {
    $.ajax({
      url: "/db/ensureLogin",
      method: "GET"
    })
      .then(user => {
        this.setState({
          username: user,
          isLoggedIn: true
        });
      })
      .fail(err => {
        this.setState({
          username: "",
          isLoggedIn: false
        });
      });
  }

  componentDidMount() {
    this.getLoginStatus();
    // this.quoteboardAccess();
  }

  render() {
    return (
      <div id="root">
        {this.navbarSelect()}
        <BrowserRouter>
          <Switch>
            <Route path="/" component={About} exact />
            <Route path="/signup" component={this.signupAccess()} />

            <Route path="/quoteboard" component={this.quoteboardAccess()} />
            <Route
              path="/signin"
              component={() => <SignUpSignIn key={"login"} />}
            />
            <Route
              path="/userProfile"
              component={() => <UserProfile username={this.state.username} />}
            />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
