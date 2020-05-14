import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SCOPE_QUERY, SCOPES_QUERY, DELETE_SCOPE } from "./queries"

import Loader from "../../components/loader"

import DeleteModal from "../../components/delete"
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { id } = useParams()
  const history = useHistory()
  let { loading, data, error: queryError } = useQuery(SCOPE_QUERY, {
    variables:{
      scope:{
        id
      }
    }
  })
  const [remove, setRemove] = useState({})

  const [removeScope, { error: mutationError }] = useMutation(DELETE_SCOPE, {
    refetchQueries: [{ query: SCOPES_QUERY }]
  })

  const saveRemove = async ({ id }) => {
    await removeScope({ variables: { scope: { id }}})
    deleteModalInstance.hide()
    history.push("/scopes")
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

  return (
    <div className="container-fluid pb-8 pt-8 pt-md-12">
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col-12 card shadow">
          <div className="card-header">
            <div className="row d-flex justify-content-between">
              <h2>Scope Details</h2>
              <div className="ml-auto">
                <button className="btn btn-outline-secondary">
                  <i className="far fa-edit"></i>
                </button>
                <button className="btn btn-outline-secondary" disabled onClick={() => {setRemove(data.scope); deleteModalInstance.show()}}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h2 className="text-uppercase text-primary"> Name: {data.scope.name}</h2>
                <hr/>
                <div className="row">
                  <div className="col">
                    <div class="card shadow card-stats mb-4 mb-lg-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">Department Name</h5>
                            <span class="h2 font-weight-bold mb-0">{data.scope.department.name}</span>
                          </div>
                          <div class="col-auto">
                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i class="ni ni-collection"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div class="card shadow card-stats mb-4 mb-lg-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">Hazard Level</h5>
                            <span class="h2 font-weight-bold mb-0">{data.scope.hazard}</span>
                          </div>
                          <div class="col-auto">
                            <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i class="fas fa-radiation-alt"></i>
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
      </div>
    </div>
  )
}

export default List