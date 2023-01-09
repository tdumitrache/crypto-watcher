import axiosInstance from 'config/axios';

const API_URL = '/users';

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });

  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get(`${API_URL}/profile`);

  return response.data;
};
