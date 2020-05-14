import React, { useState } from "react"
import { API } from "../../utils/requests"
import axios from "axios"

const Reset = props => {
  const [ code, setCode ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ type, setType ] = useState("password")

  const onClickHandler = async e => {
    const { data : { ok, message, token }} = await axios.post(`${API}/auth/verify`, {
      code,
      password
    })

    if(ok){
      window.localStorage.setItem("authorization", token)
      return props.history.push({ pathname: '/' })
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
                <h3>Reset Password</h3>
              </div>
            </div>
            <div className="card-body px-lg-5 py-lg-5">
              <form>
                <div className="form-group mb-3">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-key-25"></i></span>
                    </div>
                    <input className="form-control" placeholder="Code" type="text" value={code} onChange={e => setCode(e.target.value)}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input className="form-control" placeholder="Password" type={type} value={password} onChange={e => setPassword(e.target.value)}/>
                      <div class="input-group-append">
                        <span class="input-group-text" style={{ cursor: "pointer" }} onClick={() => type === "password" ? setType("text") : setType("password")}>
                          <i class={`far fa-eye${type === "text" ? "-slash" : ""}`}></i>
                        </span>
                      </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary my-4" onClick={onClickHandler}>Verify Code</button>
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