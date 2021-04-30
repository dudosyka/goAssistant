<template>
  <div class="login">
    <h1>Login Page</h1>
  </div>
</template>
<script>
  import axios from "axios"

  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
      }
    },
    components: {

    },
    methods: {
        auth() {

        let bodyFormData = new FormData();

        bodyFormData.append('email', 'a.hatson@ya.ru');
        bodyFormData.append('nickname', 'dudosyka');

        axios({
          method: "post",
          url: "https://go-backend-denis.ambersoft.llc/user/register",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(data => { console.log(data); }).catch(err => { console.log(err); });
        },
        statistic() {
            axios.get('https://go-backend-denis.ambersoft.llc/user/statistics')
            .then(data => {console.log(data)}).catch(err => {console.log(err)});
        }
    },
    created() {
        this.statistic();
        this.auth();
    }
  }
</script>
