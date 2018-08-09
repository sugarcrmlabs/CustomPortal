import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const API = {
    get: function (route, params) {
        var queryString = '';

        if (typeof params !== 'undefined') {
            queryString = Object.keys(params).map(function (key) {
                return key + '=' + params[key]
            }).join('&');
        }

        return axios.get('/' + route + '?token=' + cookies.get('loginToken')
            + '&sugar_url=' + localStorage.getItem('sugar_url')
            + '&' + queryString
        )
    },
    post: function (route, params) {
        params.set('sugar_url', localStorage.getItem('sugar_url'));
        params.set('token', cookies.get('loginToken'));

        return axios.post('/' + route, params);
    },
    delete: function (route) {
        var params = {};
        params.data = {};
        params.data.sugar_url = localStorage.getItem('sugar_url');
        params.data.token = cookies.get('loginToken');

        return axios.delete('/' + route, params);
    }
};

export default API
