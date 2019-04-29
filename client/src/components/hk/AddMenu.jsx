import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class AddMenu extends Component {
  state = {
    user_list: null,
    hkname: "",
    name: "",
    img: "",
    cost: "",
    count: ""
  };

  async componentDidMount() {
    try {
      // Get user list
      let user_list = [];
      let hk_response = await axios("/api/hk/");
      let hk_data = hk_response.data.hks;
      for (var i = 0; i < hk_data.length; i++) {
        user_list.push(hk_data[i].name);
      }
      this.setState({ user_list: user_list });
      this.setState({ hkname: this.props.user.name });
    } catch (err) {
      console.log(err);
    }
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlerSubmit = async e => {
    e.preventDefault();
    // Update Database from here
    try {
      const newMenu = await axios.post("/api/menu/", {
        hkname: this.state.hkname,
        name: this.refs.name.value,
        cost: Number(this.refs.cost.value),
        count: Number(this.refs.count.value)
      });
      this.setState({
        response: `Menu item ${newMenu.data.newMenu.name} created!`
      });
    } catch (err) {
      this.setState({ response: err.message });
    }
    console.log("Successfully added");
  };

  render() {
    return (
      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="AddUser-Wrapper">
          <h5 className="title">Logged in as {this.state.hkname} </h5>
          <h3>
            {" "}
            <b>Fill out to add menu item</b>{" "}
          </h3>
          <form onSubmit={this.handlerSubmit} style={{ marginTop: "50px" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="For example: Onion and Corn Samosas"
              name="name"
              onChange={this.onChangeHandler}
              ref="name"
              className="Add-User-Input"
              required
              minLength="3"
              maxLength="33"
              id="name"
            />

            <label htmlFor="count">Count: </label>
            <input
              type="number"
              placeholder="0 to 20"
              name="count"
              min="0"
              max="20"
              onChange={this.onChangeHandler}
              ref="count"
              className="Add-User-Input"
              required
              id="count"
            />
            <label htmlFor="cost">Cost: </label>
            <input
              type="number"
              placeholder="10 - 200"
              name="cost"
              min="10"
              max="200"
              onChange={this.onChangeHandler}
              ref="cost"
              className="Add-User-Input"
              required
              id="cost"
            />
            <div className="container-btn" style={{ marginTop: "50px" }}>
              <button
                type="submit"
                className="btn btn-large"
                style={{ width: "150px" }}
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-large"
                style={{ width: "150px", marginLeft: "20px" }}
              >
                Reset
              </button>
            </div>
          </form>
          <p>{this.state.response}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AddMenu);
