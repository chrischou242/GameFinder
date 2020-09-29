import React, {useEffect, useState} from 'react';
import AllGames from './views/allGames'
import GameDetails from './views/GameDetails'


import './App.css';
import {Router, Link, navigate} from '@reach/router'
import Axios from 'axios';




function App() {
  const [game, setGame]=useState([])
  const [search, setSearch]=useState([])
  
  

  return (
    <div className="App">
      
       {/* <form >
      <label>Search by: </label>
            <select name="searchBy">
              <option value="title">Title</option>
              <option value="genre">Genre</option>
              <option value="rating">Rating</option>
            </select>
            <input type="text" onChange={e=>setSearch(e.target.value)}/>
            <button  >Search!</button>
      </form> */}
      
            <Router>
              <AllGames path="/" game={game}/>
              <GameDetails path="/details/:id"/>
              
            </Router>
    </div>
  );
}

export default App;
