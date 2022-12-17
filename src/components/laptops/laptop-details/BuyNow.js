import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { database } from "../../../firebaseConfig";

export const BuyNow = ({ currentLaptop }) => {
    const loggedUser = useSelector((store) => store.user.user);
    const { cart } = useSelector((store) => store.cart);
    const isIncluding = cart.find(user => user.uid === loggedUser?.uid && user.title === currentLaptop.title);
    const navigate = useNavigate();

    const onBuy = () => {
        if (loggedUser) {
            if (isIncluding) {
                navigate('/cart');
            } else {
                addDoc(collection(database, 'users'), {
                    title: currentLaptop.title,
                    price: Number(currentLaptop.price),
                    quantity: Number(currentLaptop.quantity),
                    laptopId: currentLaptop.id,
                    uid: loggedUser.uid,
                    image: currentLaptop.image
                })
                    .then(() => {
                        navigate('/cart');
                    })
                    .catch((err) => {
                        alert(err.message);
                    })
            }
        } else {
            navigate('/login');
        }
    }

    return (
        <button className="buy" onClick={onBuy}>Buy now</button>
    );
}