import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddGame.css';


function AddGame(props) {
  // id, firstName, lastName, photo
  const [gameName, setGameName] = useState('');
  const [gameYear, setGameYear] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [gameScore, setGameScore] = useState('');

  const doWork = () => {
    const newGame = {
      id: nanoid(),
      gameName: gameName,
      gameYear: gameYear,
      genre: genre,
      image: URL.createObjectURL(selectedFile),
      gameScore: parseInt(gameScore) + '/10',
    };
    props.addGame(newGame);
  };

  const imageUpdate = (evt) => {
    setSelectedFile(evt.target.files[0]);
  };

  return (
    <div className="row mt-5" id="addGame">
      <h3>Add Game</h3>
      <div className="col-md-2">
        <label htmlFor="txtGameName" className="form-label">
          Game Title
        </label>
        <input
          type="text"
          id="txtGameName"
          placeholder=""
          className="form-control"
          onChange={(evt) => setGameName(evt.currentTarget.value)}
          value={gameName}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtGameGenre" className="form-label">
          Game Genre
        </label>
        <input
          type="text"
          id="txtGameGenre"
          placeholder=""
          className="form-control"
          onChange={(evt) => setGenre(evt.currentTarget.value)}
          value={genre}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtGameScore" className="form-label">
          Score (Out of 10)
        </label>
        <input
          type="text"
          id="txtGameScore"
          placeholder=""
          className="form-control"
          onChange={(evt) => setGameScore(evt.currentTarget.value)}
          value={gameScore}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="fileUpload" className="form-label">
          Game Image
        </label>
        <input type="file" name="file" id="fileUpload" onChange={imageUpdate} />
      </div>
      <div className="col-md-2">
        <label htmlFor="txtGameScore" className="form-label">
          Release Year
        </label>
        <input
          type="text"
          id="txtGameYear"
          placeholder="2000"
          className="form-control"
          onChange={(evt) => setGameYear(evt.currentTarget.value)}
          value={gameYear}
        />
      </div>
      <div className="col-md-2 offset-md-5 pt-4">
        <button type="button" id="btnAdd" className="btn btn-success btn-lg" onClick={doWork}>
          Add Game <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </div>
    </div>
  );
}

export default AddGame;
