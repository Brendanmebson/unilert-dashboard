import axios from 'axios';

const API_URL = 'http://localhost:5000/api/incidents';

// Get all incidents
const getIncidents = async () => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return [...mockIncidents]; // Return a copy to prevent reference issues
  }

  const response = await axios.get(API_URL);
  return response.data;
};

// Get incident by ID
const getIncidentById = async (id) => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    const incident = mockIncidents.find(inc => inc.id === id);
    return incident ? { ...incident } : null; // Return a copy
  }

  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update incident status
const updateIncidentStatus = async (id, status) => {
  // For development, update mock data
  if (process.env.NODE_ENV === 'development') {
    const incidentIndex = mockIncidents.findIndex(inc => inc.id === id);
    
    if (incidentIndex !== -1) {
      // Create a new array of incidents with the updated one
      mockIncidents = mockIncidents.map(incident => 
        incident.id === id ? { ...incident, status } : incident
      );
      
      // Return a copy of the updated incident
      return { ...mockIncidents[incidentIndex] };
    }
    return null;
  }

  const response = await axios.patch(`${API_URL}/${id}`, { status });
  return response.data;
};

// Mock data for development - with Babcock coordinates
let mockIncidents = [
  {
    id: '1',
    type: 'Theft',
    description: 'Laptop stolen from University library',
    location: 'Main Library, 2nd Floor',
    coordinates: { lat: 6.8937, lng: 3.7182 }, // University library (approximate)
    reportedBy: {
      name: 'John Smith',
      matricNumber: 'BU/21/CS/0123',
      phoneNumber: '08012345678',
      course: 'Computer Science',
      department: 'Science and Technology'
    },
    isAnonymous: false,
    hasImage: true,
    imagePath: '/incidents/theft.jpg',
    reportedAt: '2025-03-05T09:30:00Z',
    status: 'pending',
    priority: 'high',
    assignedOfficers: [],
  },
  {
    id: '2',
    type: 'Harassment',
    description: 'Verbal harassment near female dormitory',
    location: 'Female Hostel C, Entrance',
    coordinates: { lat: 6.8917, lng: 3.7152 }, // Dormitory area (approximate)
    reportedBy: {
      name: 'Anonymous',
    },
    isAnonymous: true,
    hasImage: false,
    reportedAt: '2025-03-05T08:45:00Z',
    status: 'in-progress',
    priority: 'high',
    assignedOfficers: [
      {
        id: 101,
        name: 'Officer James',
        status: 'en-route',
        estimatedArrival: '5 mins',
      },
    ],
  },
  {
    id: '3',
    type: 'Medical',
    description: 'Student fainted in classroom',
    location: 'Science Building, Room 201',
    coordinates: { lat: 6.8947, lng: 3.7162 }, // Science building (approximate)
    reportedBy: {
      name: 'Sarah Johnson',
      matricNumber: 'BU/22/BIO/0567',
      phoneNumber: '08098765432',
      course: 'Biology',
      department: 'Science and Technology'
    },
    isAnonymous: false,
    hasImage: true,
    imagePath: '/incidents/medical.jpg',
    reportedAt: '2025-03-05T10:15:00Z',
    status: 'in-progress',
    priority: 'medium',
    assignedOfficers: [
      {
        id: 102,
        name: 'Medical Team A',
        status: 'on-site',
        estimatedArrival: null,
      },
    ],
  },
  {
    id: '4',
    type: 'Vandalism',
    description: 'Graffiti on lecture hall wall',
    location: 'Arts Building, Lecture Hall 3',
    coordinates: { lat: 6.8907, lng: 3.7192 },
    reportedBy: {},
    isAnonymous: true,
    hasImage: false,
    reportedAt: '2025-03-04T16:20:00Z',
    status: 'pending',
    priority: 'low',
    assignedOfficers: [],
  },
  {
    id: '5',
    type: 'Fire',
    description: 'Small fire in kitchen area',
    location: 'Student Center, Kitchen',
    coordinates: { lat: 6.8957, lng: 3.7142 },
    reportedBy: {
      name: 'Michael Brown',
      phoneNumber: '08087654321'
      // Note: No matric number, course or department
    },
    isAnonymous: false,
    hasImage: true,
    imagePath: '/incidents/fire.jpg',
    reportedAt: '2025-03-03T10:05:00Z',
    status: 'resolved',
    priority: 'high',
    assignedOfficers: [],
  }
];

const incidentService = {
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
};

export default incidentService;