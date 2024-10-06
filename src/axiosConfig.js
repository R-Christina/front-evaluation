import axios from 'axios';

// Create an instance for authentication
const authInstance = axios.create({
  baseURL: 'http://localhost:5163/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an instance for period management
const periodeInstance = axios.create({
  baseURL: 'http://localhost:5191/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Create an instance for formulaire management
const formulaireInstance = axios.create({
  baseURL: 'http://localhost:5166/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const collabInstance = axios.create({
  baseURL: 'http://localhost:5051/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { authInstance, periodeInstance, formulaireInstance, collabInstance };