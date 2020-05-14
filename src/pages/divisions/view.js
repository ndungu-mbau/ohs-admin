import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DIVISION_QUERY, DIVISIONS_QUERY, DELETE_DIVISION } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import DeleteModal from "../../components/delete"
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { id } = useParams()
  const history = useHistory()
  let { loading, data, error: queryError } = useQuery(DIVISION_QUERY, {
    variables:{
      division:{
        id
      }
    }
  })
  const [remove, setRemove] = useState({})

  const [removeDivision, { error: mutationError }] = useMutation(DELETE_DIVISION, {
    refetchQueries: [{ query: DIVISIONS_QUERY }]
  })

  const saveRemove = async ({ id }) => {
    await removeDivision({ variables: { division: { id }}})
    deleteModalInstance.hide()
    history.push("/divisions")
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
              <h2>Division Details</h2>
              <div className="ml-auto">
                <button className="btn btn-outline-secondary">
                  <i className="far fa-edit"></i>
                </button>
                <button className="btn btn-outline-secondary" disabled onClick={() => {setRemove(data.division); deleteModalInstance.show()}}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h2 className="text-uppercase text-primary"> Name: {data.division.name}</h2>
                <h4> Description: {data.division.description}</h4>
                <hr/>
                <div className="row">
                  <div className="col-6">
                    <div class="card shadow card-stats mb-4 mb-lg-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-2 justify-content-center align-content-center">
                            <div class="icon icon-shape bg-success text-white rounded-circle shadow">
                              <i class="ni ni-single-02"></i>
                            </div>
                          </div>
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">HOD</h5>
                            <span class="h2 font-weight-bold">{data.division.hod.name}</span><br/>
                            <hr className="mb-0"></hr>
                            <span class="h4 font-weight-bold mb-0 mt-0">Contact: {data.division.hod.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="text-primary">Users List</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      className="table-borderless"
                      data={data.division.users}
                      options={{
                        deleteable: true,
                        editable: false,
                        viewable: false
                      }}
                      headers={[
                      {
                        label: "Name",
                        key: "name"
                      },
                      {
                        label: "Phone",
                        key: "phone"
                      },
                      {
                        label:"Role Name",
                        key: "type.name"
                      }]}
                    />
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