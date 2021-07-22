import axios from 'axios';
import {useEffect, useState} from 'react';
import Pairs from './components/Pairs';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icons';
import './css/reset.css'
import backgroundImage from './assets/imgs/background.jpg';

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: whitesmoke;
  border: 1px solid red;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
`;

const SearchBar = styled.input`
  border: 1px solid red;
`;

const SearchButton = styled.button`
  background-color: red;
`

const SearchContainer = styled.div`
padding-top: 3em;
`;


function App() {
  const [players, setPlayers] = useState(null);
  const [input, setInput] = useState('');
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      const playersRequest = await axios.get('https://mach-eight.uc.r.appspot.com/');
      const sortedPlayersList = playersRequest.data.values.sort((a, b) => {
        return  parseInt(a.h_in ,10) - parseInt(b.h_in ,10);
      })
      setPlayers(sortedPlayersList);
    }
    if(!players) {
      fetchPlayers();
    }
    
  },[players]);


  const handleChange = (e) => {
    let currentInput = parseInt(e.target.value, 10)
    setInput(currentInput);
  };

  const handleButtonClick = () => {
    setPairs([]);
    const hash = {};
    for(let i in players) {
    
      let matchPlayerHeight = input - parseInt(players[i].h_in, 10);

      if(matchPlayerHeight in hash) {
        setPairs((state) => {
          return [...state, [hash[matchPlayerHeight], players[i]]]
        });
      }
     
      hash[parseInt(players[i].h_in, 10)] = players[i];
    }
  };

  return (
    <MainContainer>
      <SearchContainer>
        <SearchBar value={input} type="number" onChange={handleChange}/>
        <SearchButton type="button" onClick={handleButtonClick} >
          <FontAwesomeIcon icon="search"/>
          <span>Search</span>
        </SearchButton>
      </SearchContainer>
      {
        pairs.length >  0 && 
        <Pairs list={pairs}/>
      }
    </MainContainer>
  );
}

export default App;
