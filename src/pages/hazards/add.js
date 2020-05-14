import React, { Component } from 'react'

const modalNumber = Math.random().toString().split(".")[1];
const $ = window.$;

export default class Modal extends Component{
  state = {
    text:"",
    consequence:"",
    controls: [],
    controls_input: "",
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
    const { text, consequence, controls } = this.state
    await this.props.save({
      text,
      consequence,
      controls: controls.map(({ id }) => id).join(",")
    })

    this.hide()
    this.setState({
      text:"",
      consequence: "",
      controls: [],
      controls_input: ""
    })
  }

  removeCtrl = ctrl => {
    const controls = this.state.controls.filter(control => control.id !== ctrl.id)
    this.setState({ controls })
  }

  render(){
    return (
      <div className="modal fade" id={modalNumber} tabIndex="-1" role="dialog"aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form id={`#${modalNumber}form`} onSubmit={this.save}>
            <div className="modal-content bg-secondary">
              <div className="modal-header">
                <h4 className="modal-title">Create Hazard</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <input type="text" required className="form-control form-control-alternative" placeholder="Name" value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                      <input type="text" required className="form-control form-control-alternative" placeholder="Consequence" value={this.state.consequence} onChange={e => this.setState({ consequence: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                      <ul className="list-group">
                        {this.state.controls.map(control => (
                          <div className="d-flex flex-row" key={control.id}>
                            <li className="list-group-item mr-auto">{control.text}</li>
                            <button className="btn btn-secondary" onClick={() => this.removeCtrl(control)}>-</button>
                          </div>
                        ))}
                      </ul>
                      <div className="row">
                        <div className="col-8">
                          <input type="text" className="form-control form-control-alternative" placeholder="Add control" value={this.state.controls_input} onChange={e => this.setState({ controls_input: e.target.value })} />
                        </div>
                        <div className="col-4">
                          <button type="button" className="btn btn-secondary" onClick={async () => {
                            const { controls_input: text } = this.state
                            const { data: { controls: { create: { id }}}} = await this.props.saveAddControl({ text })
                            this.setState(prevState => ({
                              ...prevState,
                              controls: [...prevState.controls, { id, text }],
                              controls_input:""
                            }))
                          }}>
                            <i className="ni ni-fat-add"></i>
                          </button>
                        </div>
                      </div>
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