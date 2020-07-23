import React from 'react'
import { Switch, Route } from "react-router-dom"
// import { useMutation } from "@apollo/react-hooks"
import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import list from "./list"
import view from "./view"

// import { messaging } from "../../utils/firebase"
// import { UPDATE_USER } from "../users/queries"

const Index = ({ location }) => {
  // const { id } = JSON.parse(sessionStorage.getItem("user"))
  // const [updateUser, { error }] = useMutation(UPDATE_USER)
  // if(error) console.log(error)

  // useEffect(() => {
  //   messaging.requestPermission()
  //     .then(async () => {
  //       const token = await messaging.getToken()
  //       console.log({ token })
  //       await updateUser({ variables: { user: { id, fcm : token }}})
  //     })
  //     .catch(err => {
  //       console.log("Unable to get permission to notify.", err);
  //     })
  // }, [updateUser, id])

  return (
    <>
      <Sidebar location={location}/>
      <div className="main-content">
        <Navbar/>
        <Switch>
          <Route path="/jobs" exact component={list} />
          <Route path="/jobs/:id" component={view} />
        </Switch>
      </div>
    </> 
  )
}

export default Index