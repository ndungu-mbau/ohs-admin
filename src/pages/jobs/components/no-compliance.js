import React from "react"

const NoCompliance = props => {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center align-content-center">
        <div className="text-lighter" style={{ fontSize: "9rem" }}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
      </div>
      <div className="mt-10 col-12 d-flex align-content-center justify-content-center">
        <h3 className="text-light">Compliance Document hasn't been submitted for this job yet</h3>
      </div>
    </div>
  )
}

export default NoCompliance