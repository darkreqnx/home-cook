import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  checkout,
  updateOrders
} from "../../actions/cartActions";
import axios from "axios";
import Gmap from "./Gmap";

class DOrders extends Component {
  state = {
    orders: [],
    finished_orders: null,
    flag: true
  };
  async update() {
    try {
      let food_resp = await axios("/api/order/");
      let list_data_filtered = food_resp.data.orders;
      this.setState({ orders: list_data_filtered });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }
  async componentDidMount() {
    try {
      let food_resp = await axios("/api/order/");
      // let list_data_filtered = food_resp.data.orders.filter(() =>
      //   console.log("Fin")
      // );
      let list_data_filtered = food_resp.data.orders;
      console.log(list_data_filtered);
      this.setState({ orders: list_data_filtered });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handlePickOrder = args => {
    this.props.updateOrders({
      order_status: "on delivery",
      _id: args,
      del_uname: this.props.user
    });
    this.update();
    console.log("Accepted Order");
  };

  handleDropOrder = args => {
    this.props.updateOrders({ order_status: "completed", _id: args });
    this.update();
    console.log("Delivered Order");
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
    if (this.state.orders.length > 0 && !this.state.flag) {
      addedItems = this.state.orders.map(item => {
        return (
          <React.Fragment>
            <div className="collection-item avatar" key={item._id}>
              <div className="item-desc">
                <span className="title">{item.cust_uname}</span>
                <span className="title">{item.hk_uname}</span>
                <span className="title">{item.del_uname}</span>
                <span className="title">{item.total}</span>
                {/* <p>{item.desc}</p> */}
                <p>
                  <b>Quantity: {item.count}</b>
                  <b>Order Status: {item.order_status}</b>
                </p>
                <div className="add-remove">
                  <button
                    onClick={() => {
                      this.handlePickOrder(item._id);
                    }}
                  >
                    Pick
                  </button>
                </div>
                <div className="add-remove">
                  <button
                    onClick={() => {
                      this.handleDropOrder(item._id);
                    }}
                  >
                    Drop
                  </button>
                </div>
              </div>
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
          className="btn btn-large"
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
          className="btn btn-large"
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
          <h3 style={{ paddingTop: "100px" }}>
            Logged in as <b>{this.props.user}</b>
          </h3>
          <div className="container">
            <Gmap />
          </div>
          <div className="cart">
            <h5>ORDERS</h5>
            {avail}
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
    user: state.auth.user.name
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DOrders);
