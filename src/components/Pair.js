import Player from './Player';
import {flex, pair} from '../css/App.module.css';

const Pair = (props) => {
    const {list} = props;
    
    return(
        <div className={`${pair} ${flex}`}>
            {
                list.map((player, index)=> {
                    return <Player 
                    key={player.first_name + index} 
                    value={player}/>
                })
            }
        </div>
    );
};

export default Pair;