import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";

export const AddToCart = ({ currentLaptop, quantity }) => {
    const { loggedUser } = useContext(AuthContext);

    const addedToCart = () => {
        updateDoc(doc(database, 'users', loggedUser.uid), {
            cart: arrayUnion({
                title: currentLaptop.title,
                quantity: currentLaptop.price * quantity
            })
        })
            .then(() => {
                alert('Added to Cart!');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <button className="add" onClick={addedToCart}>Add to cart</button>
    );
}