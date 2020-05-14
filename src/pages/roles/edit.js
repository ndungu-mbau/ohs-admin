import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    edit:{
      id:"",
      name: "",
      permissions: []
    },
  }

  static getDerivedStateFromProps(props, state) {
    if (props.edit)
      if (props.edit.id !== state.edit.id) {
        return {
          edit: { ...props.edit, permissions: [] }
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
    const { edit: { id, name, permissions }} = this.state
    await this.props.save({ id, name, permissions})

    this.hide()
    this.setState({
      edit: {
        name: "",
        permissions: []
      }
    })
  }

  onSelect = permission => {
    this.setState((prevState, props) => {
      const { permissions } = prevState
      const filteredSelected = permissions.includes(permission) ? permissions.filter(p => p !== permission) : [...permissions, permission]
      return Object.assign(prevState.edit, { permissions: filteredSelected })
    })
  }

  render(){
    const { permissions } = this.state.edit
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Edit Role</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <input type="text" required className="form-control form-control-alternative" placeholder="Name" value={this.state.edit.name} onChange={e => this.setState(Object.assign(this.state.edit, { name: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <ul class="list-group list-group-flush">
                      {["OHS", "HOD", "TECHNICIAN", "AUTHOR", "PROJECT_MANAGER"].map(permission => {
                        return <li
                          className="list-group-item"
                          style={{ cursor: 'pointer' }}>
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id={permission.toLowerCase()} onChange={() => this.onSelect(permission)} checked={permissions.includes(permission)} />
                            <label class="custom-control-label" for={permission.toLowerCase()}>{permission}</label>
                          </div>
                        </li>
                      })}
                    </ul>
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