import axios from 'axios'
import {Toast} from 'mand-mobile'
import store from '@/store'

const config = {
    user: 'lovol',
    password: 'lovol',
    baseURL: 'http://172.168.10.209:8981/waste_gas/',
    base:'http://172.168.10.209:8981'
}
const fetch = (method, url, params, format) => {
    //console.log( params );
    if(method == 'LOGIN'){
        var x = axios.get(config.baseURL + url +'&param_deviceType=mobileApp&__ajax=json' + '&__sid=' + store.state.user.sessionid, {
            params: params,
            headers: {}
        }).then((res, reject) => {
            if (res.error != null)
                reject(res)
            return res.data
        }).catch(error => {
            console.log(error);
            Toast.failed('与服务器通讯出现故障，请稍后再尝试...\n"+error', 2000)
            //reject(error);
        });
    }else if (method == 'GET') {
        var x = axios.get(config.baseURL + url + "?" + new Date().getTime() + '&param_deviceType=mobileApp&__ajax=json' + '&__sid=' + store.state.user.sessionid, {
            params: params,
            headers: {}
        }).then((res, reject) => {
            if (res.error != null)
                reject(res)
            return res.data
        }).catch(error => {
                console.log(error);
                Toast.failed('与服务器通讯出现故障，请稍后再尝试...\n"+error', 2000)
                //reject(error);
            });
    }
    else {
        params['__ajax'] = 'json';
        params['__sid'] = store.state.user.sessionid;
        var x = axios({
            method: method,
            url: config.baseURL + url,
            data: params,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }

        }).then((res, reject) => {
            if (res.error != null)
                reject(res)
            return res.data
        }).catch(error => {
                console.log(error);
                Toast.failed('与服务器通讯出现故障，请稍后再尝试...\n"+error', 2000)
                //reject(error);
            });

    }
    return x;
}
var doLogin = () => fetch("LOGIN", 'a/login?__login=true&username=' + config.user + '&password=' + config.password);

var onlineList = () => fetch("GET", 'a/waste_gas/category/online/list');

export {
    config,doLogin,onlineList
}