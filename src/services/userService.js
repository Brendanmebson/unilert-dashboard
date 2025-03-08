import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Get all users
const getUsers = async () => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return mockUsers;
  }

  const response = await axios.get(API_URL);
  return response.data;
};

// Mock data for development
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'security',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'security',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '5',
    name: 'Charles Wilson',
    email: 'charles.wilson@example.com',
    role: 'security',
    status: 'active',
  },
];

const userService = {
  getUsers,
};

export default userService;