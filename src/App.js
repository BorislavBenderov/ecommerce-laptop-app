import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Header } from "./components/header/Header";
import { Laptops } from "./components/laptops/Laptops";
import { Routes, Route } from 'react-router-dom';
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
import { FetchData } from "./services/FetchData";

function App() {
  FetchData();

  return (
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
  );
}

export default App;
