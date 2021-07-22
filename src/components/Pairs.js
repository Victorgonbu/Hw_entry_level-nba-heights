import Pair from './Pair';

const Pairs = (props) => {
    const {list} = props
  
    return(
        <div className='pairs'>
            {
                list.map((pair, index) => {
                    return <Pair key={pair + index} list={pair} />
                })
            }
        </div>
    );
};

export default Pairs;