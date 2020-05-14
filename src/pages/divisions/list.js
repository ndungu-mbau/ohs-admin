import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DATA_QUERY, DIVISIONS_QUERY, CREATE_DIVISION, DELETE_DIVISION, UPDATE_DIVISION, CREATE_HOD } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { history } = props
  let { loading, data: divisionsData, error } = useQuery(DIVISIONS_QUERY)
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY, {
    variables: {
      role: {
        permissions: ["HOD"]
      }
    }
  })
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addDivision] = useMutation(CREATE_DIVISION, {
    refetchQueries: [{ query: DIVISIONS_QUERY }]
  })

  const [addHod] = useMutation(CREATE_HOD, {
    refetchQueries: [{ query: DATA_QUERY, variables: {
      role: {
        permissions: ["HOD"]
      }
    } }]
  })

  const [editDivision] = useMutation(UPDATE_DIVISION, {
    refetchQueries: [{ query: DIVISIONS_QUERY}]
  })

  const [removeDivision] = useMutation(DELETE_DIVISION, {
    refetchQueries: [{ query: DIVISIONS_QUERY }]
  })

  const saveAdd = async data => {
    await addDivision({ variables: { division: data }})
  }

  const saveEdit = async data => {
    await editDivision({ variables: { division: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeDivision({ variables: { division: { id }}})
  }

  const saveAddHod = async data => {
    console.log(data)
    const res = await addHod({ variables: { user: data }})
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
      {!dataloading && <AddModal users={dataQuery.users} roles={dataQuery.roleByPermission} save={saveAdd} saveAddHod={saveAddHod} />}
      {!dataloading && <EditModal edit={edit} users={dataQuery.users} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Divisions List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={divisionsData.divisions}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                delete={division => { setRemove(division); deleteModalInstance.show() }}
                edit={division => { setEdit(division); editModalInstance.show() }}
                view={division => history.push(`/divisions/${division.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "Description",
                  key: "description"
                },
                {
                  label: "Head of Division Name",
                  key: "hod.name"
                },
                {
                  label: "No.of Users",
                  key: "users.length"
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