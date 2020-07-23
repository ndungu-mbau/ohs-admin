import React from "react"
import { Link } from "react-router-dom"

export default ({ location : { pathname = "/" } = {} }) => {
  
  const { canView } = {
    get canView(){
      const { type : { permissions } } = JSON.parse(sessionStorage.getItem("user"))
      return permissions.includes("OHS")
    }
  }

  const { type : { permissions } } = JSON.parse(sessionStorage.getItem("user"))

  return (
    <nav className="navbar navbar-vertical fixed-left navbar-expand-lg navbar-light bg-white" id="sidenav-main">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand pt-0" to="/">
        <img src="./assets/img/brand/app-adrian-loader.gif" className="navbar-brand-img"alt="..."/>
      </Link>
      <div className="collapse navbar-collapse" id="sidenav-collapse-main">
        <div className="navbar-collapse-header d-md-none">
          <div className="row">
            <div className="col-6 collapse-brand">
              <Link to="/">
                <img src="./assets/img/brand/app-adrian-loader.gif" className="navbar-brand-img"alt="..."/>
              </Link>
            </div>
            <div className="col-6 collapse-close">
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <form className="mt-4 mb-3 d-md-none">
          <div className="input-group input-group-rounded input-group-merge">
            <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search"/>
            <div className="input-group-prepend">
              <div className="input-group-text">
                <span className="fa fa-search"></span>
              </div>
            </div>
          </div>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link ${pathname === "/" && "active"}`} to="/">
              <i className="ni ni-tv-2 text-primary"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${pathname.startsWith("/jobs") && "active"}`} to="/jobs">
              <i className="ni ni-delivery-fast text-primary"></i> Jobs
            </Link>
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/users") && "active"}`} to="/users">
              <i className="ni ni-single-02 text-yellow"></i> Users
            </Link>}
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/roles") && "active"}`} to="/roles">
              <i className="ni ni-ui-04 text-purple"></i> Roles
            </Link>}
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/divisions") && "active"}`}to="/divisions">
              <i className="ni ni-collection text-green"></i> Divisions
            </Link>}
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/departments") && "active"}`}to="/departments">
              <i className="ni ni-building text-danger"></i> Departments
            </Link>}
          </li>
          <li className="nav-item">
            {(canView || permissions.includes("AUTHOR")) && <Link className={`nav-link ${pathname.startsWith("/scopes") && "active"}`} to="/scopes">
              <i className="ni ni-tag text-info"></i> Scopes
            </Link>}
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/hazards") && "active"}`} to="/hazards">
              <i className="fas fa-radiation-alt text-orange"></i> Hazards
            </Link>}
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/incidences") && "active"}`} to="/incidences">
              <i className="fas fa-dumpster-fire text-danger"></i> Job Closure Incidences
            </Link>}
          </li>
          <li className="nav-item">
            {canView && <Link className={`nav-link ${pathname.startsWith("/documents") && "active"}`} to="/documents">
              <i className="far fa-file-word text-purple"></i> Documents
            </Link>}
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}