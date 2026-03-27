# elsfa-vue 开发使用指南

## 🚀 快速开始

### 环境要求

- **Node.js**: ^20.19.0 或 >=22.12.0
- **包管理器**: pnpm (推荐)
- **编辑器**: VS Code（推荐）或其他支持 Vue 3 的编辑器

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

访问 http://localhost:5173 查看应用。

## 📋 开发命令详解

### 开发相关

#### 启动开发服务器

```bash
pnpm dev
```

**功能**:
- 启动 Vite 开发服务器
- 启用热模块替换 (HMR)
- 即时编译和预览

#### 类型检查

```bash
pnpm type-check
```

**功能**:
- 使用 vue-tsc 进行 TypeScript 类型检查
- 验证 `.vue` 文件的类型定义
- 构建前建议执行此命令

### 构建相关

#### 生产构建

```bash
pnpm build
```

**功能**:
- 执行类型检查
- 编译和压缩代码
- 生成生产就绪的静态资源
- 输出到 `dist/` 目录

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

#### 预览生产构建

```bash
pnpm preview
```

**功能**:
- 在本地服务器上预览生产构建
- 默认端口：4173
- 用于部署前验证构建结果

### 测试相关

#### 运行单元测试

```bash
pnpm test:unit
```

**功能**:
- 使用 Vitest 运行单元测试
- 支持 watch 模式（文件变更自动重跑）
- 生成覆盖率报告（需配置）

**常用选项**:
```bash
# watch 模式
pnpm test:unit --watch

# 运行特定文件
pnpm test:unit src/__tests__/App.spec.ts

# 生成覆盖率报告
pnpm test:unit --coverage
```

#### 运行 E2E 测试

```bash
# 首次使用需安装浏览器
npx playwright install

# 运行所有 E2E 测试
pnpm test:e2e

# 仅在 Chromium 上运行
pnpm test:e2e --project=chromium

# 运行特定测试文件
pnpm test:e2e tests/example.spec.ts

# 调试模式
pnpm test:e2e --debug
```

**CI 环境注意事项**:
```bash
# CI 上必须先构建项目
pnpm build
pnpm test:e2e
```

### 代码质量相关

#### 代码检查

```bash
pnpm lint
```

**功能**:
- 运行 ESLint 检查
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

#### 单独运行 ESLint

```bash
pnpm lint:eslint
```

**特点**:
- 更全面的规则检查
- 支持 Vue 文件
- 支持 TypeScript

#### 代码格式化

```bash
pnpm format
```

**功能**:
- 使用 oxfmt 格式化代码
- 统一代码风格

## 💻 日常开发工作流

### 1. 创建新组件

```bash
# 在 src/components 目录下创建
# src/components/MyComponent.vue
```

示例结构：
```vue
<script setup lang="ts">
import { ref } from 'vue'

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

### 2. 创建页面视图

```bash
# 在 src/views 目录下创建
# src/views/Home.vue
```

### 3. 添加路由

编辑 `src/router/index.ts`:

```typescript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]
```

### 4. 创建 Store

在 `src/stores` 目录下创建：

```typescript
// src/stores/user.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // State
  const name = ref('')
  const email = ref('')
  
  // Getters
  const displayName = computed(() => name.value.toUpperCase())
  
  // Actions
  function login(userData: { name: string; email: string }) {
    name.value = userData.name
    email.value = userData.email
  }
  
  function logout() {
    name.value = ''
    email.value = ''
  }
  
  return { name, email, displayName, login, logout }
})
```

在组件中使用：

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function handleLogin() {
  userStore.login({
    name: 'John',
    email: 'john@example.com'
  })
}
</script>
```

### 5. 编写单元测试

在 `src/__tests__` 或 `*.spec.ts` 文件中：

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Hello' }
    })
    expect(wrapper.text()).toContain('Hello')
  })
})
```

### 6. 编写 E2E 测试

在 `e2e` 目录下：

```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test('home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/My App/)
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
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🎨 代码规范

### 命名规范

#### 文件和文件夹
- 组件文件：**PascalCase** (如 `MyComponent.vue`)
- 工具函数：**camelCase** (如 `utils.ts`)
- 视图文件：**PascalCase** (如 `HomePage.vue`)
- Store 文件：**camelCase** (如 `user.ts`)

#### 变量和函数
- 变量名：**camelCase**
- 常量：**UPPER_SNAKE_CASE**
- 组件名：**PascalCase**
- Props 和 emits：**camelCase**

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
feat(router): add user management routes
fix(auth): resolve login token issue
docs(readme): update installation steps
style(format): fix indentation in components
refactor(store): optimize state management
test(unit): add tests for user store
chore(deps): update dependencies
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
pnpm dev
```

### 2. TypeScript 类型错误

**问题**: `.vue` 文件导入报类型错误

**解决方案**:
- 确保安装了 Volar 插件
- 重启 TypeScript 服务
- 检查 `tsconfig.app.json` 配置

### 3. HMR 不生效

**问题**: 文件修改后没有热更新

**解决方案**:
```bash
# 重启开发服务器
# 清除 vite 缓存
rm -rf node_modules/.vite
pnpm dev
```

### 4. E2E 测试失败

**问题**: Playwright 测试无法运行

**解决方案**:
```bash
# 安装浏览器
npx playwright install

# 如果是 Linux/Mac，可能需要安装系统依赖
npx playwright install-deps
```

### 5. Lint 错误过多

**问题**: `pnpm lint` 报告大量错误

**解决方案**:
```bash
# 自动修复可修复的错误
pnpm lint

# 如果仍有问题，手动逐个修复
# 或使用 eslint-disable 注释临时忽略
```

## 📦 部署指南

### 构建生产版本

```bash
pnpm build
```

构建产物将在 `dist/` 目录。

### 本地预览

```bash
pnpm preview
```

### 部署到静态托管

将 `dist/` 目录上传到：
- Vercel
- Netlify
- GitHub Pages
- 其他静态网站托管服务

### 环境变量

创建 `.env` 文件：

```bash
# .env.production
VITE_APP_TITLE=My Production App
VITE_API_URL=https://api.example.com
```

在代码中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 🎯 性能优化建议

### 1. 代码分割

使用动态导入实现路由懒加载：

```typescript
const routes = [
  {
    path: '/heavy',
    component: () => import('@/views/HeavyPage.vue')
  }
]
```

### 2. 组件优化

- 使用 `v-once` 标记不变化的内容
- 使用 `Object.freeze()` 冻结大型静态数据
- 避免在内联函数中创建新对象

### 3. 图片优化

- 使用现代图片格式 (WebP)
- 实现懒加载
- 压缩图片资源

### 4. 打包分析

```bash
# 安装 rollup-plugin-visualizer
pnpm add -D rollup-plugin-visualizer

# 在 vite.config.ts 中添加
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer()
  ]
})
```

## 📚 学习资源

### 官方文档
- [Vue 3](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

### 教程和指南
- [Vue School](https://vueschool.io/)
- [Vue Mastery](https://www.voemastery.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

## 🤝 获取帮助

遇到问题时：
1. 查看本文档
2. 搜索官方文档
3. 查看项目的 Issues
4. 在社区论坛提问（Vue Forum、Stack Overflow）

---

**提示**: 建议在开发过程中保持终端常开，以便随时查看构建和测试输出。
