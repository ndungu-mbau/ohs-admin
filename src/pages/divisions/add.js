import React, { Component } from 'react'
import AddHODModal from './add_hod'
import AddOHSModal from "./add_ohs"

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;
const addHodInstance = new AddHODModal()
const addOhsInstance = new AddOHSModal()

export default class Modal extends Component{
  state = {
    name:"",
    description:"",
    hod:"",
    ohs:""
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

  save = async e => {
    e.preventDefault()
    await this.props.save(this.state)
    this.hide()
    this.setState({
      name:"",
      description:"",
      hod:""
    })
  }

  saveHod = async data => {
    const { data: { users: { create: { id: hod }}}} = await this.props.saveAddHod(data)
    this.setState({ hod })
  }

  saveOhs = async data => {
    const { data: { users: { create: { id: ohs }}}} = await this.props.saveAddHod(data)
    this.setState({ ohs })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <AddHODModal save={this.saveHod} roles={this.props.roles} />
        <AddOHSModal save={this.saveOhs} roles={this.props.roles} />
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Create Division</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <input required type="text" className="form-control form-control-alternative" placeholder="Description" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-9 col-lg-9">
                    <div className="form-group">
                      <select
                        name="hod"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.ohs}
                        onChange={(e) => this.setState({
                          ohs: e.target.value
                        })}
                      >
                        <option value="">Select OHS Personnel</option>
                        {this.props.users.filter(user => user.type.permissions.includes("OHS")).map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <button type="button" className="btn btn-secondary" onClick={addOhsInstance.show}>
                      <i className="ni ni-fat-add"></i>
                    </button>
                  </div>
                  <div className="col-md-9 col-lg-9">
                    <div className="form-group">
                      <select
                        name="hod"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.hod}
                        onChange={(e) => this.setState({
                          hod: e.target.value
                        })}
                      >
                        <option value="">Select Head of Division</option>
                        {this.props.users.filter(user => user.type.permissions.includes("HOD")).map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <button type="button" className="btn btn-secondary" onClick={addHodInstance.show}>
                      <i className="ni ni-fat-add"></i>
                    </button>
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