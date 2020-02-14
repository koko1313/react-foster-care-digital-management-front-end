import axios from 'axios';

export default {
    get(url, params, success, failure) {
        return this.request({
            method: 'get',
            url,
            params,
            success,
            failure,
        });
    },
    post(url, params, success, failure) {
        return this.request({
            method: 'post',
            url,
            params,
            success,
            failure,
        });
    },
    put(url, params, success, failure) {
        return this.request({
            method: 'put',
            url,
            params,
            success,
            failure,
        });
    },
    delete(url, params, success, failure) {
        return this.request({
            method: 'delete',
            url,
            params,
            success,
            failure,
        });
    },

    request: (options = {}) => {
        if (!options.url) {
            console.log('URL is required');
            return;
        }

        const data = Object.assign({
            method: 'get',
            //baseURL: "http://127.0.0.1:8000/",
            baseURL: "https://koko.projects.bgschool.bg/foster-care-rest/",
            withCredentials: true,
        }, options);

        data.params = Object.assign({}, options.params);

        return new Promise((resolve, reject) => {
            axios(data)
                .then((response) => {
                    if (options.success) {
                        options.success(response.data);
                    }
                    resolve(response.data);
                })
                .catch((error) => {
                    if (options.failure) {
                        options.failure(error);
                    }
                    reject(error);
                });
        });
    },
};