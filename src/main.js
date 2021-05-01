import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as axios from 'axios'

console.log(localStorage);

let token = localStorage.getItem('token');

global.redirectTo = (name) => {
    router.push({name: name}).catch(err => { /* QUITE! */ });
}

global.request = (url, type, data, success) => {
    let bodyFormData = new FormData();

    if (data !== null) {
        Object.keys(data).map(el => {
            bodyFormData.append(el, data[el]);
        });
    }

    return axios({
      method: type,
      url: "https://go-backend-denis.ambersoft.llc" + url,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(
        data => {
            success(data);
        }
    )
    .catch(
        err => { console.log(err); }
    );
}

global.get = async (url, data = null, success) => {
    return request(url, "get", data, success);
}

global.post = async (url, data = null, success) => {
    return request(url, "post", data, success);
}

global.storage = name => localStorage.getItem(name);

global.setStorage = (name, val) => localStorage.setItem(name, val);

global.startGame = (gameId) => {
    setStorage('curGameId', gameId);
    window.location = "/game";
}

router.afterEach(async (to, from) => {
    let isLogin = true;
    isLogin = (token !== null);

    if (to.path == '/login' && isLogin)
      redirectTo('Home');

    if (!isLogin)
      redirectTo('Authorization');
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
