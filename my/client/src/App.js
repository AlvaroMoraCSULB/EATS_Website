import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from "./Home";
import Files from "./Files";
import Register from "./Register";
import Officers from "./Officers";
import Forum from "./Forum";
import Maps from "./Maps";
import Projects from "./Projects";
import Calendar from "./Calendar";
import Videos from "./Videos";
import VideoPlayer from "./VideoPlayer";
import Donations from "./Donations";
import Analytics from "./Analytics";
import Login from "./Login";
import ItemsPage from "./ItemsPage";
import Profile from "./Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <h1 className="main-title">Embedded Applications Technology Society</h1>
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/files" element={<Files />} />
              <Route path="/officers" element={<Officers />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/videos" element={<Videos />} />
			  <Route path="/videos/:videoId" element={<VideoPlayer />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/analytics" element={<Analytics />} />
			  <Route path="/profile" element={
				  <ProtectedRoute>
					<Profile />
				  </ProtectedRoute> } />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;