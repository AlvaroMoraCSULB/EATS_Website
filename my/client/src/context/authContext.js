import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isOfficer, setIsOfficer] = useState(localStorage.getItem('isOfficer') === 'true' || false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }  // Important for cookies if using them
      );
      
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('isOfficer', response.data.is_officer);
      setToken(response.data.token);
      setIsOfficer(response.data.is_officer);
      
      // Fetch user profile immediately after login
      await verifyToken(response.data.token);
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isOfficer');
    setToken(null);
    setIsOfficer(false);
    setUser(null);
    navigate('/login');
  };

const verifyToken = async () => {
  try {
    if (token) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/profile`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setUser(response.data.user); // Now matches backend response
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    logout();
  }
};

  useEffect(() => {
    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isOfficer, 
      login, 
      logout,
      verifyToken  // Expose for manual verification if needed
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);