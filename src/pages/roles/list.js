import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ROLES_QUERY, DELETE_ROLE, CREATE_ROLE, UPDATE_ROLE } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import DeleteModal from "../../components/delete"
import EditModal from "./edit"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = ({ history }) => {
  let { loading, data, error } = useQuery(ROLES_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: ROLES_QUERY }]
  })

  const [editRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: ROLES_QUERY }]
  })

  const [removeRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [{ query: ROLES_QUERY }]
  })

  const saveAdd = async data => {
    await addRole({ variables: { role: data }})
  }

  const saveEdit = async data => {
    await editRole({ variables: { role: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeRole({ variables: { role: { id }}})
  }

  if(loading) return <Loader />
  if(error){
    window.Swal.fire({
      title: "OOPS!",
      icon: "error",
      text: error.message
    })
  }

  // Re-add on do add mutations 
  // {!dataloading && }

  return (
    <div className="container pb-8 pt-5 pt-md-8">
      <AddModal save={saveAdd} />
      <EditModal edit={edit} save={saveEdit} />
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Roles List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={data.roles}
                options={{
                  deleteable: true,
                  editable: false,
                  viewable: false
                }}
                edit={role => { setEdit(role); editModalInstance.show() }}
                delete={role => { setRemove(role); deleteModalInstance.show() }}
                view={role => history.push(`/roles/${role.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                }, {
                  label: "Permissions",
                  key: "permissions",
                  view: role => <td>{role.permissions.join(",")}</td>
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