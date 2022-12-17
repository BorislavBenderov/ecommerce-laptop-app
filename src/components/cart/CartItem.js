import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { database } from "../../firebaseConfig";

export const CartItem = ({ laptop }) => {
    const { laptops } = useSelector((store) => store.laptops);
    const currentLaptop = laptops.find(x => x.id === laptop.laptopId);

    const onDeleteCartItem = async () => {
        try {
            await deleteDoc(doc(database, 'users', laptop.id));
        } catch (error) {
            alert(error.message);
        }
    }

    const onIncrease = () => {
        try {
            updateDoc(doc(database, 'users', laptop.id), {
                price: laptop.price + currentLaptop.price,
                quantity: laptop.quantity + currentLaptop.quantity,
            })
        } catch (error) {
            alert(error.message);
        }
    }

    const onDecrease = () => {
        if (laptop.quantity === 1) {
            onDeleteCartItem();
        } else {
            try {
                updateDoc(doc(database, 'users', laptop.id), {
                    price: laptop.price - currentLaptop.price,
                    quantity: laptop.quantity - currentLaptop.quantity,
                })
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="product">
            <img className="cart-product-image" src={laptop.image} alt="" />
            <div className="item-desc">
                <div className="flex top">
                    <h5>{laptop.title}</h5>
                    <h4>${currentLaptop.price}</h4>
                    <button className="maths-btn" onClick={onIncrease}>+</button>
                    <p>{laptop.quantity}</p>
                    <button className="maths-btn" onClick={onDecrease}>-</button>
                    <i className="fa fa-trash" aria-hidden="true" onClick={onDeleteCartItem}></i>
                </div>
            </div>
        </div>
    );
}