import Button from "./Button"
import { useLocation } from "react-router-dom"
const Header = ({onClick, showForm}) => {
  const location = useLocation();
  return (
    <header className='header'>
        <h1>TASK HEADER</h1>
        {location.pathname === '/' && (
        <Button color={showForm ? "#e74c3c" : "#2ecc71"} text={showForm ? "Close" : "Add Task"} onClick = {onClick} showForm = {showForm}/>
        )}
    </header>
    
  )
}

export default Header