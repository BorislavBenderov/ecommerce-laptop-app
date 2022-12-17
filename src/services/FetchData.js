import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../feautures/user/userSlice";
import { getAllLaptops } from "../feautures/laptops/laptopSlice";
import { getCartItems } from "../feautures/cart/cartSlice";
import { database, auth } from '../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";

export const FetchData = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(collection(database, 'laptops'), (snapshot) => {
      dispatch(getAllLaptops(snapshot.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })));
    });
  }, [dispatch]);

  useEffect(() => {
    onSnapshot(collection(database, 'users'), (snapshot) => {
      dispatch(getCartItems(snapshot.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })));
    })
  }, [dispatch]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid
        }));
      } else {
        dispatch((logout()));
      }
    });

    return () => {
      unsub();
    }
  }, [dispatch]);
}