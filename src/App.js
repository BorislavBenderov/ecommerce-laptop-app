import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Header } from "./components/header/Header";
import { Laptops } from "./components/laptops/Laptops";
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { LaptopContextProvider } from './contexts/LaptopContext';

function App() {
  return (
    <AuthContextProvider>
      <LaptopContextProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Laptops />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </LaptopContextProvider>
    </AuthContextProvider>
  );
}

export default App;
