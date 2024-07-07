import React from 'react'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      Navigation Bar
      <Outlet/>
    </div>
  )
}

export default Navbar
