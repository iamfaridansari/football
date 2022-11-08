import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./css/style.css"
import Players from './components/Players'
import AddPlayer from './components/AddPlayer'

const App = () => {
  return (
    <>
      <AddPlayer />
      <Players />
    </>
  )
}

export default App
