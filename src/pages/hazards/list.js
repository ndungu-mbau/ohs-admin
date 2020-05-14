import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { HAZARDS_QUERY, DELETE_HAZARD, CREATE_HAZARD, UPDATE_HAZARD, CREATE_CONTROL } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = ({ history }) => {
  let { loading, data, error } = useQuery(HAZARDS_QUERY)
  const [edit, setEdit] = useState({})
  const [remove, setRemove] = useState({})

  const [addHazard] = useMutation(CREATE_HAZARD, {
    refetchQueries: [{ query: HAZARDS_QUERY }]
  })
  const [addControl] = useMutation(CREATE_CONTROL)

  const [editHazard] = useMutation(UPDATE_HAZARD, {
    refetchQueries: [{ query: HAZARDS_QUERY }]
  })

  const [removeHazard] = useMutation(DELETE_HAZARD, {
    refetchQueries: [{ query: HAZARDS_QUERY }]
  })

  const saveAdd = async data => {
    await addHazard({ variables: { hazard: data }})
  }

  const saveEdit = async data => {
    await editHazard({ variables: { hazard: data }})
  }

  const saveAddControl = async data => {
    const res = await addControl({ variables: { control: data }})
    return res
  }

  const saveRemove = async ({ id }) => {
    await removeHazard({ variables: { hazard: { id }}})
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
      <AddModal save={saveAdd} saveAddControl={saveAddControl} />
      <EditModal edit={edit} save={saveEdit} saveAddControl={saveAddControl} />
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Hazards List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={data.hazards}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: true
                }}
                edit={hazard => { setEdit(hazard); editModalInstance.show() }}
                delete={hazard => { setRemove(hazard); deleteModalInstance.show() }}
                view={hazard => history.push(`/hazards/${hazard.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "text"
                },
                {
                  label: "Consequences",
                  key: "consequence"
                },
                {
                  label: "No.of Controls",
                  key: "controls.length"
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