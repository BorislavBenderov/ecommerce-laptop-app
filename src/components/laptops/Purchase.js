import { Link, useNavigate } from "react-router-dom";

export const Purchase = () => {
    const navigate = useNavigate();
    return (
        <div className="purchase">
            <i class="fa fa-shopping-bag fa-lg" aria-hidden="true"></i>
            <h2>Thank You For Your Order!</h2>
            <Link to='/' className="btn">Continue Shopping</Link>
        </div>
    );
}