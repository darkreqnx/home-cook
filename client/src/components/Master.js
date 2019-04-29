import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./layout/NavBar";
import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PrivateRoute from "./private-route/PrivateRoute";
import CHome from "./customer/Chome";
import Manager from "./manager/Manager";
import Cart from "./customer/Cart";
import AddDeli from "./manager/AddDeli";
import AddHK from "./manager/AddHK";
import HK from "./hk/HK";
import AddMenu from "./hk/AddMenu";
import HKOrders from "./hk/Orders.jsx";
import Delivery from "./delivery/Delivery";
import MOrders from "./manager/MOrders";
import Dashboard from "./manager/Dashboard";

class Master extends Component {
  render() {
    let pvtHome;
    switch (this.props.auth.type) {
      case "CUSTOMER":
        pvtHome = (
          <Switch>
            <PrivateRoute exact path="/chome" component={CHome} />
            <PrivateRoute exact path="/cart" component={Cart} />
          </Switch>
        );
        break;
      case "MANAGER":
        pvtHome = (
          <Switch>
            <PrivateRoute exact path="/chome" component={Manager} />
            <PrivateRoute exact path="/addDeli" component={AddDeli} />
            <PrivateRoute exact path="/addHK" component={AddHK} />
            <PrivateRoute exact path="/morders/:name" component={MOrders} />
            <PrivateRoute exact path="/dash" component={Dashboard} />
          </Switch>
        );
        break;
      case "HK":
        pvtHome = (
          <Switch>
            <PrivateRoute exact path="/chome" component={HK} />
            <PrivateRoute exact path="/addMenu" component={AddMenu} />
            <PrivateRoute exact path="/hkorders" component={HKOrders} />
          </Switch>
        );
        break;
      case "DELIVERY":
        pvtHome = (
          <Switch>
            <PrivateRoute exact path="/chome" component={Delivery} />
          </Switch>
        );
        break;
      default:
    }
    return (
      <React.Fragment>
        <Router>
          <div className="App">
            <NavBar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {pvtHome}
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Master);
