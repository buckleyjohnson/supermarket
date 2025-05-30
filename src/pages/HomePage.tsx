import Button from "../components/Button";
import CancelButton from "../components/CancelButton";
import ProductCard from "../components/ProductCard";



export default function HomePage(){
    return(
        <div>
        <h3>This is the SuperMarket home page.</h3>
        <Button /><br />
        <CancelButton /><br />

        <ProductCard />
        </div>
    )
}