<template>
  <div class="layout-default">
    <header class="layout-header">
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
      </nav>
    </header>
    
    <main class="layout-main">
      <slot />
    </main>
    
    <footer class="layout-footer">
      <p>&copy; 2026 elsfa-vue. Built with Nuxt.js</p>
    </footer>
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background-color: #42b883;
  padding: 1rem 2rem;
}

.layout-header nav {
  max-width: 1200px;
  margin: 0 auto;
}

.layout-header a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin-right: 1rem;
}

.layout-header a:hover {
  text-decoration: underline;
}

.layout-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.layout-footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>
