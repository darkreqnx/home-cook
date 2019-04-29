import React, { Component } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    type: ""
  };
  onLogoutClick = e => {
    this.props.history.push("/");
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    let userLinks;
    let logout;
    if (this.props.auth.isAuthenticated) {
      logout = (
        <button onClick={this.onLogoutClick} className="btn btn-large">
          LOGOUT
        </button>
      );
    } else {
      logout = <React.Fragment />;
    }
    let userType = this.props.auth.type;
    console.log("USER OBJECT");
    console.log(userType);
    if (userType) {
      switch (userType) {
        case "CUSTOMER":
          userLinks = (
            <React.Fragment>
              <NavLink to="/chome" className="NavBar-Link">
                HOME
              </NavLink>
              <NavLink to="/cart" className="NavBar-Link">
                CART
              </NavLink>
            </React.Fragment>
          );
          // this.setState({ type: "CUSTOMER" });
          break;
        case "MANAGER":
          userLinks = (
            <React.Fragment>
              <NavLink to="/chome" className="NavBar-Link">
                HOME
              </NavLink>
              <NavLink to="/addDeli" className="NavBar-Link">
                ADD DELIVERY PERSONNEL
              </NavLink>
              <NavLink to="/addHK" className="NavBar-Link">
                ADD HK
              </NavLink>
            </React.Fragment>
          );
          // this.setState({ type: "MANAGER" });
          break;
        case "HK":
          userLinks = (
            <React.Fragment>
              <NavLink to="/chome" className="NavBar-Link">
                HOME
              </NavLink>
              <NavLink to="/addMenu" className="NavBar-Link">
                ADD MENU ITEM
              </NavLink>
              <NavLink to="/hkorders" className="NavBar-Link">
                ORDERS
              </NavLink>
            </React.Fragment>
          );
          // this.setState({ type: "HK" });
          break;
        case "DELIVERY":
          userLinks = (
            <React.Fragment>
              <NavLink to="/chome" className="NavBar-Link">
                HOME
              </NavLink>
            </React.Fragment>
          );
          // this.setState({ type: "DELIVERY" });
          break;
        default:
          userLinks = <React.Fragment />;
        // this.setState({ type: "DEFAULT" });
      }
    } else {
      userLinks = <React.Fragment />;
    }

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              className="col s5 brand-logo left black-text"
              id="brand-logo"
            >
              YummyMummy
            </Link>
            <div className="topnav-right">
              <div className="NavBar-Link"> {userLinks}</div>
              <div className="button-holder">{logout}</div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavBar));
