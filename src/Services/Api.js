import axios from 'axios';

const API_URL = 'http://localhost:4000';

// Ejemplo de una petición GET para obtener datos
export const getData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/ruta`, {
      headers: {
        Authorization: `Bearer ${token}`, // Autenticación con Auth0
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

// Ejemplo de una petición POST para crear un recurso
export const createData = async (token, data) => {
  try {
    const response = await axios.post(`${API_URL}/ruta`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating data', error);
  }
};