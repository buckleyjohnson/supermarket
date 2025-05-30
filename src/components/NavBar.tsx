import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <>
        <div>
            SuperMarket
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products_page">Products</Link></li>
            
            </ul>
        </div>
        </>
    )
}