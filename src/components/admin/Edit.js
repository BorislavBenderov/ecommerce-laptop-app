import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../firebaseConfig";

export const Edit = () => {
    const { currentLaptop } = useSelector((state) => state.laptops);
    const [err, setErr] = useState('');
    const { laptopId } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        title: currentLaptop.title,
        description: currentLaptop.description,
        price: currentLaptop.price,
        image: currentLaptop.image
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const price = Number(formData.get('price'));
        const image = formData.get('imageUrl');

        if (title === '' || description === '' || price === '' || image === '') {
            setErr('Please fill all fields!');
            return;
        }

        if (price !== Number(price)) {
            setErr('Please add a number for price!');
            return;
        }

        const laptopData = {
            title,
            description,
            price,
            image,
            quantity: 1
        };

        updateDoc(doc(database, 'laptops', laptopId), laptopData)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                setErr(err.message);
            })
    }

    return (
        <form className="auth" onSubmit={onEdit}>
            <h3>Edit Post</h3>
            <label htmlFor="title"></label>
            <textarea type="text" placeholder="Title" id="title" name="title" value={values.title} onChange={changeHandler} />
            <label htmlFor="description"></label>
            <textarea type="text" placeholder="Description" id="description" name="description" value={values.description} onChange={changeHandler} />
            <label htmlFor="price"></label>
            <textarea type="text" placeholder="Price" id="price" name="price" value={values.price} onChange={changeHandler} />
            <label htmlFor="imageUrl"></label>
            <input type="text" placeholder="Image" id="imageUrl" name="imageUrl" value={values.image} onChange={changeHandler} />
            <button type="submit">Edit</button>
            <p className="errors">{err}</p>
        </form>
    );
}