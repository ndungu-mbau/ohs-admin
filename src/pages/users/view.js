import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { USER_QUERY, USERS_QUERY, DELETE_USER } from "./queries"

// import Table from "../../components/datatable"
import Loader from "../../components/loader"

import DeleteModal from "../../components/delete"
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { id } = useParams()
  const history = useHistory()
  let { loading, data, error: queryError } = useQuery(USER_QUERY, {
    variables:{
      user:{
        id
      }
    }
  })
  const [remove, setRemove] = useState({})

  const [removeUser, { error: mutationError }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: USERS_QUERY }]
  })

  const saveRemove = async ({ id }) => {
    await removeUser({ variables: { user: { id }}})
    deleteModalInstance.hide()
    history.push("/users")
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
              <h2>User Details</h2>
              <div className="ml-auto">
                <button className="btn btn-outline-secondary">
                  <i className="far fa-edit"></i>
                </button>
                <button className="btn btn-outline-secondary" disabled onClick={() => {setRemove(data.user); deleteModalInstance.show()}}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-4 col-lg-3">
                <img src="../assets/img/theme/default.png" alt="" className="rounded-circle" style={{ width: "200px"}} />
              </div>
              <div className="col-8 col-lg-9" style={{ borderLeft: "1px solid var(--lighter)"}}>
                <h2 className="text-uppercase text-primary"> Name: {data.user.name}</h2>
                <hr/>
                <h3>Contact: {data.user.phone}</h3>
                <h3>Department: {data.user.department.name}</h3>
                <h3>Role: {data.user.type.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List