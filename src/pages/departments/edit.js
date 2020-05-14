import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    edit:{
      id: "",
      name:"",
      division:"",
      manager:"",
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.edit)
      if (props.edit.id !== state.edit.id) {
        return {
          edit: {...props.edit, division: props.edit.division?.id, manager: props.edit.manager?.id }
        }
      }
    return null
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
    const { edit: { id, name, division, manager }} = this.state
    await this.props.save({ id, name, division, manager })
    this.hide()
    this.setState({
      edit:{
        id:"",
        name:"",
        division:"",
        manager:"",
      },
    })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Edit Department</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input type="text" className="form-control form-control-alternative" placeholder="Name" value={this.state.edit.name} onChange={e => this.setState(Object.assign(this.state.edit,{ name: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="hod"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.edit.division}
                        onChange={(e) => this.setState(Object.assign(this.state.edit,{
                          division: e.target.value
                        }))}
                      >
                        <option value="">Select Department</option>
                        {this.props.divisions.map(division => (
                          <option key={division.id} value={division.id}>{division.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="hod"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.edit.manager}
                        onChange={(e) => this.setState(Object.assign(this.state.edit,{
                          manager: e.target.value
                        }))}
                      >
                        <option value="">Select Manager</option>
                        {this.props.users.filter(user => user.type.permissions.includes("PROJECT_MANAGER")).map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
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