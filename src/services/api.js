// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia esto por tu URL real

interface LoginData {
[key: string]: string;
}

interface LoginResponse {
data: {
    id: string;
    email: string;
    name: string;
    token?: string;
    // Agrega aquí los campos que tu API devuelve
};
}

export const loginUser = async (formData: LoginData): Promise<LoginResponse> => {
try {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
} catch (error) {
    console.error('Error en login:', error);
    throw error;
}
};