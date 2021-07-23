import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  player, flex, playerIcon, prop,
} from '../css/App.module.css';

const Player = (props) => {
  const {
    value: {
      first_name, h_in, h_meters, last_name,
    },
  } = props;

  return (
    <div className={`${player} ${flex}`}>
      <FontAwesomeIcon className={playerIcon} icon="user" />
      <div>
        <div className={prop}>
          <h2>Name:</h2>
          <span>
            {first_name}
            {' '}
          </span>
          <span>{last_name}</span>
        </div>
        <div className={prop}>
          <h2>Height:</h2>
          <span>
            {h_in}
            ″
          </span>
          /
          <span>
            {h_meters}
            {' '}
            m
          </span>

        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  value: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Player;
