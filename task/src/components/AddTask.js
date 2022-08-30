import React, { useState } from 'react'

const AddTask = ({addTask}) => {
  const [formData, setFormData] = useState({
    text: "",
    day: "",
    reminder: false
  })

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
      if(!formData.text) {
        alert("Please add a task!")
        return
      }

      addTask(formData)

      setFormData({
        text: "",
        day: "",
        reminder: false
      })
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input type="text" placeholder="Add Task" name='text' value={formData.text} onChange={handleChange}/>
      </div>
      <div className='form-control'>
        <label >Day & Time</label>
        <input type="text" placeholder="Add Day & Time" name='day' value={formData.day} onChange={handleChange}/>
      </div>
      <div className='form-control-check'>
        <input id="reminder" type="checkbox" name='reminder' checked={formData.reminder} onChange={handleChange}/>
        <label htmlFor="reminder">Set Reminder</label>
      </div>
      <input type="submit" className="btn btn-block" value="Save Task"/>
    </form>
  )
}

export default AddTask