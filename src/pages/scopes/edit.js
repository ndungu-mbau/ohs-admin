import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    edit:{
      id:"",
      name:"",
      department:"",
      hazard: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.edit)
      if (props.edit.id !== state.edit.id) {
        return {
          edit: {...props.edit, department: props.edit.department?.id }
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
    const { id, name, department, hazard } = this.state.edit
    await this.props.save({
      id,
      name,
      department,
      hazard
    })

    this.hide()
    this.setState(Object.assign(this.state.edit, {
      name:"",
      department:"",
      hazard: ""
    }))
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Edit Scope</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <input type="text" required className="form-control form-control-alternative" placeholder="Name" value={this.state.edit.name} onChange={e => this.setState(Object.assign(this.state.edit, { name: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <select
                        name="department"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.edit.department}
                        onChange={(e) => this.setState(Object.assign(this.state.edit, {
                          department: e.target.value
                        }))}
                      >
                        <option value="">Select Department</option>
                        {this.props.departments.map(department => (
                          <option key={department.id} value={department.id}>{department.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <select
                        name="hazard"
                        className="form-control form-control-alternative"
                        required
                        value={this.state.edit.hazard}
                        onChange={(e) => this.setState(Object.assign(this.state.edit, {
                          hazard: e.target.value
                        }))}
                      >
                        <option value="">Select Risk Level</option>
                        {["LOW", "MEDIUM", "HIGH"].map(level => (
                          <option key={level} value={level}>{level}</option>
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