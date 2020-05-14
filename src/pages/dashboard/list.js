import React from "react"
import { useQuery } from '@apollo/react-hooks'
import { DATA_QUERY } from "./queries"

import Loader from "../../components/loader"

const Dash = props => {
  const user = JSON.parse(window.localStorage.getItem("user"))
  const { data, loading, error } = useQuery(DATA_QUERY, {
    fetchPolicy: "network-only"
  })

  if(loading) return <Loader />
  if(error){
    window.Swal.fire({
      title: "OOPS!",
      icon: "error",
      text: error.message
    })
  }

  return (
    <>
    <div className="container-fluid pb-4 pt-8 pt-md-12">
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Your Profile</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-4 col-lg-3">
                <img src="../assets/img/theme/default.png" alt="" className="rounded-circle" style={{ width: "200px"}} />
              </div>
              <div className="col-8 col-lg-9" style={{ borderLeft: "1px solid var(--lighter)"}}>
                <h2 className="text-uppercase text-primary"> Name: {user.name}</h2>
                <hr/>
                <h3>Contact: {user.phone}</h3>
                <h3>Department: {user.department.name}</h3>
                <h3>Role: {user.type.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid pb-4">
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Job Stats</h2>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Total No. Of Jobs</h5>
                        <span className="h2 font-weight-bold mb-0">{data.jobs.length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Complete Jobs</h5>
                        <span className="h2 font-weight-bold mb-0">{data.jobs.filter(job => job.status.type === "COMPLETE").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="ni ni-check-bold"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Running Jobs</h5>
                        <span className="h2 font-weight-bold mb-0">{data.jobs.filter(job => job.status.type === "IN_PROGRESS").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-user-run"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Accepted Jobs</h5>
                        <span className="h2 font-weight-bold mb-0">{data.jobs.filter(job => job.status.type === "ACCEPTED").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-like-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-3">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">Rejected Jobs</h5>
                        <span className="h2 font-weight-bold mb-0">{data.jobs.filter(job => job.status.type === "REJECTED").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-fat-remove"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-3">
                <div className="card card-stats mb-4 mb-xl-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">New Jobs</h5>
                        <span className="h2 font-weight-bold mb-0">{data.jobs.filter(job => job.status.type === "NEW").length}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-tag"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dash