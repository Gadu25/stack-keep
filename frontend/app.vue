<script setup>
import { ref, onMounted } from 'vue'
import { GetBooks } from '@/graphql/queries/getBooks'
const { $apollo } = useNuxtApp()

const result = ref(null)

onMounted(async () => {
  const { data } = await $apollo.query({
    query: GetBooks,
  })
  result.value = data
})
</script>

<template>
  <div>
    <h1 class="text-xl text-red-900">Books List 📚</h1>
    <div>
      <ul>
        <li v-for="book in result?.books" :key="book.title">
          {{ book.title }} by {{ book.author }}
        </li>
      </ul>
    </div>
  </div>
</template>
