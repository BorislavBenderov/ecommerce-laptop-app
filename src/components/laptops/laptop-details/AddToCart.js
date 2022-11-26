import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";
import toast, { Toaster } from 'react-hot-toast';

export const AddToCart = ({ currentLaptop }) => {
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const addedToCart = () => {
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
                    toast.success(`${currentLaptop.title} added to cart!`);
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            navigate('/login');
        }

    }

    return (
        <>
            <button className="add" onClick={addedToCart}>Add to cart</button>
            <Toaster />
        </>
    );
}