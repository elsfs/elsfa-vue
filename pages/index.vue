<template>
  <div class="home">
    <h1>Welcome to Nuxt.js!</h1>
    <p>
      Visit <a href="https://nuxt.com/" target="_blank" rel="noopener">Nuxt.js Documentation</a> to
      read the documentation
    </p>
    
    <Counter />
  </div>
</template>

<script setup lang="ts">
// 定义页面元数据
definePageMeta({
  title: 'Home',
})

// 使用 SEO 元数据
useSeoMeta({
  title: 'elsfa-vue - Home',
  description: 'Welcome to the elsfa-vue application built with Nuxt.js',
})
</script>

<style scoped>
.home {
  text-align: center;
}

h1 {
  color: #42b883;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

a {
  color: #42b883;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
