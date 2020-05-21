import React, { Component } from 'react'
import Map from "./components/map"

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  static defaultProps = {
    center: {
      lng: 0.0, 
      lat: 0.0
    },
    zoom: 12
  }

  state = {
    technician:"",
    name:"",
    scope:"",
    location: {
      lat: 25.3,
      lng: 0.25
    },
    location_name: "Unknown"
  }

  show() {
    $("#" + modalNumber).modal({
      show: true,
      backdrop: "static",
      keyboard: false
    });
  }
  hide() {
    $("#" + modalNumber).modal("hide");
  }

  onClick = () => {

  }

  save = async e => {
    e.preventDefault()
    await this.props.save(this.state)
    this.hide()
    this.setState({
      technician:"",
      name:"",
      scope:"",
      location: {
        lat: 25.3,
        lng: 0.25
      },
      location_name: "Unknown"
    })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Create Job Card</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input type="text" className="form-control form-control-alternative" placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="division"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.scope}
                        onChange={(e) => this.setState({
                          scope: e.target.value
                        })}
                      >
                        <option value="">Select Scope</option>
                        {this.props.scopes.map(scope => (
                          <option key={scope.id} value={scope.id}>{scope.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="division"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.technician}
                        onChange={(e) => this.setState({
                          technician: e.target.value
                        })}
                      >
                        <option value="">Select Technician</option>
                        {this.props.users.filter(user => user.type.permissions.includes("TECHNICIAN")).map(technician => (
                          <option key={technician.id} value={technician.id}>{technician.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group" style={{ minHeight : "200px" }}>
                      <label>Select Location:</label>
                      <Map setLocation={location => this.setState({ location })} setName={location_name => this.setState({ location_name })} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.hide}>Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}