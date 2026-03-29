<template>
  <div class="home">
    <h1>Admin 管理后台</h1>
    <p>欢迎使用 elsfa-vue 管理后台</p>

    <Counter />
  </div>
</template>

<script setup lang="ts">
// 定义页面元数据
definePageMeta({
  title: 'Admin Dashboard',
})

// 使用 SEO 元数据
useSeoMeta({
  title: 'elsfa-vue - Admin Dashboard',
  description: 'elsfa-vue Admin Dashboard',
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
