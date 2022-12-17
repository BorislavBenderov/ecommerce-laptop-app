import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Cart = () => {
    const { cart } = useSelector((store) => store.cart);
    const loggedUser = useSelector((store) => store.user.user);
    const userCart = cart.filter(user => user.uid === loggedUser.uid);
    const totalPrice = userCart?.reduce((acc, curVal) => acc + Number(curVal.price),
        0);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="product-container">
                {cart?.length > 0
                    ? cart.map(laptop => <CartItem key={laptop.id} laptop={laptop} />)
                    : <>
                        <p>No laptops in the cart!</p>
                        <Link to='/' className="btn">Shop Laptops</Link>
                    </>}
            </div>
            {cart?.length > 0
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