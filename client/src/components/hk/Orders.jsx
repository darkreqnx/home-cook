import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  checkout,
  updateOrders,
  loadOrders
} from "../../actions/cartActions";
import axios from "axios";

class Orders extends Component {
  state = {
    orders: [],
    finished_orders: null,
    flag: true
  };
  async update() {
    try {
      let food_resp = await axios("/api/order/");
      let list_data_filtered = food_resp.data.orders.filter(({ hk_uname }) =>
        hk_uname.toLowerCase().includes(this.props.hkname.toLowerCase())
      );
      this.setState({ orders: list_data_filtered });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }
  async componentDidMount() {
    try {
      let food_resp = await axios("/api/order/");
      let list_data_filtered = food_resp.data.orders.filter(({ hk_uname }) =>
        hk_uname.toLowerCase().includes(this.props.hkname.toLowerCase())
      );
      this.setState({ orders: list_data_filtered });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }
  handleAcceptOrder = args => {
    this.props.updateOrders({ order_status: "accepted", _id: args });
    this.update();
    console.log("Accepted Order");
  };

  handleDeliverOrder = args => {
    this.props.updateOrders({ order_status: "delivery", _id: args });
    console.log("Delivered Order");
    this.update();
  };

  handleCancelOrder = args => {
    this.props.updateOrders({ order_status: "rejected", _id: args });
    console.log("Cancelled Order");
    this.update();
  };

  handleOpen = args => {
    console.log("Open for Business!");
    this.setState({ flag: false });
  };

  handleClose = args => {
    console.log("Closed for Business!");
    this.setState({ flag: true });
  };

  render() {
    var addedItems;
    if (this.state.orders.length > 0) {
      addedItems = this.state.orders.map(item => {
        console.log("PLEASE");
        console.log(item);
        let food_order = item.food_details.map(it => {
          return (
            <React.Fragment>
              <p>Food Item: {it.name}</p>
              <br />
              <p>Count: {it.count}</p>
              <br />
            </React.Fragment>
          );
        });
        return (
          <React.Fragment>
            <div className="collection-item avatar" key={item._id}>
              <div className="item-desc">
                <span className="title">Customer Name: {item.cust_uname}</span>
                <br />
                {/* <span className="title">{item.hk_uname}</span> */}
                <span className="title">Delivery Agent: {item.del_uname}</span>
                <br />
                <span className="title">Total bill amount: {item.total}</span>
                {/* <p>{item.desc}</p> */}

                <div className="row">
                  <div className="col add-remove">
                    <Link to="/hkorders">
                      <button
                        className="btn btn-large"
                        onClick={() => {
                          this.handleAcceptOrder(item._id);
                        }}
                      >
                        Accept
                      </button>
                    </Link>
                  </div>
                  <div className="col add-remove">
                    <Link to="/hkorders">
                      <button
                        className="btn btn-large"
                        onClick={() => {
                          this.handleDeliverOrder(item._id);
                        }}
                      >
                        Deliver
                      </button>
                    </Link>
                  </div>
                  <div className="col add-remove">
                    <Link to="/hkorders">
                      <button
                        className="btn btn-large"
                        onClick={() => {
                          this.handleCancelOrder(item._id);
                        }}
                      >
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <p>
                {food_order}
                <b>Order Status: {item.order_status}</b>
              </p>
            </div>
          </React.Fragment>
        );
      });
    } else {
      if (this.state.flag) {
        addedItems = (
          <React.Fragment>
            <p>Closed For Business</p>
          </React.Fragment>
        );
      } else {
        addedItems = (
          <React.Fragment>
            <p>Empty Cart</p>
          </React.Fragment>
        );
      }
    }

    let avail;
    if (this.state.flag) {
      avail = (
        <button
          className="btn tbn-large"
          onClick={() => {
            this.handleOpen();
          }}
        >
          Open
        </button>
      );
    } else {
      avail = (
        <button
          className="btn tbn-large"
          onClick={() => {
            this.handleClose();
          }}
        >
          Close
        </button>
      );
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="cart">
            State of functioning: {avail}
            <h5>ORDERS</h5>
            <ul className="collection">{addedItems}</ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.cart.orders,
    hkname: state.auth.user.name
    //   data: state.data
    //addedItems: state.addedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    checkout: arg => {
      dispatch(checkout(arg));
    },
    updateOrders: arg => {
      dispatch(updateOrders(arg));
    },
    loadOrders: arg => {
      dispatch(loadOrders(arg));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
