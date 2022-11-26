import { Link } from "react-router-dom";

export const Purchase = () => {

    return (
        <div className="purchase">
            <i className="fa fa-shopping-bag fa-lg" aria-hidden="true"></i>
            <h2>Thank You For Your Order!</h2>
            <Link to='/' className="btn">Continue Shopping</Link>
        </div>
    );
}