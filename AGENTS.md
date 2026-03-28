# elsfa-vue Agent 配置指南

## 项目概览

**elsfa-vue** (简称: elsfs) 是一个基于 **Nuxt 4** 构建的全栈 Vue.js 应用框架，采用最新的 Vue 3.6 和 Nuxt 4.4.2 技术栈。

### 核心技术栈

- **框架**: Nuxt 4.4.2 (基于 Vue 3.6.0-beta.9)
- **构建工具**: Vite 7.3.1
- **语言**: TypeScript 5.9.3
- **UI 框架**: Nuxt UI
- **CSS 框架**: Tailwind CSS
- **状态管理**: Pinia 3.0.4 + @pinia/nuxt 0.9.0
- **路由**: Nuxt 文件系统路由 (基于 vue-router 5.0.3)
- **服务端**: Nitro Server Engine
- **包管理器**: pnpm (monorepo 工作区)

### 已安装的 Nuxt 模块

- `@pinia/nuxt` - Pinia 状态管理集成

### 开发工具链

- **代码检查**: ESLint 10.0.3 + Oxlint 1.51.0
- **代码格式化**: Oxfmt
- **测试框架**: Playwright 1.58.2 (E2E)
- **类型检查**: vue-tsc

---

## 代码规范

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `MyComponent.vue` |
| 组合式函数 | camelCase + use 前缀 | `useAuth.ts` |
| 页面文件 | kebab-case | `user-profile.vue` |
| 布局文件 | 小写 | `default.vue` |
| Store 文件 | camelCase | `user.ts` |
| 服务端 API | kebab-case + 方法后缀 | `users.index.get.ts` |
| 变量/函数 | camelCase | `const userName = ''` |
| 常量 | UPPER_SNAKE_CASE | `const API_BASE_URL = ''` |
| Props/Emits | camelCase | `const props = defineProps<{ userId: string }>()` |

### 代码风格

- 缩进：2 个空格
- 行尾：LF (Unix)
- 最大行长度：100 字符
- 编码：UTF-8
- 使用单引号
- 语句末尾不使用分号

### Vue 组件规范

```vue
<script setup lang="ts">
// 1. 导入语句（如需手动导入）
import type { User } from '~/types'

// 2. Props 定义
const props = defineProps<{
  title?: string
  userId: string
}>()

// 3. Emits 定义
const emit = defineEmits<{
  update: [value: string]
  submit: [data: User]
}>()

// 4. 组合式函数调用
const { data, pending } = await useFetch('/api/data')
const userStore = useUserStore()

// 5. 响应式数据
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 6. 方法
function handleClick() {
  emit('update', 'hello')
}
</script>

<template>
  <div>
    <!-- 模板内容 -->
  </div>
</template>

<style scoped>
/* 组件样式 */
</style>
```

---

## 项目结构

```
elsfa-vue/
├── app.vue                  # Nuxt 应用根组件
├── nuxt.config.ts           # Nuxt 配置文件
├── components/              # Vue 组件目录（自动导入）
│   └── Counter.vue
├── composables/             # 组合式函数目录（自动导入）
│   └── useApi.ts
├── layouts/                 # 布局组件目录
│   └── default.vue
├── pages/                   # 页面路由目录（文件系统路由）
│   ├── docs/
│   └── index.vue
├── stores/                  # Pinia 状态管理目录（自动导入）
│   └── counter.ts
├── server/                  # 服务端 API 目录
│   └── api/
│       └── hello.get.ts
├── assets/                  # 资源文件目录
│   └── main.css
├── public/                  # 静态资源目录
│   └── favicon.ico
├── e2e/                     # E2E 测试目录
│   └── vue.spec.ts
├── docs/                    # 文档子项目（Nuxt UI Pro）
│   ├── app/
│   ├── components/
│   ├── content/
│   └── nuxt.config.ts
├── .vscode/                 # VSCode 配置
├── .qoder/rules/            # Qoder 规则配置
│   └── framework.json
├── tsconfig.json            # TypeScript 配置
├── eslint.config.ts         # ESLint 配置
├── oxlintrc.json            # Oxlint 配置
├── playwright.config.ts     # Playwright 配置
└── package.json             # 项目依赖配置
```

---

## 常用开发命令

```bash
# 开发服务器
pnpm dev                    # 启动 Nuxt 开发服务器（端口 3000）

# 构建
pnpm build                  # 生产构建（SSR）
pnpm generate               # 静态站点生成（SSG）
pnpm preview                # 预览生产构建

# 代码质量
pnpm lint                   # 运行所有 lint 检查（ESLint + Oxlint）
pnpm lint:oxlint            # 仅运行 Oxlint
pnpm lint:eslint            # 仅运行 ESLint
pnpm format                 # 格式化代码

# 类型检查
pnpm type-check             # 使用 vue-tsc 进行类型检查

# 测试
pnpm test:e2e               # 运行 Playwright E2E 测试

# Nuxt 工具
pnpm postinstall            # 生成 Nuxt 类型定义（等同于 npx nuxt prepare）
```

---

## Nuxt 核心概念

### 1. 文件系统路由

Nuxt 自动根据 `pages/` 目录结构生成路由：

| 文件路径 | 路由路径 |
|---------|---------|
| `pages/index.vue` | `/` |
| `pages/about.vue` | `/about` |
| `pages/users/[id].vue` | `/users/:id` |
| `pages/users/[id]/edit.vue` | `/users/:id/edit` |
| `pages/docs/[...slug].vue` | `/docs/:slug*` |

### 2. 自动导入

以下目录的内容会自动导入，无需手动 import：

- `components/` - Vue 组件
- `composables/` - 组合式函数
- `stores/` - Pinia stores
- `utils/` - 工具函数

### 3. 数据获取

```typescript
// 服务端数据获取（SEO 友好）
const { data, pending, error } = await useFetch('/api/data')

// 客户端延迟加载
const { data } = await useLazyFetch('/api/data')

// 带缓存的数据获取
const { data } = await useFetch('/api/data', {
  key: 'unique-key',
  server: false,  // 仅在客户端获取
  default: () => ({})  // 默认值
})
```

### 4. 服务端 API

```typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const users = await fetchUsers(query)
  return users
})

// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await createUser(body)
  return user
})
```

### 5. 布局系统

```vue
<!-- layouts/default.vue -->
<template>
  <div class="layout">
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>© 2024 elsfa-vue</footer>
  </div>
</template>
```

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

### 6. Pinia Store

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  
  // Getters
  const isLoggedIn = computed(() => !!user.value)
  
  // Actions
  async function login(credentials: LoginCredentials) {
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

---

## SSR 注意事项

### 客户端专属代码

```vue
<script setup lang="ts">
// 方法 1: 使用 onMounted
onMounted(() => {
  // 这里的代码只在客户端执行
  window.addEventListener('resize', handleResize)
})

// 方法 2: 使用 <ClientOnly> 组件
</script>

<template>
  <ClientOnly>
    <InteractiveMap />
    <template #fallback>
      <div>Loading map...</div>
    </template>
  </ClientOnly>
</template>
```

### 避免 Hydration Mismatch

- 不要在模板中使用 `Date.now()` 或 `Math.random()` 等不稳定的值
- 确保服务端和客户端渲染的初始状态一致
- 使用 `useState` 或 `useFetch` 管理共享状态

---

## Git 提交规范

```bash
# 格式：<type>(<scope>): <subject>

feat(pages): add user profile page
fix(auth): resolve login token issue
docs(readme): update installation steps
style(format): fix indentation in components
refactor(store): optimize state management
test(e2e): add tests for user login flow
chore(deps): update nuxt and vue dependencies
build(nuxt): configure static site generation
```

---

## 常见问题

### 1. TypeScript 类型错误

```bash
# 重新生成 Nuxt 类型定义
npx nuxt prepare

# 重启 IDE 或 TypeScript 服务
```

### 2. HMR 不生效

```bash
# 清除缓存并重启
rm -rf node_modules/.vite
rm -rf .nuxt
pnpm dev
```

### 3. 自动导入不生效

- 确保文件在正确的目录
- 检查文件名是否符合命名规范
- 重启开发服务器

---

## 相关文档

- [Nuxt 3 官方文档](https://nuxt.com/docs)
- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Nitro 服务器引擎](https://nitro.unjs.io/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Playwright 文档](https://playwright.dev/)

---

## Agent 任务指南

### 创建组件

1. 在 `components/` 目录下创建 `.vue` 文件
2. 使用 `<script setup lang="ts">` 语法
3. 使用 `defineProps` 和 `defineEmits` 定义接口
4. 利用 Nuxt 自动导入（无需手动导入 ref, computed 等）

### 创建页面

1. 在 `pages/` 目录下创建 `.vue` 文件
2. 使用 `definePageMeta` 定义页面元数据
3. 使用 `useFetch` 或 `useLazyFetch` 获取数据
4. 遵循文件系统路由约定

### 创建 API

1. 在 `server/api/` 目录下创建 `.ts` 文件
2. 使用 `defineEventHandler` 定义处理器
3. 使用 `getQuery`, `readBody`, `getRouterParams` 等工具函数
4. 文件名格式：`[name].[method].ts` 或 `[name]/index.[method].ts`

### 创建 Store

1. 在 `stores/` 目录下创建 `.ts` 文件
2. 使用 `defineStore` 和 Setup Store 模式
3. 返回 state, getters, actions
4. 在组件中直接调用 `useXxxStore()`（自动导入）

### 创建 Composable

1. 在 `composables/` 目录下创建 `.ts` 文件
2. 函数名以 `use` 开头
3. 返回需要在组件中使用的响应式数据和方法
4. 可以调用其他 composables 和 stores
