<template>
  <div class="logout-container">
    <div><span class="show-modal" @click="logout()">Выйти</span></div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const logout = () => {
      localStorage.removeItem("auth");
      store.dispatch("logout");
    };
    return { logout };
  },
};
</script>

<style scoped >
.logout-container {
  display: flex;
  margin-right: 1rem;
}

.logout-container > div {
  align-self: center;
}

.show-modal {
  cursor: pointer;
  padding: 1px 5px;
  border-radius: 10px;
}

.show-modal:hover {
  background-color: #17a2b8;
  color: #fff;
}

@media (max-width: 588px) {
  .logout-container {
    justify-content: center;
    margin: 0;
  }
}
</style>