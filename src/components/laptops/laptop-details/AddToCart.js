import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";

export const AddToCart = ({ currentLaptop }) => {
    const { loggedUser } = useContext(AuthContext);

    const addedToCart = () => {
        updateDoc(doc(database, 'users', loggedUser.uid), {
            cart: arrayUnion({
                title: currentLaptop.title,
                price: currentLaptop.price,
                id: currentLaptop.id,
                image: currentLaptop.image
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