/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { JOB_QUERY, JOBS_QUERY, DELETE_JOB, CREATE_APPROVAL, UPDATE_STATUS } from "./queries"
import { useLv1Approval, useLv3Approval, useLv2Approval, useLv4Approval }from "./utils/hooks"

import Table from "../../components/datatable"
import Loader from "../../components/loader"
import Map from "./components/viewmap"

import DeleteModal from "../../components/delete"
import CancelModal from "../../components/cancel"
import NoCompliance from "./components/no-compliance";
const deleteModalInstance = new DeleteModal()
const cancelModalInstance = new CancelModal()

const View = props => {
  const { id } = useParams()
  const history = useHistory()
  console.log({ id })
  let { loading, data, error: queryError } = useQuery(JOB_QUERY, {
    variables:{
      job:{
        id
      }
    },
    fetchPolicy: 'no-cache'
  })
  const [remove, setRemove] = useState({})
  const [cancel, setCancelProp] = useState({})

  const [removeJob, { error: mutationError }] = useMutation(DELETE_JOB, {
    refetchQueries: [{ query: JOBS_QUERY }]
  })

  const [approve] = useMutation(CREATE_APPROVAL)
  const [cancelJob] = useMutation(UPDATE_STATUS, {
    refetchQueries: [{ query: JOB_QUERY}]
  })

  const createApproval = async ({ status, level, reason }) => {
    console.log({
      job: data.job.id,
      level,
      reason,
      status,
    })
    
    await approve({
      variables: {
        approval: {
          job: data.job.id,
          level,
          status,
          reason
        }
      }
    })
    history.push('/jobs')
  }

  const saveRemove = async ({ id }) => {
    await removeJob({ variables: { job: { id }}})
    deleteModalInstance.hide()
    history.push("/jobs")
  }

  const saveCancel = async status => {
    console.log({ status: status.id })
    await cancelJob({
      variables: {
        status: {
          id: status.id,
          type: "CANCELLED"
        }
      }
    })
    history.push('/jobs')
  }

  const createApprovalDialog = async ({ level, status }) => {
    const { value: reason } = await window.Swal.fire({
      input:'textarea',
      icon: 'question',
      title: 'Approval reason/comments',
      text: 'Write down your comments on this approval, or reason to reject it.',
      showCancelButton: true
    })
    console.log(reason)
    await createApproval({ level, status, reason })
  }

  const error = queryError || mutationError

  if(loading) return <Loader />
  if(error){
    window.Swal.fire({
      title: "OOPS!",
      icon: "error",
      text: error.message
    })
  }

  const [canApprove1, level1] = useLv1Approval(data.job)
  const [canApprove2, level2] = useLv2Approval(data.job)
  const [canApprove3, level3] = useLv3Approval(data.job)
  const [canApprove4, level4] = useLv4Approval(data.job)
  console.log({ canApprove1, level1, canApprove2, level2, canApprove3, level3, canApprove4, level4 })

  return (
    <div className="container-fluid pb-8 pt-8 pt-md-12">
      <DeleteModal remove={remove} save={saveRemove} />
      <CancelModal remove={cancel} save={saveCancel} />
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Job Details</h2>
              <div className="ml-auto">
                {data.job.status.type !== "COMPLETE" ? <button className="btn btn-icon btn-danger btn-lg" type="button" onClick={() => { setCancelProp(data.job.status); cancelModalInstance.show()}}>
                    <span className="btn-inner--icon"><i className="fas fa-ban"></i></span>
                    <span className="btn-inner--text">Cancel</span>
                  </button>: null}
                <button className="btn btn-outline-secondary" disabled onClick={() => {setRemove(data.job); deleteModalInstance.show()}}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h2 className="text-uppercase text-primary"> Name: {data.job.name}</h2>
                <hr/>
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="row mb-2">
                      <div className="col">
                        <div className="card shadow card-stats mb-4 mb-lg-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12 d-flex justify-content-center align-content-center">
                                <div className={`icon icon-shape bg-gradient-${data.job.status.type === "REJECTED" ? "danger" : "success"} text-white rounded-circle shadow`}>
                                  <i className="ni ni-check-bold"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Status</h5>
                                <span className="h2 font-weight-bold">{data.job.status.type}</span><br/>
                                <hr className="mb-0"></hr>
                                <span className="h4 font-weight-bold mb-0 mt-0">Reason: {data.job.status.reason || "None"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <div className="card shadow card-stats mb-4 mb-lg-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12 d-flex justify-content-center align-content-center">
                                <div className="icon icon-shape bg-gradient-danger text-white rounded-circle shadow">
                                  <i className="fas fa-radiation-alt"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Hazard Level</h5>
                                <span className="h2 font-weight-bold">{data.job.scope.hazard}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <div className="card shadow card-stats mb-4 mb-lg-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12 d-flex justify-content-center align-content-center">
                                <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow">
                                  <i className="ni ni-single-02"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Division HOD</h5>
                                <span className="h2 font-weight-bold">{data.job.scope.department.division.hod.name}</span><br/>
                                <hr className="mb-0"></hr>
                                <span className="h4 font-weight-bold mb-0 mt-0">Contact: {data.job.scope.department.division.hod.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 map">
                    <p>{data.job.location_name}</p>
                    <div className="card shadow" style={{ height: "100%"}}>
                      <Map loc={data.job.location} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 col-sm-12 mb-3">
                <div className="card shadow card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-12">
                        <img src="../assets/img/theme/default.png" alt="" className="rounded-circle" style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="col-lg-9">
                        <h5 className="card-title text-uppercase text-muted mb-0">Author</h5>
                        <span className="h2 font-weight-bold">{data.job.author.name}</span><br/>
                        <hr className="mb-0"></hr>
                        <span className="h4 font-weight-bold mb-0 mt-0">Contact: {data.job.author.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 mb-3">
                <div className="card shadow card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-12">
                        <img src="../assets/img/theme/default.png" alt="" className="rounded-circle" style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="col-lg-9">
                        <h5 className="card-title text-uppercase text-muted mb-0">Technician</h5>
                        <span className="h2 font-weight-bold">{data.job.technician.name}</span><br/>
                        <hr className="mb-0"></hr>
                        <span className="h4 font-weight-bold mb-0 mt-0">Contact: {data.job.technician.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 mb-3">
                <div className="card shadow card-stats">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-12">
                        <img src="../assets/img/theme/default.png" alt="" className="rounded-circle" style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="col-lg-9">
                        <h5 className="card-title text-uppercase text-muted mb-0">Project Manager</h5>
                        <span className="h2 font-weight-bold">{data.job.scope.department.manager.name}</span><br/>
                        <hr className="mb-0"></hr>
                        <span className="h4 font-weight-bold mb-0 mt-0">Contact: {data.job.scope.department.manager.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="card shadow border-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h4>Scope Details</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-12 mb-3">
                        <div className="card card-stats border-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow">
                                  <i className="ni ni-tag"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Name</h5>
                                <span className="h2 font-weight-bold">{data.job.scope.name}</span><br/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12 mb-3">
                        <div className="card card-stats border-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                  <i className="ni ni-ungroup"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Department</h5>
                                <span className="h2 font-weight-bold">{data.job.scope.department.name}</span><br/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12 mb-3">
                        <div className="card card-stats border-0">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className="icon icon-shape bg-gradient-danger text-white rounded-circle shadow">
                                  <i className="fas fa-radiation-alt"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Hazard Level</h5>
                                <span className="h2 font-weight-bold">{data.job.scope.hazard}</span><br/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <div className="card border-0">
                          <div className="card-header">
                            <div className="row align-items-center">
                              <div className="col">
                                <h3 className="text-primary">Activities List</h3>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <ul>
                              {data.job.scope.activity?.split(",").map(activity => <li key={activity}>{activity}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="card border-0">
                          <div className="card-header">
                            <div className="row align-items-center">
                              <div className="col">
                                <h3 className="text-primary">Hazards List</h3>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <ul>
                              {data.job.scope.hazards?.split(",").map(hazard => <li key={hazard}>{hazard}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="card border-0">
                          <div className="card-header">
                            <div className="row align-items-center">
                              <div className="col">
                                <h3 className="text-primary">Controls List</h3>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <ul>
                              {data.job.scope.controls?.split(",").map(control => <li key={control}>{control}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header border-0">
                    <h4>Compliance details</h4>
                  </div>
                  <div className="card-body">
                  {data.job.compliance ?
                    <>
                      <div className="row d-flex align-items-stretch">
                        <div className="col-md-4 d-flex align-items-stretch">
                          <div className="card">
                            <img className="card-img-top" src={data.job.compliance.ppe} alt="" />
                            <div className="card-header border-0">
                              <h4 className="card-title">PPE</h4>
                              {/*<p>Time: {data.job.compliance.ppe.split("%7C")[1].replace("%20", " ")}</p>*/}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-stretch">
                          <div className="card">
                            <img className="card-img-top" src={data.job.compliance.induction} alt="" />
                            <div className="card-header border-0">
                              <h4 className="card-title">Induction</h4>
                              {/*<p>Time: {data.job.compliance.induction.split("%7C")[1].replace("%20", " ")}</p>*/}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-stretch">
                          <div className="card">
                            <img className="card-img-top" src={data.job.compliance.toolbox} alt="" />
                            <div className="card-header border-0">
                              <h4 className="card-title">Toolbox Talk</h4>
                              {/*<p>Time: {data.job.compliance.toolbox.split("%7C")[1].replace("%20", " ")}</p>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3 d-flex align-items-stretch">
                        <div className="col-md-6 d-flex align-items-stretch">
                          <div className="card">
                            <img className="card-img-top" src={data.job.compliance.first_aid} alt="" />
                            <div className="card-header border-0">
                              <h4 className="card-title">First Aid Kit</h4>
                              {/*<p>Time: {data.job.compliance.first_aid.split("%7C")[1].replace("%20", " ")}</p>*/}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-stretch">
                          <div className="card">
                            <img className="card-img-top" src={data.job.compliance.extinguisher} alt="" />
                            <div className="card-header border-0">
                              <h4 className="card-title">Fire Extinguisher</h4>
                              {/*<p>Time: {data.job.compliance.extinguisher.split("%7C")[1].replace("%20", " ")}</p>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-header border-0">
                              <h4 className="card-title">Job Hazard Assessment Submission</h4>
                            </div>
                            <div className="card-body">
                              <Table
                                className="table-borderless"
                                headers={[{
                                  label: "Text",
                                  key: "text"
                                },{
                                  label: "Consequence",
                                  key: "consequence"
                                },{
                                  label:"No. of Controls",
                                  key: "controls"
                                }]}
                                options={{
                                  viewable: false,
                                  deleteable: true,
                                  editable: false
                                }}
                                data={data.job.compliance.jha?.map(hazard => ({ ...hazard, controls: hazard?.controls.map(({ text }) => text).join(",")}))}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow mt-3">
                        <div className="card-header border-0">
                          <h4 className="card-title">Documents Viewed By Technician</h4>
                        </div>
                        <div className="card-body">
                        <Table
                          className="table-borderless"
                          headers={[{
                            label: "Document Name",
                            key: "name"
                          },{
                            label: "Link",
                            key: "url",
                            view: document => (
                              <a className="pt-3" key={document.id} href={document.url}>
                                <button className="btn btn-icon btn-outline-secondary btn-sm" type="button">
                                  <span className="btn-inner--icon"><i className="ni ni-archive-2"></i></span>
                                  <span className="btn-inner--text">View {document.name}</span>
                                </button>
                              </a>
                            )
                          }]}
                          options={{
                            viewable: false,
                            deleteable: true,
                            editable: false
                          }}
                          data={data.job.compliance.documents}
                        />
                        </div>
                      </div>
                    </> : <NoCompliance />}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header border-0">
                    <h4>Approval details</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                    {data.job.lv1_approval && <div className="col-md-3">
                        <div className="card card-stats">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className={`icon icon-shape bg-gradient-${data.job.lv1_approval.status === "ACCEPTED" ? "success" : "danger"} text-white rounded-circle shadow`}>
                                  <i className="ni ni-tag"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Level One Approval</h5>
                                <span className="h2 font-weight-bold">{data.job.lv1_approval.status}</span>
                              </div>
                            </div>
                            <hr/>
                            <div className="row">
                              <div className="col">
                                <p>Author: {data.job.lv1_approval.approver.name}</p>
                                <p>Reason: {data.job.lv1_approval.reason}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {data.job.lv2_approval && <div className="col-md-3">
                        <div className="card card-stats">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className={`icon icon-shape bg-gradient-${data.job.lv2_approval.status === "ACCEPTED" ? "success" : "danger"} text-white rounded-circle shadow`}>
                                  <i className="ni ni-tag"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Level Two Approval</h5>
                                <span className="h2 font-weight-bold">{data.job.lv2_approval.status}</span>
                              </div>
                            </div>
                            <hr/>
                            <div className="row">
                              <div className="col">
                                <p>Author: {data.job.lv2_approval.approver.name}</p>
                                <p>Reason: {data.job.lv2_approval.reason}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {data.job.lv3_approval && <div className="col-md-3">
                        <div className="card card-stats">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className={`icon icon-shape bg-gradient-${data.job.lv3_approval.status === "ACCEPTED" ? "success" : "danger"} text-white rounded-circle shadow`}>
                                  <i className="ni ni-tag"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Level Three Approval</h5>
                                <span className="h2 font-weight-bold">{data.job.lv3_approval.status}</span>
                              </div>
                            </div>
                            <hr/>
                            <div className="row">
                              <div className="col">
                                <p>Author: {data.job.lv3_approval.approver.name}</p>
                                <p>Reason: {data.job.lv3_approval.reason}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {data.job.lv4_approval && <div className="col-md-3">
                        <div className="card card-stats">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-3 col-12">
                                <div className={`icon icon-shape bg-gradient-${data.job.lv4_approval.status === "ACCEPTED" ? "success" : "danger"} text-white rounded-circle shadow`}>
                                  <i className="ni ni-tag"></i>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <h5 className="card-title text-uppercase text-muted mb-0">Level Four Approval</h5>
                                <span className="h2 font-weight-bold">{data.job.lv4_approval.status}</span>
                              </div>
                            </div>
                            <hr/>
                            <div className="row">
                              <div className="col">
                                <p>Author: {data.job.lv4_approval.approver.name}</p>
                                <p>Reason: {data.job.lv4_approval.reason}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.job.closure && <div className="row mt-3">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header border-0">
                    <h4>Job Closure Incidences</h4>
                  </div>
                  <div className="card-body">
                  <Table
                    className="table-borderless"
                    headers={[{
                      label: "Incidence Name",
                      key: "closuretype.name"
                    },{
                      label: "Number",
                      key: "amount"
                    }]}
                    options={{
                      viewable: false,
                      deleteable: true,
                      editable: false
                    }}
                    data={data.job.closure}
                  />
                  </div>
                </div>
              </div>
            </div>}
            <div className="card-footer">
              <div className="row mt-3" hidden={!(canApprove1 || canApprove2 || canApprove3 || canApprove4)}>
                <div className="col d-flex justify-content-between">
                  <button className="btn btn-icon btn-danger btn-lg" type="button" onClick={() => createApprovalDialog({ status: "REJECTED", level: (level1||level2||level3 || level4)})}>
                    <span className="btn-inner--icon"><i className="ni ni-fat-remove"></i></span>
                    <span className="btn-inner--text">Reject</span>
                  </button>
                  <button className="btn btn-icon btn-success btn-lg" type="button" onClick={() => createApproval({ status: "ACCEPTED", reason: "Approved", level: level1||level2||level3||level4 })}>
                    <span className="btn-inner--icon"><i className="ni ni-check-bold"></i></span>
                    <span className="btn-inner--text">Approve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
