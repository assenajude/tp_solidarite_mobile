import apiClient from "./http-common";

const authEndpoint = "/auth";

const signup = (username, email, password) => apiClient.post(`${authEndpoint}/signup`,{
    username,
    email,
    password
});

const login = (username, password) => apiClient.post(`${authEndpoint}/login`, {username, password});

export default {
    signup,
    login
}