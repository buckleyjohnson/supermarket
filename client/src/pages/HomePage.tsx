import { Link } from "react-router-dom";
import Button from "../components/Button";
import CancelButton from "../components/CancelButton";
import ProductCard from "../components/ProductCard";



export default function HomePage(){
    return(
        <div>
        <h3>Welcome to the SuperMarket home page!</h3>
        <Button /><br />
        <CancelButton /><br />

        {/* <ProductCard /> */}
        <Link to='/checkout_page'>
        <button type="button" className="btn btn-primary">Checkout</button>
        </Link>
        <Link to='/inventory_management_page'>
        <button type="button" className="btn btn-secondary">Inventory Management</button>
        </Link>
        </div>
    )
}