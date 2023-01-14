import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../feautures/user/userSlice";
import { auth } from "../../firebaseConfig";

export const Login = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      setErr("Please fill all the fields!");
      return;
    }
    setLoading(true);
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
            })
          );
          navigate("/");
          setLoading(false);
        })
        .catch((err) => {
          setErr(err.message);
          setLoading(false);
        });
    });
  };

  return (
    <form className="auth" onSubmit={onLogin}>
      <h3>Login Here</h3>
      <label htmlFor="email"></label>
      <input type="text" placeholder="Email" id="email" name="email" />
      <label htmlFor="password"></label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        name="password"
      />
      <button type="submit">{loading ? 'Loading...' : 'Log In'}</button>
      <p className="errors">{err}</p>
    </form>
  );
};
