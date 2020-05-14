import React from "react"
import loader from "../utils/loader.svg"

const Loader = props => (
<div style={{ width: "150px", height: "150px" }} className="container pb-8 pt-5 pt-md-8">
  <img alt="" src={loader} />
</div>)

export default Loader