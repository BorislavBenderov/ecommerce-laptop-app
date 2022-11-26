import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { database } from '../../firebaseConfig';

export const Payment = () => {
    const { currentUser, totalPrice } = useContext(UserContext);
    const navigate = useNavigate();

    const onPay = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const country = formData.get('country');
        const address = formData.get('address');
        const postalCode = formData.get('postalCode');
        const city = formData.get('city');

        if (email === '' || country === '' || address === '' || postalCode === '' || city === '') {
            alert("Please fill all fields!");
            return;
        }

        updateDoc(doc(database, 'users', currentUser.uid), {
            cart: deleteField()
        })
        .then(() => {
            navigate('/purchase');
        })
        .catch((err) => {
            alert(err.message);
        })
    }
    return (
        <div className="payment-container">
            <div className="cart-total-container">
                <h1>Cart</h1>
                <section className="ordered-details">
                    {currentUser?.cart?.map(laptop => <div className="ordered-item" key={laptop.id}>
                        <img src={laptop.image} alt="" />
                        <p>{laptop.title}</p>
                        <p>${laptop.price}</p>
                    </div>)}

                    <div className="ordered-sum">
                        <section className="subtotal">
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </section>
                        <section className="shipping">
                            <p>Free Shipping</p>
                            <p>$0</p>
                        </section>
                        <section className="total">
                            <p>Total due</p>
                            <p>${totalPrice}</p>
                        </section>
                    </div>
                </section>
            </div>
            <div className="billing-container">
                <h1>Details</h1>
                <section className="details-container">
                    <form className='payment' onSubmit={onPay}>
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