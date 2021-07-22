import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {
  const [players, setPlayers] = useState(null);
  const [input, setInput] = useState('');
  const [pairs, setPairs] = useState([]);

  useEffect(async() => {
    if(!players) {
     const playersRequest = await axios.get('https://mach-eight.uc.r.appspot.com/');
     const playersSorted = playersRequest.data.values.sort((a, b) => {
       return parseInt(a.h_in ,10) - parseInt(b.h_in ,10);
     });
     setPlayers(playersSorted);
    }
    
  }, []);

  useEffect(() => {
    console.log(pairs)
  }, [pairs]);

  const handleChange = (e) => {
    let currentInput = parseInt(e.target.value, 10)
    setInput(currentInput);
  };



  const handleButtonClick = () => {
    const hash = {};
    for(let i in players) {
    
      let matchPlayerHeight = input - parseInt(players[i].h_in, 10);

      if(matchPlayerHeight in hash) {
        setPairs((state) => {
          return [... state, [hash[matchPlayerHeight], players[i]]]
        });
      }
     
      hash[parseInt(players[i].h_in, 10)] = players[i];
    }
  };

  return (
    <div className="App">
      <input value={input} type="number" onChange={handleChange}/>
      <button type="button" onClick={handleButtonClick} >Search</button>

      {
        pairs && 

          pairs.map((pair) => {
            return(
            <div className="pair">
              <p className="first">
                <span>{pair[0].first_name}</span>
                <span>{pair[0].last_name}</span>
                <span>height in inches {pair[0].h_in}</span>
                <span>height in meters {pair[0].h_meters}</span>
              </p>
              <p className="second">
                <span>{pair[1].first_name}</span>
                <span>{pair[1].last_name}</span>
                <span>height in inches {pair[1].h_in}</span>
                <span>height in meters {pair[1].h_meters}</span>
              </p>
            </div>
            )
          })
      }
    </div>
  );
}

export default App;
