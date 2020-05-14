import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CLOSURE_TYPES_QUERY, DELETE_CLOSURE_TYPE, CREATE_CLOSURE_TYPE, UPDATE_CLOSURE_TYPE } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import DeleteModal from "../../components/delete"
import EditModal from "./edit"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = ({ history }) => {
  let { loading, data, error } = useQuery(CLOSURE_TYPES_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addClosuretype] = useMutation(CREATE_CLOSURE_TYPE, {
    refetchQueries: [{ query: CLOSURE_TYPES_QUERY }]
  })

  const [editClosuretype] = useMutation(UPDATE_CLOSURE_TYPE, {
    refetchQueries: [{ query: CLOSURE_TYPES_QUERY }]
  })

  const [removeClosuretype] = useMutation(DELETE_CLOSURE_TYPE, {
    refetchQueries: [{ query: CLOSURE_TYPES_QUERY }]
  })

  const saveAdd = async data => {
    await addClosuretype({ variables: { closuretype: data }})
  }

  const saveEdit = async data => {
    await editClosuretype({ variables: { closuretype: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeClosuretype({ variables: { closuretype: { id }}})
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
                  <h3 className="text-lighter">Job Closure Incidence Types List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={data.closuretypes}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: false
                }}
                edit={closuretype => { setEdit(closuretype); editModalInstance.show() }}
                delete={closuretype => { setRemove(closuretype); deleteModalInstance.show() }}
                view={closuretype => history.push(`/closuretypes/${closuretype.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
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