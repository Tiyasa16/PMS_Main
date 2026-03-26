import axios from "axios";

const API_URL = "https://pms-l909.onrender.com/api/v1/projects";

export const createProject = async (projectData) => {
    try {
        const token = localStorage.getItem("accessToken"); // Change from "token" to "accessToken"

        const response = await axios.post(
            API_URL,
            projectData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Create Project Error:", error.response?.data || error.message);
        throw error;
    }
};
export const getAllProjects = async (page = 1, limit = 10) => {
    try {
        const token = localStorage.getItem("accessToken");
        console.log("Token for getAllProjects:", token ? "Token exists" : "No token found");
        console.log("Making API call to:", `${API_URL}?page=${page}&limit=${limit}`);

        const response = await axios.get(
            `${API_URL}?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("API Response status:", response.status);
        console.log("API Response data:", response.data);

        return response.data;
    } catch (error) {
        console.error("Get Projects Error:", error.response?.data || error.message);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
        throw error;
    }
};
export const getProjectById = async (projectId) => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
            `${API_URL}/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Get Project Error:", error.response?.data || error.message);
        throw error;
    }
};
export const deleteProject = async (projectId) => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.delete(
            `${API_URL}/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Delete Project Error:", error.response?.data || error.message);
        throw error;
    }
};
export const updateProject = async (projectId, projectData) => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.put(
            `${API_URL}/${projectId}`,
            projectData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Update Project Error:", error.response?.data || error.message);
        throw error;
    }
};