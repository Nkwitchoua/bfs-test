import React from 'react';
import "./App.css"

const Box = ({colorId, itemId, handleClick}) => {
    // console.log(colorId, itemId)
  return (
    <div className={`box ${colorId === 1 ? "red" : colorId === 2 ? "blue" : "green"}`}
        onClick={(event) => handleClick(event.target.id, colorId)}
        id={itemId}></div>
  )
}

export default Box