import { useEffect, useState } from 'react';
import './App.css';
import Box from './Box';

let array = [];

for(let i = 0; i < 400; i++) {
  let ran = Math.floor(Math.random()*2 + 1);
  array.push([ran, i])
}

// Creating an Array of all the tiles

function App() {

  const [controlArr, setControlArr] = useState(array);
  
  let matrix = [];
  
  for(let i = 0; i < array.length; i++) {
    matrix.push(array.slice(i, i + 20))
    i += 19;
  }

  // Creating binary matrix consisting of 19 Rows and Columns

  const handleClick = (t, color) => {
    if(array[+t].includes(3)) {
      return;
    }

  // If tile is already Green function will stop
  
    let q = [];

  // Creating Queue for BFS

    array = array.map(num => {
      if(num.indexOf(+t) != -1) {
        return [3, +t];
      }
      return num
    })
    setControlArr(array);

  // Turning the first tile we clicked on into green
  
    for(let i = 0; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j].includes(+t)) {
          q.push([i, j]);
        }
      }
    }

  // Pushing first clicked tile into Queue

    let dirs = [[-1,0],[1,0],[0,-1],[0,1]];

  // Creating Directions

    while(q.length > 0) {

  // While Queue is not empty
      let curr = q.shift();

  // Make variable with the first element of Queue

      for(let i = 0; i < dirs.length; i++) {
        let newR = curr[0] + dirs[i][0];
        let newC = curr[1] + dirs[i][1];

  // Creating new Row and new Column for every Direction(right, left, up, down)

        if(newR >= 0 && newC >= 0 && newR <= 19 && newC <= 19) {

  // Check if tile in this coordinates exists

          if(matrix[newR][newC][0] === color) {

  // Check if the color is the same as we clicked

            q.push([newR, newC]);
            matrix[newR][newC] = [3, newR*20 + newC]
            array[newR*20 + newC] = [3, newR*20 + newC]

  // Push this tile into Queue, Changing color and index in Array and Matrix

          }
        }
      }
    }
  }

  
  useEffect(() => {
  }, [array])

  return (
    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
      <h1>Click on any tile</h1>
      <div className='container'>
        {
          array.map(item => <Box colorId={item[0]} itemId={item[1]} key={item[1]} handleClick={handleClick}></Box>)
        }
      </div>
    </div>
  );
}

export default App;
