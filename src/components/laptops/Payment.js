import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './payment.css';

export const Payment = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="payment-container">
            <div className="cart-total-container">
                <h1>Cart</h1>
                <section className="ordered-details">
                    {currentUser?.cart.map(laptop => <div className="ordered-item" key={laptop.id}>
                        <img src={laptop.image} alt="" />
                        <p>{laptop.title}</p>
                        <p>${laptop.price}</p>
                    </div>)}

                    <div className="ordered-sum">
                        <section className="subtotal">
                            <p>Subtotal</p>
                            <p>$250</p>
                        </section>
                        <section className="shipping">
                            <p>Shipping</p>
                            <p>$10</p>
                        </section>
                        <section className="total">
                            <p>Totol due</p>
                            <p>$250</p>
                        </section>
                    </div>
                </section>
            </div>
            <div className="billing-container">
                <h1>Details</h1>
                <section className="details-container">
                    <form className='auth'>
                        <label htmlFor="email"></label>
                        <input type="text" name="email" placeholder="Email" />
                        <label htmlFor="country"></label>
                        <input type="text" name="country" placeholder='Country' />
                        <label htmlFor="address"></label>
                        <input type="text" name="address" placeholder='Address' />
                        <label htmlFor="postalCode"></label>
                        <input type="text" name="postalCode" placeholder='Postal Code' />
                        <label htmlFor="city"></label>
                        <input type="text" name="city" placeholder='City' />
                        <button>Pay</button>
                    </form>
                </section>
            </div>
        </div>
    );
}