import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as axios from 'axios'

console.log(localStorage);

let token = localStorage.getItem('token');

global.redirectTo = (name) => {
    router.push({name: name}).catch(err => { /* QUITE! */ });
}

global.request = (url, type, data, success, failed) => {
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
            return success(data);
        }
    )
    .catch(
        err => { failed(err); }
    );
}

global.get = async (url, data = null, success, failed = (err) => { console.log(err); }) => {
    return request(url, "get", data, success, failed);
}

global.post = async (url, data = null, success, failed = (err) => { console.log(err); }) => {
    return request(url, "post", data, success, failed);
}

global.storage = name => localStorage.getItem(name);

global.setStorage = (name, val) => localStorage.setItem(name, val);

global.startGame = (gameId) => {
    setStorage('curGameId', gameId);
    window.location = "/game";
}

global.showLoader = false;

global.getCurUser = async () => {
	const data = storage('curUserData')
	if (data !== null && data !== "" && data !== "null")
	{
		return (new Promise((resolve, reject) => {
			resolve(JSON.parse(storage('curUserData')));
		}));
	}
	else
	{
		return get('/user/profile?token=' + storage('token'), null, data => {
			const obj = {
				avatar: data.data.user.avatar,
				nickname: data.data.user.nickname
			};
			setStorage('curUserData', JSON.stringify(obj));
			return obj;
		});
	}
}

global.logout = function () {
	setStorage('curUserData', "");
	setStorage('token', null);
	window.location = window.location;
}

router.afterEach(async (to, from) => {
    let isLogin = true;
    isLogin = (token !== null);

	if (isLogin)
		isLogin = (token != "null" && token != "");
	
	//console.log(token != "null");

    if (to.path == '/login' && isLogin)
      redirectTo('Home');

    if (!isLogin)
      redirectTo('Authorization');
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
