import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import Pairs from './components/Pairs';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icons';
import './css/reset.css'

const MainContainer = styled.div`
 
  min-height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;

const Title = styled.h1`
  position: relative;
  top: 37vh;
  font-size: 2em;
  transition: 100ms ease-out;
  &.active {
    top: 8vh
  }
`;

const SearchBar = styled.input`
  border: 1px solid #d8d8d8;
  padding: .5em;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const SearchButton = styled.button`
  color: #808080;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  font-weight: 600;
  font-size:  1em;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;

  &:hover span{
    color: #111;
  }
`

const SearchContainer = styled.div`
position: relative;
top: 40vh;
display: flex;
transition: 100ms ease-out;
&.active {
  top: 10vh;
}
`;

const SearchMessage = styled.p`
  position: relative;
  top: 12vh;

`;

const Span = styled.span`
  margin-left: 5px;
  font-size:  1.2em;
`;


function App() {
  const [players, setPlayers] = useState(null);
  const [input, setInput] = useState('');
  const [pairs, setPairs] = useState([]);
  const searchRef = useRef(null);
  const titleRef = useRef(null);
  const [searchMessage, setSearchMessage] = useState(null);

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

  const fadeUp = () => {
    searchRef.current.classList.add('active');
    titleRef.current.classList.add('active');
  }

  const handleButtonClick = (e) => {
    if((e.type) === 'click' || (e.key) === 'Enter') {
      let foundMatches = false;
      setPairs([]);
      fadeUp();
      const hash = {};
      for(let i in players) {
      
        let matchPlayerHeight = input - parseInt(players[i].h_in, 10);
  
        if(matchPlayerHeight in hash) {
          foundMatches = true;
          setPairs((state) => {
            return [...state, [hash[matchPlayerHeight], players[i]]]
          });
        }
       
        hash[parseInt(players[i].h_in, 10)] = players[i];
      }
  
      if(foundMatches){
        setSearchMessage(`Result for pairs of players whose height adds up to ${input} inches`);
      }else {
        setSearchMessage(`Sorry, there were no matches for ${input} inches pair of players.`);
      }
    }
  };

  return (
    <MainContainer>
      <Title ref={titleRef}>NBA Player heights</Title>
      <SearchContainer ref={searchRef}>
        <SearchBar 
        onKeyPress={handleButtonClick} 
        placeholder="Input target height" 
        min={0} 
        value={input} 
        type="number" 
        onChange={handleChange}/>
        <SearchButton type="button" onClick={handleButtonClick} >
          <FontAwesomeIcon icon="search"/>
          <Span>Search</Span>
        </SearchButton>
      </SearchContainer>

      {
        searchMessage && 
          <SearchMessage>{searchMessage}</SearchMessage>
      }
      {
        pairs.length >  0 && 
        <Pairs list={pairs}/>
      }
    </MainContainer>
  );
}

export default App;
