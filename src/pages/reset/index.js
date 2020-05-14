import React, { useState } from "react"
import { API } from "../../utils/requests"
import axios from "axios"

const Reset = props => {
  const [ phone, setPhone ] = useState("")

  const onClickHandler = async e => {
    const { data : { ok, message }} = await axios.post(`${API}/auth/reset`, {
      phone
    })

    if(ok){
      return props.history.push({ pathname: '/verify' })
    } else {
      window.Swal.fire({
        icon:'error',
        title:'Login Failed',
        text: message,
        background:"#eefbfb"
      })
    }
  }

  return (
    <div className="main-content">
    <div className="header bg-gradient-primary py-4 py-lg-5">
      <div className="container">
        <div className="header-body text-center mb-7">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-white">Hi there!</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <div className="container mt--8 pb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card bg-secondary shadow border-0">
            <div className="card-header bg-transparent pb-5">
              <div className="text-center text-muted mb-4">
                <h3>Request Code</h3>
              </div>
            </div>
            <div className="card-body px-lg-5 py-lg-5">
              <form>
                <div className="form-group mb-3">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-mobile-button"></i></span>
                    </div>
                    <input className="form-control" placeholder="Phone" type="text" value={phone} onChange={e => setPhone(e.target.value)}/>
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary my-4" onClick={onClickHandler}>Request Code</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Reset