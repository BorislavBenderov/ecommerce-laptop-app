import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";

export const BuyNow = ({ currentLaptop }) => {
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onBuy = () => {
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
    }

    return (
        <button className="buy" onClick={onBuy}>Buy now</button>
    );
}