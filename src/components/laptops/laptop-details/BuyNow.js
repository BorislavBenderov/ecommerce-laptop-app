import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { database } from "../../../firebaseConfig";

export const BuyNow = ({ currentLaptop }) => {
    const loggedUser = useSelector((store) => store.user.user);
    const navigate = useNavigate();

    const onBuy = () => {
        if (loggedUser) {
            updateDoc(doc(database, 'users', loggedUser.uid), {
                cart: arrayUnion({
                    title: currentLaptop.title,
                    price: currentLaptop.price,
                    id: currentLaptop.id,
                    image: currentLaptop.image
                })
            })
                .then(() => {
                    navigate('/cart');
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            navigate('/login');
        }
    }

    return (
        <button className="buy" onClick={onBuy}>Buy now</button>
    );
}