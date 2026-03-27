# elsfa-vue 开发使用指南

## 🚀 快速开始

### 环境要求

- **Node.js**: ^20.19.0 或 >=22.12.0
- **包管理器**: pnpm (推荐)
- **编辑器**: VS Code（推荐）或其他支持 Vue 3 的编辑器
- **框架**: Nuxt 4.4+

### 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd elsfa-vue
```

#### 2. 安装依赖

```bash
pnpm install
```

#### 3. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看应用。

**注意**: Nuxt 开发服务器默认端口是 3000（不是 5173）

## 📋 开发命令详解

### 开发相关

#### 启动开发服务器

```bash
pnpm dev
```

**功能**:
- 启动 Nuxt 开发服务器（基于 Vite）
- 启用热模块替换 (HMR)
- 服务端渲染 (SSR) 模式
- 即时编译和预览

#### 类型检查

```bash
pnpm type-check
```

**功能**:
- 使用 vue-tsc 进行 TypeScript 类型检查
- 验证 `.vue` 文件的类型定义
- Nuxt 自动生成的类型也会一并检查
- 构建前建议执行此命令

### 构建相关

#### 生产构建（SSR）

```bash
pnpm build
```

**功能**:
- 执行类型检查
- 编译和压缩代码
- 生成服务端渲染 (SSR) 应用
- 输出到 `.output/` 目录

**详细过程**:
```bash
# 等价于依次执行：
pnpm type-check
pnpm build-only
```

#### 仅构建（不类型检查）

```bash
pnpm build-only
```

**使用场景**: 当已确认类型正确，只需快速构建时

#### 静态站点生成 (SSG)

```bash
pnpm generate
```

**功能**:
- 预渲染所有路由为静态 HTML
- 生成纯静态文件
- 适合部署到静态托管服务
- 输出到 `dist/` 目录

#### 预览生产构建

```bash
pnpm preview
```

**功能**:
- 在本地服务器上预览生产构建
- 默认端口：3000
- 用于部署前验证构建结果

### 测试相关

#### 运行 E2E 测试

```bash
# 首次使用需安装浏览器
npx playwright install

# 运行所有 E2E 测试
pnpm test:e2e

# 仅在 Chromium 上运行
pnpm test:e2e --project=chromium

# 运行特定测试文件
pnpm test:e2e e2e/vue.spec.ts

# 调试模式
pnpm test:e2e --debug
```

**CI 环境注意事项**:
```bash
# CI 上必须先构建项目
pnpm build
pnpm test:e2e
```

**注意**: 当前项目模板未配置单元测试（Vitest），如需添加可自行安装

### 代码质量相关

#### 代码检查

```bash
pnpm lint
```

**功能**:
- 运行 ESLint 检查（支持 Vue 3 和 TypeScript）
- 运行 Oxlint 检查
- 自动修复可修复的问题

**详细过程**:
```bash
# 等价于依次执行：
pnpm lint:oxlint
pnpm lint:eslint
```

#### 单独运行 Oxlint

```bash
pnpm lint:oxlint
```

**特点**: 
- 速度极快
- 基础代码质量检查
- 配置文件：`.oxlintrc.json`

#### 单独运行 ESLint

```bash
pnpm lint:eslint
```

**特点**:
- 更全面的规则检查
- 支持 Vue 文件和 TypeScript
- 配置文件：`eslint.config.ts`

#### 代码格式化

```bash
pnpm format
```

**功能**:
- 使用 oxfmt 格式化代码
- 统一代码风格
- 格式化 `src/` 目录下的代码

## 💻 日常开发工作流

### 1. 创建新组件

在 `components/` 目录下创建组件，Nuxt 会自动导入：

```vue
<!-- components/MyComponent.vue -->
<script setup lang="ts">
// 无需手动导入 ref, computed 等，Nuxt 会自动导入

// 定义 props
defineProps<{
  title?: string
}>()

// 定义 emits
const emit = defineEmits<{
  update: [value: string]
}>()

// 响应式数据
const count = ref(0)

// 方法
function handleClick() {
  emit('update', 'hello')
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">Click</button>
  </div>
</template>

<style scoped>
/* 组件样式 */
</style>
```

使用组件（自动导入）：
```vue
<template>
  <MyComponent title="Hello" />
</template>
```

### 2. 创建页面视图

在 `pages/` 目录下创建页面，Nuxt 会自动生成路由：

```vue
<!-- pages/about.vue -->
<script setup lang="ts">
// 页面元数据
definePageMeta({
  layout: 'default',
  title: 'About Us' // 可用于 SEO
})

// 数据获取
const { data } = await useFetch('/api/info')
</script>

<template>
  <div>
    <h1>About Page</h1>
  </div>
</template>
```

**路由规则**:
- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/users/[id].vue` → `/users/:id` (动态路由)
- `pages/users/[id]/edit.vue` → `/users/:id/edit` (嵌套路由)

### 3. 使用布局

在 `layouts/` 目录下创建布局：

```vue
<!-- layouts/default.vue -->
<template>
  <div class="layout">
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer>
      <p>&copy; 2024 elsfa-vue</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
```

在页面中使用布局：
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

### 4. 创建 Store (Pinia)

在 `stores/` 目录下创建 store，Nuxt 会自动注册 Pinia：

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  
  // Actions
  async function login(credentials: { email: string; password: string }) {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })
    user.value = response.user
  }
  
  function logout() {
    user.value = null
  }
  
  return { user, isLoggedIn, login, logout }
})
```

在组件中使用：
```vue
<script setup lang="ts">
const userStore = useUserStore()

async function handleLogin() {
  await userStore.login({
    email: 'john@example.com',
    password: 'password123'
  })
}
</script>

<template>
  <div v-if="userStore.isLoggedIn">
    Welcome, {{ userStore.user.name }}!
  </div>
  <button v-else @click="handleLogin">Login</button>
</template>
```

### 5. 创建组合式函数 (Composables)

在 `composables/` 目录下创建自动导入的组合式函数：

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const userStore = useUserStore()
  const config = useRuntimeConfig()
  
  const login = async (credentials: any) => {
    await userStore.login(credentials)
  }
  
  const logout = () => {
    userStore.logout()
  }
  
  const isAuthenticated = computed(() => userStore.isLoggedIn)
  
  return { login, logout, isAuthenticated }
}
```

在页面或组件中使用：
```vue
<script setup lang="ts">
const { login, logout, isAuthenticated } = useAuth()
</script>
```

### 6. 创建服务端 API

在 `server/api/` 目录下创建 API 端点：

```typescript
// server/api/hello.get.ts
export default defineEventHandler(async (event) => {
  return {
    message: 'Hello from Nuxt!',
    timestamp: new Date().toISOString()
  }
})

// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const users = await db.users.findMany()
  return users
})

// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await db.users.create({ data: body })
  return user
})
```

访问 API：
- `GET /api/hello`
- `GET /api/users`
- `POST /api/users`

### 7. 编写 E2E 测试

在 `e2e` 目录下：

```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test('home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/elsfa-vue/)
  
  // 测试导航
  await page.click('a[href="/about"]')
  await expect(page).toHaveURL('/about')
})
```

## 🔧 编辑器配置

### VS Code 推荐插件

1. **Vue - Official** (必备)
   - 提供 Vue 3 完整支持
   - TypeScript 集成
   - 语法高亮

2. **ESLint**
   - 实时代码检查
   - 自动修复

3. **Prettier - Code formatter**
   - 代码格式化
   - 保存时自动格式化

4. **Volar** (如使用旧版插件)
   - Vue 3 语言服务

### VS Code 设置

`.vscode/settings.json` 推荐配置：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "vue.server.implementationsStyle": "inline",
  "vue.complete.casing.tags": "pascal",
  "vue.complete.casing.props": "camel"
}
```

## 🎨 代码规范

### 命名规范

#### 文件和文件夹
- 组件文件：**PascalCase** (如 `MyComponent.vue`)
- 组合式函数：**camelCase** 并以 `use` 开头 (如 `useAuth.ts`)
- 页面文件：**小写** 或 **kebab-case** (如 `about.vue`, `user-profile.vue`)
- 布局文件：**小写** (如 `default.vue`)
- Store 文件：**camelCase** (如 `user.ts`)
- 服务端 API：**kebab-case** + 方法后缀 (如 `users.index.get.ts`)

#### 变量和函数
- 变量名：**camelCase**
- 常量：**UPPER_SNAKE_CASE**
- 组件名：**PascalCase**
- Props 和 emits：**camelCase**
- Composables：**useXxx** 格式

### 代码风格

遵循 `.editorconfig` 配置：
- 缩进：2 个空格
- 行尾：LF (Unix)
- 最大行长度：100 字符
- 编码：UTF-8

### Git 提交信息格式

```bash
# 格式：<type>(<scope>): <subject>

# 示例：
feat(pages): add user profile page
feat(api): create user management endpoints
fix(auth): resolve login token issue
docs(readme): update installation steps
style(format): fix indentation in components
refactor(store): optimize state management with pinia
test(e2e): add tests for user login flow
chore(deps): update nuxt and vue dependencies
build(nuxt): configure static site generation
```

## 🐛 常见问题解决

### 1. 开发服务器启动失败

**问题**: `pnpm dev` 报错

**解决方案**:
```bash
# 清除缓存和依赖
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install

# 重新生成 Nuxt 类型定义
npx nuxt prepare

pnpm dev
```

### 2. TypeScript 类型错误

**问题**: `.vue` 文件导入报类型错误或 Nuxt 自动导入的类型找不到

**解决方案**:
```bash
# 重新生成 Nuxt 类型定义
npx nuxt prepare

# 重启 IDE 或 TypeScript 服务
# 检查 .nuxt 目录是否正确生成
```

确保安装了 Volar 插件并在 VSCode 中启用。

### 3. HMR 不生效

**问题**: 文件修改后没有热更新

**解决方案**:
```bash
# 重启开发服务器
# 清除 vite 和 nuxt 缓存
rm -rf node_modules/.vite
rm -rf .nuxt

pnpm dev
```

### 4. 自动导入不生效

**问题**: 组件或 composables 没有自动导入

**解决方案**:
- 确保文件在正确的目录 (`components/` 或 `composables/`)
- 重启开发服务器
- 检查文件名是否符合命名规范
- 手动刷新 IDE 的 TypeScript 服务

### 5. E2E 测试失败

**问题**: Playwright 测试无法运行

**解决方案**:
```bash
# 安装浏览器
npx playwright install

# 如果是 Linux/Mac，可能需要安装系统依赖
npx playwright install-deps

# 确保先构建项目
pnpm build
pnpm test:e2e
```

### 6. Lint 错误过多

**问题**: `pnpm lint` 报告大量错误

**解决方案**:
```bash
# 自动修复可修复的错误
pnpm lint

# 如果仍有问题，手动逐个修复
# 或使用 eslint-disable 注释临时忽略
```

### 7. SSR 渲染问题

**问题**: 服务端渲染时报错或 hydration 不匹配

**解决方案**:
- 避免在组件中直接使用 `window` 或 `document`
- 使用 `onMounted()` 钩子处理客户端专属逻辑
- 使用 `<ClientOnly>` 包裹仅客户端组件
- 检查服务端和客户端的数据一致性

## 📦 部署指南

### 构建生产版本（SSR）

```bash
pnpm build
```

构建产物将在 `.output/` 目录，包含服务端渲染所需的所有文件。

### 静态站点生成（SSG）

```bash
pnpm generate
```

构建产物将在 `dist/` 目录，生成纯静态文件。

### 本地预览

```bash
pnpm preview
```

### 部署方式

#### 1. Node.js 服务器部署（SSR）

将 `.output/` 目录部署到 Node.js 服务器：

```bash
# 使用 node 直接运行
node .output/server/index.mjs

# 或使用 PM2
pm2 start .output/server/index.mjs --name elsfa-vue
```

适合部署到：
- VPS/云服务器
- Heroku
- Railway
- Render

#### 2. 静态托管部署（SSG）

将 `dist/` 目录上传到静态托管服务：

**Vercel**:
```bash
pnpm generate
# 直接连接 GitHub 自动部署
```

**Netlify**:
```bash
pnpm generate
# 拖拽 dist 目录到 Netlify
```

**GitHub Pages**:
```bash
pnpm generate
# 将 dist 目录推送到 gh-pages 分支
```

#### 3. Docker 部署

创建 `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### 环境变量

创建 `.env` 文件：

```bash
# .env.production
NUXT_PUBLIC_API_URL=https://api.example.com
NUXT_APP_TITLE=elsfa-vue Production
```

在代码中使用：
```typescript
// composables/useApi.ts
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

// 或在组件中
const title = useRuntimeConfig().app.title
```

**注意**: Nuxt 3 使用 `NUXT_` 前缀的环境变量

## 🎯 性能优化建议

### 1. 混合渲染模式

在 `nuxt.config.ts` 中配置不同路由的渲染策略：

```typescript
export default defineNuxtConfig({
  routeRules: {
    // 首页预渲染为静态 HTML
    '/': { prerender: true },
    
    // 产品页面使用 ISR（增量静态再生成）
    '/products/**': { swr: 3600 }, // 缓存 1 小时
    
    // 管理后台使用客户端渲染
    '/admin/**': { ssr: false },
    
    // API 路由启用 CORS
    '/api/**': { cors: true },
  }
})
```

### 2. 按需加载和数据获取

```typescript
// 使用 Lazy Fetch 延迟数据获取
const { data } = await useLazyFetch('/api/data')

// 使用 Suspense 处理异步组件
<Suspense>
  <AsyncComponent />
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

### 3. 组件优化

- 使用 `<ClientOnly>` 包裹仅客户端组件
- 使用 `v-once` 标记不变化的内容
- 使用 `Object.freeze()` 冻结大型静态数据
- 避免在内联函数中创建新对象

```vue
<template>
  <div>
    <!-- 仅客户端渲染 -->
    <ClientOnly>
      <InteractiveMap />
    </ClientOnly>
    
    <!-- 静态内容 -->
    <div v-once>{{ staticContent }}</div>
  </div>
</template>
```

### 4. 图片优化

- 使用 Nuxt Image 模块（需安装 `@nuxt/image`）
- 实现懒加载
- 使用现代图片格式 (WebP, AVIF)
- 响应式图片

```vue
<template>
  <NuxtImg
    src="/hero.jpg"
    :alt="Hero image"
    sizes="sm:100vw md:50vw lg:300px"
    preload
  />
</template>
```

### 5. 打包分析

```bash
# 安装 @nuxt/devtools
pnpm add -D @nuxt/devtools

# 在 nuxt.config.ts 中启用
export default defineNuxtConfig({
  devtools: { enabled: true }
})
```

使用 DevTools 分析：
- Bundle 大小
- 组件渲染性能
- 网络请求
- 状态管理

## 📚 学习资源

### 官方文档
- [Nuxt 3 官方文档](https://nuxt.com/docs) - **最重要**
- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Nitro 服务器引擎](https://nitro.unjs.io/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Playwright 文档](https://playwright.dev/)

### Nuxt 3 核心概念
- [文件系统路由](https://nuxt.com/docs/guide/directory-structure/pages)
- [自动导入](https://nuxt.com/docs/guide/concepts/auto-imports)
- [服务端渲染](https://nuxt.com/docs/guide/concepts/rendering)
- [数据获取](https://nuxt.com/docs/getting-started/data-fetching)
- [组合式函数](https://nuxt.com/docs/guide/concepts/composables)

### 教程和指南
- [Nuxt 3 入门教程](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt 学院](https://nuxt.com/mastery)
- [Vue School - Nuxt 3 课程](https://vueschool.io/courses/nuxt-js-3-for-beginners)

### 社区资源
- [Nuxt GitHub 仓库](https://github.com/nuxt/nuxt)
- [Nuxt Discord](https://discord.nuxtjs.org/)
- [Nuxt 社区论坛](https://github.com/nuxt/nuxt/discussions)

## 🤝 获取帮助

遇到问题时：
1. 查看本文档
2. 搜索官方文档
3. 查看项目的 Issues
4. 在社区论坛提问（Vue Forum、Stack Overflow）

---

**提示**: 建议在开发过程中保持终端常开，以便随时查看构建和测试输出。
