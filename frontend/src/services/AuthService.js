import axiosInstance from "./axiosInstance";

export const register = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};
