import axios from 'axios';


const URL_BASE = '/data/2.5/forecast';

const params = {
    q: 'Tokyo',
    APPID: '38c90f844d22569c51c0bf251490993a'
}


export default {
    data: {
        forcast_data: []
    },
    methods: {
        get_ajax(url, name) {
            console.log("get_ajax")
            // return axios.get(url + URL_BASE, params)
            //     .then((res) => {
            //         Vue.set(this, name, res.list);
            //         this.$emit('GET_AJAX_COMPLETED');
            //     });
        },
        get_data(name) {
            return this.$data[name];
        }
    }
}