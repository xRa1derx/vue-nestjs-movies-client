<template>
  <div class="movies-container">
    <div class="row">
      <div
        @click="$router.push({ name: 'movie', params: { id: movie._id } })"
        v-for="movie in $store.state.movies"
        :key="movie._id"
        class="movie"
      >
        <h2 class="movie-title">
          <span>{{ movie.title }}({{ movie.year }})</span>
        </h2>
        <div class="poster">
          <img :src="`/uploads/${movie.poster}`" alt="" />
        </div>
        <div class="movie-description">
          <p>{{ movie.description }}</p>
        </div>
        <div class="movie-rating">
          <h4>Рейтинг: {{ movie.rating }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import { server } from "../../src/utils/helper";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const movies = ref([]);
    const getMovies = () => {
      store.dispatch("getMovies");
    };
    onMounted(() => {
      getMovies();
    });
    return { getMovies, movies };
  },
};
</script>

<style scoped>
.movies-container {
  max-width: 1200px;
  margin: auto;
  /* padding-left: 15px;
  padding-right: 15px; */
}

.row {
  display: flex;
  flex-wrap: wrap;
  /* margin-left: -15px;
  margin-right: -15px; */
  gap: 5px;
  justify-content: space-between;
}

.movie {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 0 0 32%;
  min-height: 1px;
  background-color: #f4f4f4;
  padding: 2px;
  border-radius: 5px;
  transition: all 0.2s linear;
  cursor: pointer;
}

.movie:hover {
  background-color: coral;
}

.poster {
  width: 100%;
  height: 650px;
  box-shadow: 0 0 3px 1px #424242;
  overflow: hidden;
}

.poster > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: all 2s linear;
}

.poster > img:hover {
  transform: scale(1.03);
}

.movie-description > p {
  margin: 0;
  padding: 1rem;
  text-align: justify;
}

.movie-rating {
  margin-top: auto;
}

.movie-title {
  display: flex;
  min-height: 84px;
}

.movie-title > span {
  align-self: center;
  flex: 100%;
}

@media (max-width: 1212px) {
  .movie {
    flex: 0 0 49%;
  }
  .row {
    justify-content: space-between;
  }
}

@media (max-width: 900px) {
  .row {
    display: block;
    max-width: 700px;
    margin: auto;
  }
  .poster {
    height: auto;
  }
  .movie {
    margin-bottom: 10px;
  }
}
</style>