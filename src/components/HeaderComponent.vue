<template>
  <div>
    <header>
      <div class="sort-by-rating">
        <div v-if="$route.meta.title == 'Home page'" @click="sortMovies()">
          Сортировать по рейтингу: {{ sortBy }}
        </div>
      </div>
      <sign-in v-if="$store.state.authenticated === false"></sign-in>
      <logout-component v-else></logout-component>
    </header>
    <div
      class="add-movie"
      v-if="
        $store.state.authenticated === true && $route.meta.title != 'Add movie'
      "
    >
      <h2 @click="$router.push({ name: 'add.movie' })">Добавить фильм</h2>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import LogoutComponent from "./LogoutComponent.vue";
import SignIn from "./SignIn.vue";
export default {
  components: { SignIn, LogoutComponent },
  setup() {
    const sortBy = ref("по умолчанию");
    const store = useStore();
    const sortMovies = () => {
      sortBy.value == "по умолчанию" || sortBy.value == "по возрастанию"
        ? (sortBy.value = "по убыванию")
        : (sortBy.value = "по возрастанию");
      store.dispatch("sortMovies", sortBy.value);
    };
    return { sortMovies, sortBy };
  },
};
</script>

<style scoped>
header {
  display: flex;
  border-radius: 5px;
  max-width: 1200px;
  height: 2rem;
  background-color: #fff;
  margin: auto;
  margin-bottom: 8px;
  justify-content: space-between;
}

.sort-by-rating {
  display: flex;
  margin-left: 1rem;
  cursor: pointer;
  padding: 1px 5px;
  border-radius: 10px;
  align-self: center;
}

.sort-by-rating:hover {
  background-color: #17a2b8;
  color: #fff;
}

.add-movie {
  max-width: 1200px;
  margin: auto;
}

.add-movie > h2 {
  width: fit-content;
  margin-left: auto;
  background-color: #535353;
  color: #fff;
  padding: 5px 1rem;
  border-radius: 20px;
  cursor: pointer;
}

.add-movie > h2:hover {
  background-color: #808080;
}

@media (max-width: 588px) {
  header {
    height: 100%;
    flex-direction: column;
  }
  .sort-by-rating {
    margin: 0;
  }
}

@media (max-width: 334px) {
  header {
    gap: 10px;
  }
}
</style>