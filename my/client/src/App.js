import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./Home";
import Files from "./Files";
import Register from "./Register";
import Officers from "./Officers";
import Forum from "./Forum";
import Maps from "./Maps";
import Projects from "./Projects";
import Calendar from "./Calendar";
import Videos from "./Videos";
import Donations from "./Donations";
import './App.css';
import Analytics from "./Analytics";
import Login from "./Login";
import ItemsPage from "./ItemsPage"; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/files" element={<Files />} />
			  <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/officers" element={<Officers />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;