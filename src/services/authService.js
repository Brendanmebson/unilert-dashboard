import axios from 'axios';

const API_URL = 'http://localhost:5000/api/security';

// Login user
const login = async (userData) => {
  // For development, we'll simulate a successful login
  if (process.env.NODE_ENV === 'development') {
    const mockUser = {
      id: '1',
      name: 'Security Admin',
      email: userData.email,
      role: 'admin',
      token: 'mock-jwt-token',
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  }

  const response = await axios.post(`${API_URL}/login`, userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;