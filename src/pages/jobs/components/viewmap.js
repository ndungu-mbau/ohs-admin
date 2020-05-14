import React, { Component } from 'react'

const GOOGLE_MAP_API_KEY = 'AIzaSyAh3Dzo3-VFymDTgvQI28NVqfa0qOx05cc'
export default class GoogleMap extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
    window.document.body.appendChild(googleScript)

    googleScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
      this.createMarker(this.props.loc)
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: this.props.loc,
      disableDefaultUI: true
    })

  createMarker = ({ lat, lng }) => {
    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap,
    })

    this.setState({
      marker
    })
    // this.googleMap.panTo({ lat, lng })
  }

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }
}
