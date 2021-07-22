import {player} from '../css/App.module.css';

const Player = (props) => {
    const {value: {first_name, h_in, h_meters, last_name}} = props;
    
    return(
        <div className={player}>
            <h1>NBA Player</h1>
            <div className="name">
                <h2>Name:</h2>
                <span>{first_name}</span>
                <span>{last_name}</span>
            </div>
            <div className="height">
                <h2>Height:</h2>
                <span> {h_in}</span>
                <span>{h_meters}</span>
            </div>
        </div>
    );

};

export default Player;