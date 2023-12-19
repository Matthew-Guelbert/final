import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import './Game.css';

function Game(props) {


  const [editMode, setEditMode] = useState(false);
  const [gameName, setGameName] = useState('');
  const [genre, setGenre] = useState('');
  const [gameScore, setGameScore] = useState('');
  const [gameYear, setGameYear] = useState('');


  useEffect(() => {
    setGameName(props.game.gameName);
    setGenre(props.game.genre);
    setGameScore(props.game.gameScore);
    setGameYear(props.game.gameYear);
  }, []);

  const saveGame = () => {
    setEditMode(false);
    const updatedGame = { gameName:gameName, genre:genre, gameScore:gameScore, gameYear:gameYear, id:props.game.id, image:props.game.image }
    props.updateGame(updatedGame);
  }

  return (
    <>
      <div className="card">
        <img src={props.game.image} alt="Game card" className="card-img-top mx-auto" />
        {!editMode && <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">{props.game.gameName}</li>
          <li className="list-group-item text-center">{props.game.genre}</li>
          <li className="list-group-item text-center">{props.game.gameScore}</li>
          <li className="list-group-item text-center">{props.game.gameYear}</li>
          <button type='button' className='btn btn-danger' onClick={() => props.removeGame(props.game)}>Delete Game <FontAwesomeIcon icon={faWarning} /></button>
          <button type='button' className='btn btn-warning' onClick={()=> setEditMode(true)}>Edit Game <FontAwesomeIcon icon={faMagicWandSparkles} /></button>
        </ul>
      }
      {editMode && 
      <ul className="list-group list-group-flush">
      <li className="list-group-item text-center"><input type='text' className='form-control' value={gameName} onChange={(evt)=> setGameName(evt.currentTarget.value)} /></li>
      <li className="list-group-item text-center"><input type='text' className='form-control' value={genre} onChange={(evt)=> setGenre(evt.currentTarget.value)} /></li>
      <li className="list-group-item text-center"><input type='text' className='form-control' value={gameScore} onChange={(evt)=> setGameScore(evt.currentTarget.value)} /></li>
      <li className="list-group-item text-center"><input type='text' className='form-control' value={gameYear} onChange={(evt)=> setGameYear(evt.currentTarget.value)} /></li>
      <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveGame}>Save</button></li>
    </ul>
      }
      </div>
    </>
  );
}

export default Game;
