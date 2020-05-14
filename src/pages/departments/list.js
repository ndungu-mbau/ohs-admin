import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DATA_QUERY, DEPARTMENTS_QUERY, CREATE_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT, CREATE_MANAGER } from "./queries"

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
  let { loading, data: departmentsData, error } = useQuery(DEPARTMENTS_QUERY)
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addDepartment] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS_QUERY }]
  })

  const [addPm] = useMutation(CREATE_MANAGER, {
    refetchQueries: [{ query: DATA_QUERY }]
  })

  const [editDepartment] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS_QUERY }]
  })

  const [removeDepartment] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS_QUERY }]
  })

  const saveAdd = async data => {
    const res = await addDepartment({ variables: { department: data }})
    console.log(res)
  }

  const saveEdit = async data => {
    const res = await editDepartment({ variables: { department: data }})
    console.log(res)
  }

  const saveRemove = async ({ id }) => {
    await removeDepartment({ variables : { department : { id }}})
  }

  const saveAddPm = async data => {
    const res = await addPm({ variables: { user: data }})
    return res
  }


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
      {!dataloading && <AddModal divisions={dataQuery.divisions} users={dataQuery.users} roles={dataQuery.roles} save={saveAdd} saveAddManager={saveAddPm} />}
      {!dataloading && <EditModal edit={edit} divisions={dataQuery.divisions} users={dataQuery.users} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Departments List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={departmentsData.departments}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                delete={department => { setRemove(department); deleteModalInstance.show() }}
                edit={department => { setEdit(department); editModalInstance.show() }}
                view={department => history.push(`/departments/${department.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "Division Name",
                  key: "division.name"
                },
                {
                  label: "Project Manager",
                  key: "manager.name"
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