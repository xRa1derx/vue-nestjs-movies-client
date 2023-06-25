<template>
  <div class="container">
    <div class="add-new-movie">
      <div @click="$router.back()" class="arrow-back">
        <img src="@/assets/arrow.png" alt="" />
      </div>
      <div class="preview-image-container">
        <img class="preview-image" :src="previewImage" alt="" />
      </div>
      <input type="text" placeholder="Название" v-model="title" />
      <input type="text" placeholder="Год" v-model="year" />
      <textarea
        placeholder="Описание фильма"
        name="description"
        id=""
        cols="30"
        rows="10"
        v-model="description"
      ></textarea>
      <div class="rating-container">
        <input
          class="change-rating"
          type="range"
          min="1"
          max="10"
          step="1"
          v-model="rating"
        />
        <span class="rating">{{ rating }}</span>
      </div>
      <input
        id="fileUpload"
        type="file"
        hidden
        @change="onChangeImageUpload($event)"
      />
      <button @click="choosePoster()">Выбрать постер</button>
      <button @click="addMovie()" :disabled="isDisabled">Добавить</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import axios from "axios";
import { server } from "../../src/utils/helper";
import { useRouter } from "vue-router";
export default {
  setup() {
    const isDisabled = ref(true);
    const router = useRouter();
    const title = ref("");
    const year = ref("");
    const description = ref("");
    const rating = ref("1");
    const poster = ref(null);
    const previewImage = ref("/uploads/default-poster.png");
    const choosePoster = () => {
      document.getElementById("fileUpload").click();
    };
    const addMovie = () => {
      const formData = new FormData();
      formData.append("poster", poster.value);
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("rating", rating.value);
      formData.append("year", year.value);
      axios
        .post(`${server.baseURL}/movies`, formData)
        .then(() => router.push({ name: "home" }))
        .catch((err) => console.log(err));
    };
    const onChangeImageUpload = (event) => {
      poster.value = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        previewImage.value = e.target.result;
      };
      reader.readAsDataURL(poster.value);
    };
    watch(
      () => poster.value,
      () => {
        poster.value == null
          ? (isDisabled.value = true)
          : (isDisabled.value = false);
      }
    );
    return {
      title,
      year,
      description,
      rating,
      poster,
      addMovie,
      choosePoster,
      onChangeImageUpload,
      previewImage,
      isDisabled,
    };
  },
};
</script>

<style scoped>
.add-new-movie {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 500px;
  gap: 5px;
}

.container {
  position: relative;
  max-width: 800px;
  height: 100%;
  margin: auto;
  background-color: #f4f4f4;
  padding: 2px;
  border-radius: 5px;
  padding: 1rem;
}

.preview-image-container {
  max-width: 500px;
}

.preview-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.rating-container {
  display: flex;
  justify-content: space-between;
}

.change-rating {
  width: 70%;
}

.rating {
  margin: auto;
}

.arrow-back {
  width: 40px;
  height: 25px;
  cursor: pointer;
  margin-top: auto;
}

.arrow-back > img {
  width: 100%;
  height: 100%;
}
</style>