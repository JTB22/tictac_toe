import { useEffect, useState } from "react";
import Grid from "./components/grid.jsx";
import Players from "./components/players.jsx";
import "./App.css";

const Header = () => {
  return (
    <div className="header">
      <span className="text-flicker-in-glow">
        X<sub>s</sub>
      </span>
      &
      <span className="text-flicker-in-glow">
        O<sub>s</sub>
      </span>
    </div>
  );
};

function App() {
  const [win, setWin] = useState(null);
  const [players, setPlayers] = useState(["X", "O"]);
  const [score, setScore] = useState([0, 0]);

  const newScore = (id) => {
    const didScore = [...score];
    didScore[id] += 1;
    setScore(didScore);
  };

  useEffect(() => {
    if (win) setTimeout(() => setWin(null), 3000);
  }, [win]);

  return (
    <>
      <div onClick={() => setPlayers(["X", "O"])}>
        <Header />
      </div>
      {win ? (
        <h1 className="bounce-in-top">{win}</h1>
      ) : (
        <Players players={players} setPlayers={setPlayers} score={score} />
      )}
      <Grid win={win} setWin={setWin} players={players} newScore={newScore} />
      <p className="read-the-docs">
        Click on the X<sub>s</sub> & O<sub>s</sub> to reset player names, or
        click X<small> vs </small>O to change names.
      </p>
    </>
  );
}

export default App;
