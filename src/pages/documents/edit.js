import React, { Component } from 'react'
import { API } from "../../utils/requests"

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    edit: {
      id: "",
      name:"",
      url: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.edit)
      if (props.edit.id !== state.edit.id) {
        return {
          edit: props.edit
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
    const { id, name, url } = this.state.edit
    await this.props.save({ id, name, url })

    this.hide()
    this.setState({
      id: "",
      name:"",
      url: "",
    })
  }

  onFileChange = e => {
    e.preventDefault()
    e.persist()

    let reader = new FileReader();
    let file = e.target.files[0];
    const data = new FormData()
    data.append("file", file)

    reader.onloadend = () => {
      fetch(`${API}/upload`, {
        method: "post",
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': window.localStorage.getItem("authorization")
        }),
        body: data,
      }).then(res => {
        if (res.status !== 200) return { url: '' }
        return res.json()
      }).then(({ url }) => {
        this.setState(Object.assign(this.state.edit, {
          url
        }))
      })
    }

    reader.readAsDataURL(file)
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Edit Document</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" required className="form-control form-control-alternative" placeholder="Name" value={this.state.edit.name} onChange={e => this.setState(Object.assign(this.state.edit,{ name: e.target.value }))} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input type="file" required className="form-control form-control-alternative" placeholder="Document" onChange={this.onFileChange} />
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