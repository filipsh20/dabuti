import styles from "../styles/Home.module.css";

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, selectCount } from '../context/store';

function Home() {
    const dispatch = useDispatch();
    const count = useSelector(selectCount);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    )
}

export default Home