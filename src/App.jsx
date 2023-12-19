import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddGame from './components/AddGame';
import _ from 'lodash';
import Game from './components/Game';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [allGames, setAllGames] = useState(null); //displays all games
  const [searchResults, setSearchResults] = useState(null); //displays filtered games
  const [keywords, setKeywords] = useState('');
  const [gameYear, setGameYear] = useState('');

  useEffect(() => {
    saveGames(games);
  }, []);

  const saveGames = (games) => {
    setAllGames(games);
    setSearchResults(games);
  };

  const addGame = (newGame) => {
    const updatedGames = [...allGames, newGame];
    saveGames(updatedGames);
  };

  const searchGames = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (gameYear) {
      keywordsArray.push(gameYear.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allGames.filter((game) => {
        for (const word of keywordsArray) {
          if (
            game.gameName.toLowerCase().includes(word) ||
            game.genre.toLowerCase().includes(word) ||
            game.gameYear === parseInt(word)
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allGames);
    }
  };

  const removeGame = (gameToDelete) => {
    console.table(gameToDelete);
    const updatedGamesArray = allGames.filter((game) => game.id !== gameToDelete.id);
    saveGames(updatedGamesArray);
  };

  const updateGame = (updatedGame) => {
    const updatedGamesArray = allGames.map(game => game.id === updatedGame.id ? {...game,...updatedGame } : game);
    saveGames(updatedGamesArray);
  }

  const games = [
    {
      id: nanoid(),
      gameName: 'Final Fantasy XVI', //video game name
      genre: 'RPG', //video game genre
      gameScore: '9/10', //video game score
      image: '/images/FFXVI.jpg',
      gameYear: 2023, // video game release date
    },
    {
      id: nanoid(),
      gameName: 'The Legend of Zelda: Tears of the Kingdom',
      genre: 'Adventure',
      gameScore: '8/10',
      image: '/images/ZeldaTOTK.jpg',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'ARMORED CORE VI: FIRES OF RUBICON',
      genre: "Mech Action",
      gameScore: '8/10',
      image: '/images/AC6.png',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Starfield',
      genre: 'RPG',
      gameScore: '7/10',
      image: '/images/starfield.png',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Resident Evil 4',
      genre: 'Survival Horror',
      gameScore: '8/10',
      image: '/images/RE4.png',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Star Wars Jedi: Survivor',
      genre: 'Action Adventure',
      gameScore: '6.5/10',
      image: '/images/SWJediSurvivor.jpg',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Super Mario Bros. Wonder',
      genre: '2D Platformer',
      gameScore: '9/10',
      image: '/images/smbw.png',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Diablo IV',
      genre: 'RPG',
      gameScore: '2/10',
      image: '/images/Diablo4.jpg',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Alan Wake 2',
      genre: 'Horror',
      gameScore: '8/10',
      image: '/images/alanwake2.jpg',
      gameYear: 2023,
    },
    {
      id: nanoid(),
      gameName: 'Marvel\'s Spider-Man 2',
      genre: 'Action Adventure',
      gameScore: '9/10',
      image: '/images/spiderman2.jpg',
      gameYear: 2023,
    },
  ];

  return (
    <div className="container">

      <div className="row" id="allGames">
        <h3>Game Library</h3>
        {searchResults &&
          searchResults.map((game) => 
          (
            <div className="col-lg-2" key={game.id}>
              <Game game={game} removeGame={removeGame} updateGame={updateGame} />
            </div>
          ))}
      </div>

      {/* {!allStudents && (
        <button type="button" className="btn btn-lg btn-success" onClick={() => saveStudents(students)}>
          Save Students
        </button>
      )} */}
      <AddGame addGame={addGame} />
      <div className="row mt-4" id="searchGame">
        <h2>Game Search</h2>
        <h5>Search by Name or by Release Year</h5>
        <div className="col-md-4">
          {/* <label htmlFor="txtKeywords">Search by First Name or Last Name</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Minesweeper"
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className="col-md-4">
          <select value={gameYear} onChange={(evt) => setGameYear(evt.currentTarget.value)} className="form-select">
            <option value="">Search by Year</option>
            {_(allGames)
              .map((game) => game.gameYear)
              .sort()
              .uniq()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className="col-md-4">
          <button type="button" className="btn btn-primary" onClick={searchGames}>
            Search Library <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
