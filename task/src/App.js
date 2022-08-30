import { useEffect, useState } from "react"
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks")
    const data = await response.json();
    return data;
  }

  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json();
    return data;
  }

  const addTask = async(data) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const task = await response.json()
    setTasks(prevTask => {
      return [task, ...prevTask]
    })
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })

    setTasks(prevTask => {
      return prevTask.filter(prevTask => prevTask.id !== id)})
  }

  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updateTask)
    })

    const data = await response.json()

    setTasks(prevTask => {
      return prevTask.map(task => {
        return task.id === id ? {...task, reminder: data.reminder} : task
      })
    })
  }

  return (
    <div className="container">
      <Header showAddTask={showAddTask} setShowAddTask={setShowAddTask}/>
      {showAddTask && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? 
      <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/> : <p>No Task Available</p>
      }
    </div>
  );
}


export default App;
