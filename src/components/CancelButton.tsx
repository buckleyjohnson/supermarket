
import { sprinkles } from '../styles/sprinkles.css';
export default function Button() {
    return <button className={sprinkles({
        background: 'brand',
    })}
    >Buy Now</button>

}