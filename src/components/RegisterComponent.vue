<template>
  <div class="registration">
    <div class="validation">{{ validationMessage }}</div>
    <input type="text" placeholder="Имя пользователя" v-model="login" />
    <input type="password" placeholder="Пароль" v-model="password" />
    <button @click="register()">Зарегистрироваться</button>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../utils/helper";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "RegisterComponent",
  props: {
    msg: String,
  },
  emits: ["closeModal"],
  setup(_, { emit }) {
    const store = useStore();
    const validationMessage = ref("");
    const login = ref("");
    const password = ref("");
    const register = () => {
      axios
        .post(`${server.baseURL}/auth/registration`, {
          username: login.value,
          password: password.value,
        })
        .then((res) => {
          localStorage.setItem("auth", JSON.stringify(res.data));
          store.dispatch("login", res.data.username);
          emit("closeModal");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            validationMessage.value = err.response.data.message;
          }
        });
    };
    return { register, login, password, validationMessage };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin: auto;
  gap: 10px;
}

.registration > input {
  border-radius: 20px;
  background-color: cornsilk;
  border: none;
  padding: 2px 5px;
}

.registration > button {
  border: none;
  border-radius: 20px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.validation {
  color: red;
}
</style>
