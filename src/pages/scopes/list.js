import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DATA_QUERY, SCOPES_QUERY, CREATE_SCOPE, UPDATE_SCOPE, DELETE_SCOPE } from "./queries"

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
  let { loading, data: scopesData, error } = useQuery(SCOPES_QUERY)
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addScope] = useMutation(CREATE_SCOPE, {
    refetchQueries: [{ query: SCOPES_QUERY }]
  })

  const [removeScope] = useMutation(DELETE_SCOPE, {
    refetchQueries: [{ query: SCOPES_QUERY }]
  })

  const [editScope] = useMutation(UPDATE_SCOPE, {
    refetchQueries: [{ query: SCOPES_QUERY }]
  })

  const saveAdd = async data => {
    const res = await addScope({ variables: { scope: data }})
    console.log(res)
  }

  const saveEdit = async data => {
    await editScope({ variables: { scope: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeScope({ variables : { scope : { id }}})
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
      {!dataloading && <AddModal departments={dataQuery.departments} save={saveAdd} />}
      {!dataloading && <EditModal edit={edit} departments={dataQuery.departments} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Scopes List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={scopesData.scopes}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                delete={scope => { setRemove(scope); deleteModalInstance.show() }}
                edit={scope => { setEdit(scope); editModalInstance.show() }}
                view={scope => history.push(`/scopes/${scope.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "Department Name",
                  key: "department.name"
                },
                {
                  label:"Hazard Level",
                  key: "hazard"
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