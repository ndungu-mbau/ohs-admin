import React, { Component } from 'react'

const GOOGLE_MAP_API_KEY = 'AIzaSyAIhUvgVM-0b8gcuM2pzuWXB8ZzPNh8X-8'
export default class GoogleMap extends Component {
  googleMapRef = React.createRef()
  state = {
    markers: [],
    places: []
  }

  componentDidMount() {
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
    window.document.body.appendChild(googleScript)

    googleScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
      this.googleMap.addListener('click', e => {
        this.placeMarkerAndPanTo(e.latLng, this.googleMap)
      })
      this.autocompleteService = new window.google.maps.places.AutocompleteService()
      this.placesService = new window.google.maps.places.PlacesService(this.googleMap)
    })
  }
  
  placeMarkerAndPanTo = (latLng, map) => {
    this.props.setLocation({ lat: latLng.lat(), lng: latLng.lng() })
    const marker = new window.google.maps.Marker({
      position: latLng,
      map: map
    })

    this.setState({ marker })
    map.panTo(latLng)
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: { lat: -1.2921, lng: 36.8219 },
      disableDefaultUI: true,
    })

  onPlaceInputChange = e => {
    this.autocompleteService.getPlacePredictions({ input: e.target.value }, (targets) => {
      console.log(targets)
      this.setState({ places: targets })
    })
  }

  onSuggestionClick = place => {
    this.placesService.getDetails({
      fields: ["geometry.location", "name"],
      placeId: place.place_id
    }, (res) => {
      this.placeMarkerAndPanTo(res.geometry.location, this.googleMap)
      this.props.setName(res.name)
      this.setState({ places: [] })
    })
  }

  render() {
    return (
      <div className="card border-0">
        <div className="card-header border-0">
          <input type="text" id="searchInput" placeholder="Enter a location" className="form-control form-control-alternative" onChange={this.onPlaceInputChange} />
          <div className="col-12">
            <ul style={{ listStyle: "none" }}>
              {this.state.places.map(place => {
                return (
                  <>
                    <li key={place.id} className="m-1 row" onClick={() => this.onSuggestionClick(place)} style={{ cursor: "pointer" }}>
                      <div className="col-8">{place.description}</div>
                      <div className="col-3">
                        <i className="ni ni-bold-right"></i>
                      </div>
                    </li>
                    <hr className="m-0 p-0"/>
                  </>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="card-body">
          <div
            id="google-map"
            ref={this.googleMapRef}
            style={{ width: '100%', height: '300px', borderRadius: "8px", border: "1px solid #e9ecef" }}
          />
        </div>
      </div>
    )
  }
}
