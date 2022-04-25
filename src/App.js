import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState, useEffect} from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  const [showForm , setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() =>{
    const getTasks = async () =>{
      const tasks = await fetchTasks();
      setTasks(tasks);
    }
    getTasks();
  }, [])

  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const toggleForm = () =>{
    setShowForm(!showForm);
  }

  const deleteTask = async(id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, 
    {method : 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  const addtask = async(task) =>{
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers:{
        "Content-type": "application/json"
      },
      body : JSON.stringify(task)
    }) 
    const data = await res.json();
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000 + 1);
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  }
  return (
      <Router>
      <div className="container">
        <Header onClick = {toggleForm} showForm = {showForm}/>
        <Routes>
          <Route path="/" element={
            <>
          {showForm && <AddTask onAdd = {addtask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle ={toggleReminder}/>  : (" No Task to show")}</>
          }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  )
}

export default App;
