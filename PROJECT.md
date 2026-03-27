# elsfa-vue 项目说明文档

## 📖 项目简介

elsfa-vue 是一个基于 **Nuxt 4** 构建的全栈 Vue.js 应用框架，采用最新的 Vue 3.6（beta 版本）和 Nuxt 4.4.2 技术栈。该项目提供了完整的开发工具链，包括服务端渲染（SSR）、静态站点生成（SSG）、类型检查、代码规范、端到端测试等功能。

## 🏗️ 技术架构

### 核心技术栈

- **框架**: Nuxt 4.4.2 (基于 Vue 3.6.0-beta.9)
- **构建工具**: Nuxt Build (基于 Vite)
- **语言**: TypeScript 5.9.3
- **状态管理**: Pinia 3.0.4 + @pinia/nuxt 0.9.0
- **路由**: Nuxt 文件系统路由 (基于 vue-router 5.0.3)
- **服务端**: Nitro Server Engine

### 开发工具链

- **代码质量**:
  - ESLint 10.0.3 - 代码检查和修复
  - Oxlint 1.51.0 - 高性能 linter
  - Prettier (通过 eslint-config-prettier) - 代码格式化
  - Oxfmt - 代码格式化工具

- **测试框架**:
  - Vitest 4.0.18 - 单元测试框架
  - Playwright 1.58.2 - E2E 测试框架
  - @vue/test-utils 2.4.6 - Vue 组件测试工具

- **开发增强**:
  - Vue DevTools - Vue 调试工具
  - Volar - VSCode 插件，提供 Vue 3 类型支持

## 📁 项目结构

```
elsfa-vue/
├── app.vue                  # Nuxt 应用根组件
├── nuxt.config.ts           # Nuxt 配置文件
├── components/              # Vue 组件目录
│   └── Counter.vue         # 示例组件
├── composables/             # 组合式函数目录
│   └── useApi.ts           # API 组合式函数
├── layouts/                 # 布局组件目录
│   └── default.vue         # 默认布局
├── pages/                   # 页面路由目录
│   └── index.vue           # 首页路由
├── stores/                  # Pinia 状态管理目录
│   └── counter.ts          # 示例 store
├── server/                  # 服务端 API 目录
│   └── api/                # 服务端 API 路由
│       └── hello.get.ts    # 示例 API
├── assets/                  # 资源文件目录
│   └── main.css            # 全局样式
├── public/                  # 静态资源目录
│   └── favicon.ico         # 网站图标
├── e2e/                     # E2E 测试目录
│   └── vue.spec.ts         # E2E 测试用例
├── .vscode/                 # VSCode 配置
├── .idea/                   # IDEA 配置
├── tsconfig.json            # TypeScript 配置
├── eslint.config.ts         # ESLint 配置
├── oxlintrc.json            # Oxlint 配置
├── playwright.config.ts     # Playwright 配置
└── package.json             # 项目依赖配置
```

## 🔧 配置文件说明

### 1. Nuxt 配置 (nuxt.config.ts)

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',  // Pinia 集成
  ],
  
  css: ['~/assets/main.css'],  // 全局 CSS
  
  nitro: {
    compressPublicAssets: true,  // 资源压缩
  },
  
  typescript: {
    strict: true,  // 严格类型检查
  },
  
  routeRules: {
    '/': { prerender: true },  // 预渲染首页
  },
  
  app: {
    head: {
      title: 'elsfa-vue',
      meta: [...],
      link: [...],
    },
  },
})
```

### 2. TypeScript 配置

项目使用 Nuxt 自动生成的 TypeScript 配置：
- `tsconfig.json` - 主配置文件
- `.nuxt/tsconfig.json` - Nuxt 自动生成的配置
- 支持 `.vue` 文件的完整类型推导

### 3. 代码规范配置

- **EditorConfig**: 统一编辑器的基本设置（缩进、编码等）
- **ESLint**: 全面的代码质量检查（支持 Vue 3 和 TypeScript）
- **Oxlint**: 快速的 lint 检查
- **Oxfmt**: 代码格式化工具

## 🎯 核心功能模块

### 1. 文件系统路由（Nuxt Pages）

Nuxt 自动根据 `pages/` 目录结构生成路由：

```typescript
// pages/index.vue -> 路由：/
// pages/about.vue -> 路由：/about
// pages/users/[id].vue -> 动态路由：/users/:id
```

在组件中使用导航：
```vue
<template>
  <NuxtLink to="/about">About</NuxtLink>
</template>
```

### 2. 状态管理 (Pinia + Nuxt)

使用 `@pinia/nuxt` 模块集成：

```typescript
// stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, doubleCount, increment }
})
```

在组件中使用：
```vue
<script setup lang="ts">
const counterStore = useCounterStore()
</script>
```

### 3. 服务端 API 路由

在 `server/api/` 目录下创建 API 端点：

```typescript
// server/api/hello.get.ts
export default defineEventHandler(async (event) => {
  return {
    message: 'Hello from Nuxt!',
    timestamp: new Date().toISOString()
  }
})
```

访问：`GET /api/hello`

### 4. 组合式函数 (Composables)

在 `composables/` 目录下创建自动导入的组合式函数：

```typescript
// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  
  const fetchData = async () => {
    return await $fetch('/api/data')
  }
  
  return { fetchData }
}
```

### 5. 布局系统

在 `layouts/` 目录下创建布局组件：

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <header>...</header>
    <main>
      <slot />
    </main>
    <footer>...</footer>
  </div>
</template>
```

在页面中使用：
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

### 6. 应用入口 (app.vue)

Nuxt 应用的根组件：

```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

## 🚀 特性亮点

### 1. 全栈能力
- **服务端渲染 (SSR)**: 提升 SEO 和首屏加载性能
- **静态站点生成 (SSG)**: 预渲染页面，极致性能
- **混合渲染模式**: 按需选择渲染策略
- **Nitro 服务器引擎**: 高性能服务端支持

### 2. 自动化特性
- **自动导入**: Composables、Components、Utils 自动导入
- **文件系统路由**: 零配置路由生成
- **TypeScript 支持**: 完整的类型推导
- **Optimistic UI**: 即时交互体验

### 3. 极速开发体验
- **Vite 驱动**: 秒级热更新
- **Nuxt DevTools**: 可视化调试工具
- **即时启动**: 快速启动开发服务器
- **高效 HMR**: 精准的热模块替换

### 4. 完整的类型系统
- TypeScript 全面覆盖
- Vue 3 Composition API 类型推导
- `.vue` 文件的完整类型支持
- Nuxt 自动类型生成

### 5. 质量保证体系
- 多层 lint 检查（ESLint + Oxlint）
- E2E 测试（Playwright）
- 自动化代码格式化
- 服务端 API 测试

### 6. 现代化工作流
- 统一的代码风格（EditorConfig）
- Git Hooks 集成潜力
- CI/CD 友好
- 生产就绪的构建优化

## 📝 最佳实践

### 1. 组件开发

使用 `<script setup>` 语法和 Nuxt 自动导入：

```vue
<script setup lang="ts">
// Nuxt 自动导入 ref, computed 等
const props = defineProps<{ msg: string }>()
const emit = defineEmits<{ change: [value: string] }>()

// 使用 useFetch 进行数据获取
const { data, pending, error } = await useFetch('/api/data')
</script>
```

### 2. 状态管理

使用 Pinia 的 setup store 模式，配合 Nuxt 插件：

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  
  // Getters
  const isLoggedIn = computed(() => !!user.value)
  
  // Actions
  async function login(credentials: { email: string; password: string }) {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })
    user.value = response.user
  }
  
  return { user, isLoggedIn, login }
})
```

### 3. 页面开发

利用 Nuxt 的文件系统路由和页面元数据：

```vue
<!-- pages/users/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const userId = route.params.id

// 服务端数据获取
const { data: user } = await useFetch(`/api/users/${userId}`)

// 定义页面元数据
definePageMeta({
  layout: 'default',
  middleware: ['auth'] // 可选的中间件
})
</script>

<template>
  <div>
    <h1>{{ user.name }}</h1>
  </div>
</template>
```

### 4. 服务端 API

创建服务端 API 端点：

```typescript
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

### 5. 组合式函数

创建可复用的组合式函数：

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const userStore = useUserStore()
  
  const login = async (credentials: any) => {
    await userStore.login(credentials)
  }
  
  const logout = () => {
    userStore.logout()
  }
  
  return { login, logout, isAuthenticated: computed(() => userStore.isLoggedIn) }
}
```

### 6. 路径别名

使用 Nuxt 的路径别名：

```typescript
// ~ 或 @ 都指向项目根目录
import MyComponent from '~/components/MyComponent.vue'
import { useAuth } from '#imports'
```

### 7. 数据获取策略

```typescript
// 服务端数据获取（SEO 友好）
const { data } = await useFetch('/api/data')

// 客户端数据获取
const { data } = await useLazyFetch('/api/data')

// 带缓存的数据获取
const { data } = await useFetch('/api/data', {
  key: 'unique-key',
  getCachedData: (key) => $fetch(key),
})
```

## 🔍 开发建议

### IDE 配置
- 使用 VS Code + Vue (Official) 插件
- 禁用 Vetur（避免与 Volar 冲突）
- 安装 ESLint 和 Prettier 插件

### 浏览器配置
- Chrome/Edge: 安装 Vue.js devtools
- Firefox: 安装 Vue.js devtools
- 开启 DevTools 的 Custom Object Formatter

### 代码提交前检查清单
1. 运行 `pnpm lint` 确保代码符合规范
2. 运行 `pnpm test:unit` 通过单元测试
3. 运行 `pnpm type-check` 确保类型正确

## ⚠️ 注意事项

### 1. Beta 版本使用
项目使用了 Vue 3.6 和 Nuxt 3.16 的 beta 版本：
- 可能存在不稳定性
- API 可能发生变化
- 生产环境使用需谨慎

### 2. Node.js 版本要求
- Node.js ^20.19.0 或 >=22.12.0
- 必须使用 pnpm 作为包管理器
- 首次安装后需运行 `pnpm postinstall` 或 `npx nuxt prepare`

### 3. Nuxt 特定事项
- 无需手动创建 `main.ts` 入口文件
- 路由由文件系统自动生成
- 组件和组合式函数自动导入
- 使用 `NuxtPage`、`NuxtLink` 等内置组件

### 4. 类型检查
- `.vue` 文件需要 Volar 插件支持
- Nuxt 会自动生成 `.nuxt` 目录的类型定义
- 确保 IDE 已正确配置 TypeScript

### 5. 构建命令区别
- `pnpm build`: 生产构建（包含 SSR）
- `pnpm generate`: 静态站点生成（SSG）
- `pnpm preview`: 预览构建结果

## 📚 相关资源

- [Nuxt 3 官方文档](https://nuxt.com/docs)
- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Nuxt 3 入门教程](https://nuxt.com/docs/getting-started/introduction)
- [Nitro 服务器引擎](https://nitro.unjs.io/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Playwright 文档](https://playwright.dev/)

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

查看 [LICENSE](LICENSE) 文件了解详情。
