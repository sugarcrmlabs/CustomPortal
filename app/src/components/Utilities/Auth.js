import Cookies from 'universal-cookie';
import axios from 'axios'

const cookies = new Cookies();

const Auth = {
    isAuthenticated() {
        return (typeof cookies.get('refreshToken') !== 'undefined');
    },
    authenticate(cb, data) {
        axios.post('../public/login', data)
            .then(res => {
                cookies.set('refreshToken', res.data.refresh_token, {path: '/', maxAge: res.data.refresh_expires_in});
                cookies.set('loginToken', res.data.access_token, {path: '/', maxAge: res.data.expires_in});

                return cb(res.data);
            })
            .catch(err => {
                console.log(err);
                return cb(err.response.data);
            });
    },
    logout() {
        cookies.set('refreshToken', null, {path: '/', maxAge: 0});
        cookies.set('loginToken', null, {path: '/', maxAge: 0});

        window.location.reload();
    },

    refreshToken(originalRequest) {
        return axios.post('../public/refresh-token', {refreshToken: cookies.get('refreshToken'), sugar_url: localStorage.getItem('sugar_url')})
            .then((response) => {
                let tokenData = response.data;

                if (originalRequest.method === 'get') {
                    let searchString = originalRequest.url.split('?')[1];
                    let baseString = originalRequest.url.split('?')[0];
                    let params = new URLSearchParams(searchString);
                    params.set('token',tokenData.access_token);

                    originalRequest.url = baseString + '?' + params.toString();
                } else {
                    originalRequest.data.set('token', tokenData.access_token);
                }

                this.saveToken(tokenData);

                return axios(originalRequest)
            }).catch((error) => {
            this.logout();
        });

    },

    saveToken(tokenData) {
        cookies.set('loginToken', tokenData.access_token, {path: '/', maxAge: tokenData.expires_in});
        cookies.set('refreshToken', tokenData.refresh_token, {path: '/', maxAge: tokenData.refresh_expires_in});
    }
};

export default Auth