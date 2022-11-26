import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const { currentUser, totalPrice } = useContext(UserContext);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="product-container">
                {currentUser?.cart?.length > 0
                    ? currentUser.cart.map(laptop => <CartItem key={laptop.id} laptop={laptop} />)
                    : <>
                        <p>No laptops in the cart!</p>
                        <Link to='/' className="btn">Shop Laptops</Link>
                    </>}
            </div>
            {currentUser?.cart?.length > 0
                ? <div className="cart-bottom">
                    <div className="total">
                        <h3>Subtotal:</h3>
                        <h3>${totalPrice}</h3>
                    </div>
                    <div className="btn-container">
                        <Link to="/payment" className="btn">Pay</Link>
                    </div>
                </div>
                : ''}
        </div>
    );
}