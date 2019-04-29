import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Gmap extends Component {
  static defaultProps = {
    center: { lat: 17.554511, lng: 78.565896 },
    zoom: 14
  };

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: { lat: 17.554511, lng: 78.565896 },
      map,
      title: "Destination"
    });
    let marker1 = new maps.Marker({
      position: { lat: 17.56833, lng: 78.555436 },
      map,
      title: "Restaurant"
    });
  }

  render() {
    return (
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyArwMN6E026Gi0pKkdYd9-jzP2skAuLq0U" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
          {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
          {/* <AnyReactComponent text="Drop" /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Gmap;
