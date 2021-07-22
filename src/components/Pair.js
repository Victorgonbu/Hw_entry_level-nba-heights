import Player from './Player';

const Pair = (props) => {
    const {list} = props;
    
    return(
        <div className="pair">
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