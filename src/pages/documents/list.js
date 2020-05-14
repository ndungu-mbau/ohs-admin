import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { DOCUMENTS_QUERY, DELETE_DOCUMENT, CREATE_DOCUMENT } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = ({ history }) => {
  let { loading, data, error } = useQuery(DOCUMENTS_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addDocument] = useMutation(CREATE_DOCUMENT, {
    refetchQueries: [{ query: DOCUMENTS_QUERY }]
  })

  const [editDocument] = useMutation(CREATE_DOCUMENT, {
    refetchQueries: [{ query: DOCUMENTS_QUERY }]
  })

  const [removeDocument] = useMutation(DELETE_DOCUMENT, {
    refetchQueries: [{ query: DOCUMENTS_QUERY }]
  })

  const saveAdd = async data => {
    await addDocument({ variables: { document: data }})
  }

  const saveEdit = async data => {
    await editDocument({ variables: { document: data }})
  }

  const saveRemove = async ({ id }) => {
    await removeDocument({ variables: { document: { id }}})
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
      <DeleteModal remove={remove} save={saveRemove} />
      <EditModal edit={edit} save={saveEdit} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Documents List</h3>
                </div>
                <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={data.documents}
                options={{
                  deleteable: true,
                  editable: true,
                  viewable: false
                }}
                edit={document => { setEdit(document); editModalInstance.show() }}
                delete={document => { setRemove(document); deleteModalInstance.show() }}
                view={document => history.push(`/documents/${document.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "URL",
                  key: "url"
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