import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../feautures/user/userSlice";

export const Login = () => {
    const dispatch = useDispatch();
    const [err, setErr] = useState('');
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        if (email === '' || password === '') {
            setErr('Please fill all the fields!');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userAuth) => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                        }))
                        navigate('/');
                    })
                    .catch((err) => {
                        setErr(err.message);
                    })
            })
    }

    return (
        <form className='auth' onSubmit={onLogin}>
            <h3>Login Here</h3>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <button type="submit">Log In</button>
            <p className="errors">{err}</p>
        </form>
    );
}