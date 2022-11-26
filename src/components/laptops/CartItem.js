import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { database } from "../../firebaseConfig";

export const CartItem = ({ laptop }) => {
    const [quantity, setQuantity] = useState(1);
    const { currentUser } = useContext(UserContext);

    const minus = () => {
        if (quantity < 2) {
            return;
        }
        setQuantity(state => state -= 1);
    }

    const plus = () => {
        setQuantity(state => state += 1);
    }

    const onDeleteCartItem = async () => {
        await updateDoc(doc(database, 'users', currentUser.uid), {
            cart: arrayRemove(laptop)
        })
    }

    return (
        <div className="product">
            <img className="cart-product-image" src={laptop.image} alt="" />
            <div className="item-desc">
                <div className="flex top">
                    <h5>{laptop.title}</h5>
                    <h4>${laptop.price}</h4>
                    <button onClick={onDeleteCartItem}>x</button>
                </div>
                <div className="flex bottom">
                    <div>
                        <div className="quntity-metrics">
                            <span className="minus" onClick={minus}>-</span>
                            <p className="number">{quantity}</p>
                            <span className="plus" onClick={plus}>+</span>
                        </div>
                    </div>
                    <button className="remove-item"></button>
                </div>
            </div>
        </div>
    );
}