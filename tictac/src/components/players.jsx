import { useState } from "react";

export default function Players(props) {
  const [edit, setEdit] = useState(false);
  const { players, setPlayers, score } = props;
  const [newPlayers, setNewPlayers] = useState([...players]);

  const handleClick = () => {
    setNewPlayers([...players]);
    setEdit(true);
  };

  const handleChange = (e) => {
    const name = parseInt(e.target.name);
    const value = e.target.value;
    let newNames = [...newPlayers];
    // console.log(newNames);
    newNames[name] = value;
    setNewPlayers(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayers(newPlayers);
    setEdit(false);
  };

  if (edit) {
    return (
      <form className="players">
        <input
          type="text"
          name="0"
          value={newPlayers[0]}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        vs{" "}
        <input
          type="text"
          name="1"
          value={newPlayers[1]}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button onClick={(e) => handleSubmit(e)}>Done</button>
      </form>
    );
  } else {
    return (
      <div className="players" onClick={() => handleClick()}>
        <span>
          {players[0]}
          <sup>{score[1]}</sup>
        </span>
        vs{" "}
        <span>
          {players[1]}
          <sup>{score[0]}</sup>
        </span>
      </div>
    );
  }
}
