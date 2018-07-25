import axios from 'axios';
import Auth from "./components/Utilities/Auth"


export default {
    setupInterceptors: () => {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            const originalRequest = error.config;
            // token expired
            if (error.response.status === 401 && error.response.data.error === "invalid_grant") {
                originalRequest._retry = true;
                return Auth.refreshToken(originalRequest)
            }
            return Promise.reject(error);
        });

    }
};