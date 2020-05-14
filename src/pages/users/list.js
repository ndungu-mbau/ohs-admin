import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from "react-router-dom"
import { DATA_QUERY, USERS_QUERY, CREATE_USER, DELETE_USER, UPDATE_USER } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = props => {
  const history = useHistory()
  let { loading, data: usersData, error: queryError } = useQuery(USERS_QUERY)
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addUser, { error : mutationError}] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }]
  })

  const [editUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }]
  })

  const [removeUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: USERS_QUERY }]
  })

  const saveAdd = async data => {
    const res = await addUser({ variables: { user: data }})
    console.log(res)
  }

  const saveEdit= async data => {
    await editUser({ variables: { user: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeUser({ variables: { user: { id }}})
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
    <div className="container pb-8 pt-5 pt-md-8">
      {!dataloading && <AddModal departments={dataQuery.departments} roles={dataQuery.roles} save={saveAdd} />}
      {!dataloading && <EditModal edit={edit} departments={dataQuery.departments} roles={dataQuery.roles} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Users List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={usersData.users}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                delete={user => { setRemove(user); deleteModalInstance.show() }}
                edit={user => { setEdit(user); editModalInstance.show() }}
                view={user => history.push(`/users/${user.id}`)}
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
                  label: "Department Name",
                  key: "department.name"
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
  )
}

export default List