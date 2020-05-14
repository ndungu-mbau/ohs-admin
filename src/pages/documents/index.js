import React from 'react'
import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import List from "./list"

const Index = ({ location }) => {
  return (
    <>
      <Sidebar location={location}/>
      <div className="main-content">
        <Navbar/>
        <List />
      </div>
    </>
  )
}

export default Index