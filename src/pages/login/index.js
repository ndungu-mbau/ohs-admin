import React, { useState } from "react"
import { Link } from "react-router-dom"
import { API } from "../../utils/requests"
import axios from "axios"

const Login = props => {
  const [ phone, setPhone ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ type, setType ] = useState("password")
  const [ loading, setLoading ] = useState(false)

  const onClickHandler = async e => {
    setLoading(true)
    const { data : { ok, token, message, user }} = await axios.post(`${API}/auth/login`, {
      phone,
      password
    })

    if(ok){
      if(user.type !== "TECHNICIAN"){
        window.localStorage.setItem('authorization', token)
        window.localStorage.setItem("user", JSON.stringify(user))
        setLoading(false)
        return props.history.push({ pathname: '/' })
      } else {
        window.Swal.fire({
          icon:'error',
          title:'Login Failed',
          text: `User ${user.name} is of type ${user.type.toLowerCase()} and is not allowed access!`,
          background:"#eefbfb"
        })
        setLoading(false)
      }
    } else {
      window.Swal.fire({
        icon:'error',
        title:'Login Failed',
        text: message,
        background:"#eefbfb"
      })
      setLoading(false)
    }
  }

  return (
    <div className="main-content">
    <div className="header bg-gradient-primary py-4 py-lg-5">
      <div className="container">
        <div className="header-body text-center mb-7">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-white">Welcome!</h1>
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
                <h3>Sign In</h3>
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
                  <button type="button" className={`btn btn-primary my-4 ${loading ? "btn-icon" : ""}`} onClick={onClickHandler}>
                    {loading ? <span class="btn-inner--icon"><i class="fas fa-spinner spinner-anim"></i></span> : "Sign in"}
                  </button>
                </div>
                <div className="text-center mb-3">
                  <Link to="/forgot">First time login</Link>
                </div>
                <div className="text-center">
                  <Link to="/forgot">Forgot password?</Link>
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

export default Login