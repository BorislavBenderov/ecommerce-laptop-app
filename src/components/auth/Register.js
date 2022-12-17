import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../feautures/user/userSlice';
import { auth } from '../../firebaseConfig';

export const Register = () => {
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        if (email === '' || password === '' || repeatPassword === '') {
            setErr('Please fill all the fields!');
            return;
        }

        if (password !== repeatPassword) {
            setErr('Your password and confirmation password do not match');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userAuth) => {
                        setDoc(doc(database, 'users', userAuth.user.uid), {
                            displayName: userAuth.user.email,
                            uid: userAuth.user.uid
                        });
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid
                        }));
                        navigate('/');
                    })
                    .catch((err) => {
                        setErr(err.message);
                    })
            })
    }

    return (
        <form className='auth' onSubmit={onRegister}>
            <h3>Register Here</h3>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <label htmlFor="repeatPassword"></label>
            <input type="password" placeholder="Repeat Password" id="repeatPassword" name="repeatPassword" />
            <button type="submit">Register</button>
            <p className="errors">{err}</p>
        </form>
    );
}