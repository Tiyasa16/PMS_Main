import axios from "axios";

const API_URL = "https://pms-l909.onrender.com/api/v1/auth";

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { accessToken, refreshToken } = response.data.data;

    // Save tokens
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};