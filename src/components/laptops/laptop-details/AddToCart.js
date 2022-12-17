import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database } from "../../../firebaseConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";

export const AddToCart = ({ currentLaptop }) => {
    const loggedUser = useSelector((store) => store.user.user);
    const { cart } = useSelector((store) => store.cart);
    const navigate = useNavigate();
    const isIncluding = cart.find(user => user.uid === loggedUser?.uid && user.title === currentLaptop.title);

    const addedToCart = () => {
        if (loggedUser) {
            if (isIncluding) {
                updateDoc(doc(database, 'users', isIncluding.id), {
                    price: isIncluding.price + Number(currentLaptop.price),
                    quantity: isIncluding.quantity + Number(currentLaptop.quantity),
                })
                    .then(() => {
                        console.log('updated')
                    })
                    .catch((err) => {
                        alert(err.message);
                    })
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
                        toast.success(`${currentLaptop.title} added to cart!`);
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
        <>
            <button className="add" onClick={addedToCart}>Add to cart</button>
            <Toaster />
        </>
    );
}