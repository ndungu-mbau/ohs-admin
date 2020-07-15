import React, { Component } from 'react'
import AddModal from "./add_pm"
import AddOHSModal from "./add_ohs"

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;
const addModalInstance = new AddModal()
const addOhsModalInstance = new AddOHSModal()

export default class Modal extends Component{
  state = {
    name:"",
    manager:"",
    division:"",
    ohs:"",
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
    const { name, division, manager, ohs } = this.state
    await this.props.save({ name, division, manager, ohs })

    this.hide()
    this.setState({ name: "", division: "", manager: "", ohs: "" })
  }

  savePm = async data => {
    const { data: { users: { create: { id: manager }}}} = await this.props.saveAddManager(data)
    this.setState({ manager })
  }

  saveOhs = async data => {
    const { data: { users: { create: { id: ohs }}}} = await this.props.saveAddManager(data)
    this.setState({ ohs })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <AddModal roles={this.props.roles} save={this.savePm} />
        <AddOHSModal roles={this.props.roles} save={this.saveOhs} />
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Create Department</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <input type="text" required className="form-control form-control-alternative" placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="division"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.division}
                        onChange={(e) => this.setState({
                          division: e.target.value
                        })}
                      >
                        <option value="">Select Division</option>
                        {this.props.divisions.map(division => (
                          <option key={division.id} value={division.id}>{division.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-9 col-lg-9">
                    <div className="form-group">
                      <select
                        name="division"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.manager}
                        onChange={(e) => this.setState({
                          manager: e.target.value
                        })}
                      >
                        <option value="">Select Project Manager/Team Lead</option>
                        {this.props.users.filter(user => user.type.permissions.includes("PROJECT_MANAGER")).map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <button type="button" className="btn btn-secondary" onClick={addModalInstance.show}>
                      <i className="ni ni-fat-add"></i>
                    </button>
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
                    <button type="button" className="btn btn-secondary" onClick={addOhsModalInstance.show}>
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