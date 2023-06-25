<template>
  <div class="show-movie-container">
    <div class="movie-body">
      <div class="movie-decr-and-actions">
        <label for="title">Название фильма</label>
        <input id="title" type="text" v-model="movie.title" />
        <label for="title">Год</label>
        <input type="text" placeholder="Year" v-model="movie.year" />
        <label for="title">Описание</label>
        <div class="movie-description">
          <textarea v-model="movie.description"></textarea>
        </div>
        <div class="action-buttons">
          <base-button @click="updateMovie()">
            <template #body> сохранить </template></base-button
          >
          <base-button @click="$emit('cancelEdit')"
            ><template #body> назад </template></base-button
          >
        </div>
      </div>
      <div class="poster-container">
        <div class="poster">
          <img :src="`/uploads/${movie.poster}`" alt="" />
          <input id="fileUpload" type="file" hidden @change="previewPoster" />
          <base-button class="poster-change" @click="changePoster()"
            ><template #body> Сменить постер </template></base-button
          >
        </div>
        <div class="edit-rating">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            v-model="movie.rating"
          />
        </div>
        <div class="movie-rating">
          <h4>Рейтинг: {{ movie.rating }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../src/utils/helper";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
  emits: ["cancelEdit", "saveAndExit"],
  setup(_, { emit }) {
    const movie = ref({});
    const route = useRoute();
    const poster = ref(null);
    const changePoster = () => {
      document.getElementById("fileUpload").click();
    };
    const previewPoster = (event) => {
      poster.value = event.target.files[0];
    };
    const getMovie = () => {
      axios
        .get(`${server.baseURL}/movies/${route.params.id}`)
        .then((res) => (movie.value = res.data));
    };
    const updateMovie = () => {
      const formData = new FormData();
      formData.append("poster", poster.value || movie.value.poster);
      formData.append("title", movie.value.title);
      formData.append("description", movie.value.description);
      formData.append("rating", movie.value.rating);
      formData.append("year", movie.value.year);
      axios
        .patch(`${server.baseURL}/movies/${route.params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          emit("saveAndExit", res.data);
        });
    };
    const deleteMovie = (id) => {
      axios.delete(`${server.baseURL}/movies/${id}`);
    };
    onMounted(() => {
      getMovie();
    });
    return {
      getMovie,
      movie,
      deleteMovie,
      changePoster,
      previewPoster,
      updateMovie,
      poster,
    };
  },
};
</script>

<style scoped>
input {
  width: fit-content;
  margin-bottom: 10px;
  border: none;
  border-radius: 20px;
  background-color: cornsilk;
  padding: 2px 5px;
}

label {
  text-align: left;
  font-size: 12px;
  color: #5c5c5c;
}

.show-movie-container {
  position: relative;
  max-width: 800px;
  height: 100%;
  margin: auto;
  background-color: #f4f4f4;
  padding: 2px;
  border-radius: 5px;
}

.movie-body {
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  gap: 1rem;
}

.movie-decr-and-actions {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.poster {
  position: relative;
  max-width: 500px;
  height: 550px;
  box-shadow: 0 0 3px 1px #424242;
}

.poster > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movie-description {
  height: 100%;
}

.movie-description > textarea {
  width: 100%;
  min-height: 50%;
  resize: none;
  border: none;
  border-radius: 20px;
  padding: 15px 2px;
}

.movie-rating {
  margin-top: auto;
}

.action-buttons {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.action-buttons > button {
  margin-bottom: 10px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  padding: 2px 5px;
  box-shadow: 0 0 2px 1px #a0a0a0;
  cursor: pointer;
}

.poster-change {
  position: absolute;
  left: -10px;
  bottom: -10px;
}

@media (max-width: 800px) {
  .movie-body {
    flex-direction: column;
  }
  .movie-decr-and-actions {
    order: 1;
    width: 100%;
  }
  .poster {
    margin: auto;
  }
  .movie-description > textarea {
    min-height: 100px;
  }
}
</style>