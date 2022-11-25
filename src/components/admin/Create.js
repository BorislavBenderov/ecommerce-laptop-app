import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebaseConfig";

export const Create = () => {
    const navigate = useNavigate();

    const onCreate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const image = formData.get('imageUrl');

        if (title === '' || description === '' || price === '' || image === '') {
            alert('Please fill all fields!');
            return;
        }

        const laptopData = {
            title,
            description,
            price,
            image
        };

        addDoc(collection(database, 'laptops'), laptopData)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <form className="auth" onSubmit={onCreate}>
            <h3>Create Post</h3>
            <label htmlFor="title"></label>
            <textarea type="text" placeholder="Title" id="title" name="title" />
            <label htmlFor="description"></label>
            <textarea type="text" placeholder="Description" id="description" name="description" />
            <label htmlFor="price"></label>
            <textarea type="text" placeholder="Price" id="price" name="price" />
            <label htmlFor="imageUrl"></label>
            <input type="text" placeholder="Image" id="imageUrl" name="imageUrl" />
            <button type="submit">Create</button>
        </form>
    );
}