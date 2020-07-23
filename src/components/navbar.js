import React from "react"
import { Link, useHistory } from "react-router-dom"

const Navbar = props => {
  const history = useHistory()
  const { name } = JSON.parse(sessionStorage.getItem("user"))

  const onClick = e => {
    e.preventDefault()
    window.sessionStorage.removeItem("authorization")
    window.sessionStorage.removeItem("user")
    history.replace("/login")
  }

  return (
    <nav className="navbar navbar-top navbar-expand-md navbar-dark bg-primary" id="navbar-main">
      <div className="container-fluid">
        <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">Dashboard</Link>
        <ul className="navbar-nav align-items-center d-none d-md-flex">
          <li className="nav-item dropdown">
            <a className="nav-link pr-0" href="/#/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div className="media align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="" src="./assets/img/theme/default.png" />
                </span>
                <div className="media-body ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm  font-weight-bold">{name}</span>
                </div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
              <div className=" dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </div>
              <a href="/" onClick={onClick} className="dropdown-item">
                <i className="ni ni-user-run"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar