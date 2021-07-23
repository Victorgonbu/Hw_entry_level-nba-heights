import PropTypes from 'prop-types';
import Player from './Player';
import { flex, pair } from '../css/App.module.css';

const Pair = (props) => {
  const { list } = props;

  return (
    <div className={`${pair} ${flex}`}>
      {
                list.map((player, index) => {
                  const key = player.first_name + index;
                  return (
                    <Player
                      key={key}
                      value={player}
                    />
                  );
                })
            }
    </div>
  );
};

Pair.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Pair;
