import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DATA_QUERY, JOBS_QUERY, CREATE_JOB, DELETE_JOB, UPDATE_JOB } from "./queries"

import Table from "../../components/datatable"
import Loader from "../../components/loader"

import AddModal from "./add"
import EditModal from "./edit"
import DeleteModal from "../../components/delete"
const addModalInstance = new AddModal()
const editModalInstance = new EditModal()
const deleteModalInstance = new DeleteModal()

const List = props => {
  const { type: { permissions }} = JSON.parse(window.localStorage.getItem("user"))
  const history = useHistory()
  let { loading, data: jobsData, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only"
  })
  const { loading: dataloading, data: dataQuery } = useQuery(DATA_QUERY)
  const [remove, setRemove] = useState({})
  const [edit, setEdit] = useState({})

  const [addJob] = useMutation(CREATE_JOB, {
    refetchQueries: [{ query: JOBS_QUERY }]
  })

  const [editJob] = useMutation(UPDATE_JOB, {
    refetchQueries: [{ query: JOBS_QUERY }]
  })

  const [removeJob] = useMutation(DELETE_JOB, {
    refetchQueries: [{ query: JOBS_QUERY }]
  })

  const saveAdd = async data => {
    const res = await addJob({ variables: { job: data }})
    console.log(res)
  }

  const saveEdit = async data => {
    const res = await editJob({ variables: { job: data }})
    console.log(res)
  }

  const saveRemove = async ({ id }) => {
    await removeJob({ variables : { job: { id }}})
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
      {!dataloading && <AddModal users={dataQuery.users} scopes={dataQuery.scopes} save={saveAdd} />}
      {!dataloading && <EditModal edit={edit} users={dataQuery.users} scopes={dataQuery.scopes} save={saveEdit} />}
      <DeleteModal remove={remove} save={saveRemove} />
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header bg-default">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="text-lighter">Jobs List</h3>
                </div>
                {permissions.includes("AUTHOR") || permissions.includes("HOD") ? <div className="col text-right">
                  <button type="button" className="btn btn-success mr-5" onClick={addModalInstance.show}>Create</button>
                </div>: null }
              </div>
            </div>
            <div className="card-body">
              <Table
                className="table-borderless"
                data={jobsData.jobs.reverse()}
                options={{
                  deleteable: true,
                  editable: (job) => job.status.type === "NEW" || job.status.type === "REJECTED",
                  viewable: true
                }}
                delete={job => { setRemove(job); deleteModalInstance.show() }}
                edit={job => { setEdit(job); editModalInstance.show() }}
                view={job => history.push(`/jobs/${job.id}`)}
                headers={[
                {
                  label: "Name",
                  key: "name"
                },
                {
                  label: "Department Name",
                  key: "scope.department.name"
                },
                {
                  label:"Scope Name",
                  key: "scope.name"
                },
                {
                  label: "Hazard",
                  key: "scope.hazard"
                },
                {
                  label: "Status",
                  key: "status.type"
                },
                {
                  label: "Technician",
                  key: "technician.name"
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