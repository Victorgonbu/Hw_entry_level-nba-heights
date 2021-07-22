import {useEffect} from 'react';
import Pair from './Pair';
import {pairs, flex} from '../css/App.module.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Pairs = (props) => {
    const {list} = props
    useEffect(() => {
        AOS.init();
    }, []);
    return(
        <div 
        className={`${pairs} ${flex}`}
        data-aos="fade-down" 
        data-aos-delay="100"
        >
            {
                list.map((pair, index) => {
                    return <Pair key={pair + index} list={pair} />
                })
            }
        </div>
    );
};

export default Pairs;