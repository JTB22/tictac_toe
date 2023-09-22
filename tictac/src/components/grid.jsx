import { useEffect, useState } from "react";
import "./grid.css";

const initialGrid = Array(9).fill("");

const Grid = (props) => {
  const { setWin, win, players, newScore } = props;
  const [count, setCount] = useState([0, 0]);
  const [grid, setGrid] = useState(initialGrid);
  const [isNext, setIsNext] = useState([0]);

  const winCheck = () => {
    // Check for a winning row, column, or diagonal of 3 for x or o
    if (grid[0] === grid[1] && grid[1] === grid[2] && grid[0] !== "") {
      return true;
    } else if (grid[3] === grid[4] && grid[4] === grid[5] && grid[3] !== "") {
      return true;
    } else if (grid[6] === grid[7] && grid[7] === grid[8] && grid[6] !== "") {
      return true;
    } else if (grid[0] === grid[3] && grid[3] === grid[6] && grid[0] !== "") {
      return true;
    } else if (grid[1] === grid[4] && grid[4] === grid[7] && grid[1] !== "") {
      return true;
    } else if (grid[2] === grid[5] && grid[5] === grid[8] && grid[2] !== "") {
      return true;
    } else if (grid[0] === grid[4] && grid[4] === grid[8] && grid[0] !== "") {
      return true;
    } else if (grid[2] === grid[4] && grid[4] === grid[6] && grid[2] !== "") {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = (index) => {
    if (win) {
      return;
    } else if (grid[index] !== "") {
      return;
    }
    // Update the grid state when a cell is clicked
    const updatedGrid = [...grid];
    // console.log(isNext.length);
    const nextMove = isNext[isNext.length - 1] === 1 ? ["O", 0] : ["X", 1];
    updatedGrid[index] = nextMove[0];
    setGrid(updatedGrid);
    const newMove = [...isNext];
    // console.log(nextMove);
    newMove.push(nextMove[1]);
    // console.log(newMove);
    // console.log(newMove);
    setIsNext(newMove);
  };

  useEffect(() => {
    if (winCheck()) {
      const winner = isNext[isNext.length - 1];
      setWin(winner === 1 ? `${players[0]} Wins` : `${players[1]} Wins`);
      newScore(winner);
      const newCount = [...count];
      winner === 0 ? newCount[0]++ : newCount[1]++;
      setCount(newCount);
      setTimeout(() => setGrid(initialGrid), 1000);
    } else if (grid.every((cell) => cell !== "")) {
      setWin("Draw");
      setTimeout(() => setGrid(initialGrid), 1000);
    }
  }, [grid]);
  //   console.log(isNext);

  const cellStyle = () => {
    if (win) {
      return "slide-out-bottom";
    } else {
      return "slide-in-top";
    }
  };

  return (
    <div className="container">
      <div className="board text-flicker-in-glow2">
        {/* <div className="leftBar"></div> */}
        <div className="gridContainer">
          <div className={win ? "grid disabled" : "grid"}>
            {grid.map((cell, index) => (
              <div
                key={index}
                className={cell === "" ? "cell" : "cell focus-in-contract-bck"}
                onClick={() => handleClick(index)}
              >
                <span className={cell === "" ? "" : cellStyle()}>{cell}</span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="rightBar">{edit ? <Players /> : <Players />}</div> */}
      </div>
      <div className={isNext.length === 1 ? "card disabled" : "card vibrate-3"}>
        <button
          className="button"
          onClick={() => {
            setCount((count) => [0, 0]);
            setGrid(initialGrid);
            setIsNext([0]);
          }}
        >
          {players[0]}
          <sup>{count[1]}</sup> vs {players[1]}
          <sup>{count[0]}</sup>
          <br />
          <sub>clear game</sub>
        </button>
      </div>
    </div>
  );
};

export default Grid;
