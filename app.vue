<template>
  <div class="main">
    <div class="container">
      <div class="search-container">
        <div class="search">
          <img class="search-icon" src="./public/search.svg" alt="Search" />
          <input class="search-input" type="search" v-model="searchQuery" placeholder="Filter by author..." />
        </div>
      </div>
      <div class="posts">
        <div v-for="post in filteredPosts" :key="post.id" class="post">
          <h3 class="title">{{ post.title }}</h3>
          <p class="description">{{ post.body }}</p>
          <p class="author">{{ getAuthorName(post.userId) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { GetUsers, GetPosts } from "./server/responsesAPI";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
}

const posts = ref<Post[]>([]);
const users = ref<User[]>([]);
const searchQuery = ref<string>('');

// Фильтрация постов
const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return posts.value;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return posts.value.filter(post => {
    const author = users.value.find(user => user.id === post.userId);
    return author ? author.name.toLowerCase().includes(lowerCaseQuery) : false;
  });
});

const getAuthorName = (userId: number): string => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.name : 'Unknown Author';
};

onMounted(async () => {
  posts.value = await GetPosts() as Post[];
  users.value = await GetUsers() as User[];
});
</script>

<style scoped lang="sass">
.container
  @apply w-9/12 m-auto py-3 flex flex-col gap-4

.main
  @apply bg-blue-100;
  .search-container
    @apply flex justify-center
    .search
      @apply bg-white flex rounded-xl
      &-input
        @apply p-2 rounded-r-xl
        &[type="search"]
          @apply outline-offset-0
        &:focus-visible
          @apply outline-blue-600
      &-icon
        @apply p-2
  .posts
    @apply xl:columns-3 gap-4
    .post
      @apply flex flex-col bg-white rounded-xl p-3 gap-4 mb-4 break-inside-avoid
      .title,.description,.author
        @apply capitalize
      .title
        @apply font-bold text-xl text-blue-600
      .author
        @apply opacity-50 font-medium
</style>
