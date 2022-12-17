import { deleteDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebaseConfig';
import { PaymentCard } from './PaymentCard';

export const Payment = () => {
    const loggedUser = useSelector((store) => store.user.user);
    const { cart } = useSelector((store) => store.cart);
    const userCart = cart.filter(user => user.uid === loggedUser.uid);
    const totalPrice = userCart?.reduce((acc, curVal) => acc + Number(curVal.price),
        0);
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

        try {
            userCart.forEach((user) => {
                deleteDoc(doc(database, 'users', user.id));
            })
            navigate('/purchase')
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className="payment-container">
            <div className="cart-total-container">
                <h1>Cart</h1>
                <section className="ordered-details">
                    {userCart?.map(laptop => <PaymentCard key={laptop.id} laptop={laptop}/>)}

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
                <h1>Billing Details</h1>
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