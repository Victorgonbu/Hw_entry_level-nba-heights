import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import PropTypes from 'prop-types';
import Pair from './Pair';
import { pairs, flex } from '../css/App.module.css';

const Pairs = (props) => {
  const { list } = props;
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className={`${pairs} ${flex}`}
      data-aos="fade-down"
      data-aos-delay="100"
    >
      {
                list.map((pair, index) => {
                  const key = pair + index;
                  return <Pair key={key} list={pair} />;
                })
            }
    </div>
  );
};

Pairs.propTypes = {
  list: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Pairs;
