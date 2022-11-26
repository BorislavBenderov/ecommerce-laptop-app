import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Header } from "./components/header/Header";
import { Laptops } from "./components/laptops/Laptops";
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { LaptopContextProvider } from './contexts/LaptopContext';
import { UserContextProvider } from "./contexts/UserContext";
import { LaptopDetails } from "./components/laptops/laptop-details/LaptopDetails";
import { Cart } from "./components/laptops/Cart";
import { Create } from "./components/admin/Create";
import { Edit } from "./components/admin/Edit";
import { Payment } from "./components/laptops/Payment";
import { Purchase } from "./components/laptops/Purchase";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <LaptopContextProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Laptops />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/create" element={<Create />} />
              <Route path="/details/:laptopId" element={<LaptopDetails />} />
              <Route path="/edit/:laptopId" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </LaptopContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
