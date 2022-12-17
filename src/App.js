import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Header } from "./components/header/Header";
import { Laptops } from "./components/laptops/Laptops";
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from "./contexts/UserContext";
import { LaptopDetails } from "./components/laptops/laptop-details/LaptopDetails";
import { Cart } from "./components/cart/Cart";
import { Create } from "./components/admin/Create";
import { Edit } from "./components/admin/Edit";
import { Payment } from "./components/payment/Payment";
import { Purchase } from "./components/payment/Purchase";
import { NotFound } from "./components/not-found/NotFound";
import { ProtectedRoutes } from './protected-routes/ProtectedRoutes';
import { ProtectedAdminRoutes } from './protected-routes/ProtectedAdminRoutes';
import { Footer } from "./components/footer.js/Footer";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./feautures/user/userSlice";
import { auth } from "./firebaseConfig";
import { getLaptops } from "./feautures/laptops/laptopSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLaptops());
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid
        }));
      } else {
        dispatch((logout()));
      }
    })
  }, []);

  return (
    <UserContextProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
            <Route element={<ProtectedAdminRoutes />}>
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:laptopId" element={<Edit />} />
            </Route>
            <Route path="/" element={<Laptops />} />
            <Route path="/details/:laptopId" element={<LaptopDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
    </UserContextProvider>
  );
}

export default App;
