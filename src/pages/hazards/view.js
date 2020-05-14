import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { HAZARD_QUERY, HAZARDS_QUERY, DELETE_HAZARD } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import DeleteModal from "../../components/delete"
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { id } = useParams()
  const history = useHistory()
  let { loading, data, error: queryError } = useQuery(HAZARD_QUERY, {
    variables:{
      hazard:{
        id
      }
    }
  })
  const [remove, setRemove] = useState({})

  const [removeHazard, { error: mutationError }] = useMutation(DELETE_HAZARD, {
    refetchQueries: [{ query: HAZARDS_QUERY }]
  })

  const saveRemove = async ({ id }) => {
    await removeHazard({ variables: { hazard: { id }}})
    deleteModalInstance.hide()
    history.push("/hazards")
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
              <h2>Hazard Details</h2>
              <div className="ml-auto">
                <button className="btn btn-outline-secondary">
                  <i className="far fa-edit"></i>
                </button>
                <button className="btn btn-outline-secondary" disabled onClick={() => {setRemove(data.hazard); deleteModalInstance.show()}}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h2 className="text-uppercase text-primary"> Hazard: {data.hazard.text}</h2>
                <h4> Consequence: {data.hazard.consequence}</h4>
                <hr/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="text-primary">Controls List</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      className="table-borderless"
                      data={data.hazard.controls}
                      options={{
                        deleteable: true,
                        editable: false,
                        viewable: false
                      }}
                      headers={[
                      {
                        label: "Control",
                        key: "text"
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