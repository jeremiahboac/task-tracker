import React from 'react'
import Button from './Button'

function Header({showAddTask, setShowAddTask}) {

  const handleClick = () => {
    setShowAddTask(prevValue => !prevValue)
  }

  return (
    <header className='header'>
      <h1>Task Tracker</h1>
      <Button color={!showAddTask ? "green" : "red"} text={!showAddTask ? "Add" : "Hide"} onClick={handleClick}/>
    </header>
  )
}



export default Header