import React from 'react'

const Button = (props) => {
  
  return (
    <button className='btn' onClick={props.onClick} style={{backgroundColor:props.color}}>{props.text}</button>
  )
}

Button.defaultProps = {color:"lightblue"};
export default Button