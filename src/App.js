import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Header } from "./components/header/Header";
import { Laptops } from "./components/laptops/Laptops";
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { LaptopContextProvider } from './contexts/LaptopContext';
import { UserContextProvider } from "./contexts/UserContext";
import { LaptopDetails } from "./components/laptops/laptop-details/LaptopDetails";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <LaptopContextProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Laptops />} />
              <Route path="/details/:laptopId" element={<LaptopDetails />} />
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
