# elsfa-vue 项目说明文档

## 📖 项目简介

elsfa-vue 是一个基于 Vue 3.6（beta 版本）构建的现代化前端项目模板，采用 Vite 8.0（beta 版本）作为构建工具。该项目提供了完整的开发工具链，包括类型检查、代码规范、单元测试和端到端测试等功能。

## 🏗️ 技术架构

### 核心技术栈

- **框架**: Vue 3.6.0-beta.9 (Composition API)
- **构建工具**: Vite 8.0.0-beta.18
- **语言**: TypeScript 5.9.3
- **状态管理**: Pinia 3.0.4
- **路由**: Vue Router 5.0.3

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
├── src/                      # 源代码目录
│   ├── main.ts              # 应用入口文件
│   ├── App.vue              # 根组件
│   ├── router/              # 路由配置
│   │   └── index.ts        # 路由定义
│   └── stores/              # Pinia 状态管理
│       └── counter.ts      # 示例 store
├── public/                   # 静态资源目录
├── e2e/                      # E2E 测试目录
│   └── vue.spec.ts         # E2E 测试用例
├── src/__tests__/           # 单元测试目录
│   └── App.spec.ts         # 组件测试用例
├── .vscode/                  # VSCode 配置
├── .idea/                    # IDEA 配置
├── index.html               # HTML 入口
├── vite.config.ts           # Vite 配置文件
├── tsconfig.json            # TypeScript 配置
├── eslint.config.ts         # ESLint 配置
├── oxlintrc.json            # Oxlint 配置
├── playwright.config.ts     # Playwright 配置
└── package.json             # 项目依赖配置
```

## 🔧 配置文件说明

### 1. Vite 配置 (vite.config.ts)

```typescript
plugins: [
  vue(),           // Vue 3 支持
  vueJsx(),        // JSX 支持
  vueDevTools(),   // DevTools 集成
]
resolve: {
  alias: {
    '@': '/src'    // 路径别名
  }
}
```

### 2. TypeScript 配置

项目采用多配置文件模式：
- `tsconfig.app.json` - 应用代码配置
- `tsconfig.node.json` - Node.js 环境配置
- `tsconfig.vitest.json` - 测试配置

### 3. 代码规范配置

- **EditorConfig**: 统一编辑器的基本设置（缩进、编码等）
- **ESLint**: 全面的代码质量检查
- **Oxlint**: 快速的 lint 检查

## 🎯 核心功能模块

### 1. 路由系统

使用 Vue Router 5，采用 history 模式：

```typescript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})
```

### 2. 状态管理 (Pinia)

示例：counter store

```typescript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})
```

### 3. 应用入口 (main.ts)

```typescript
const app = createApp(App)
app.use(createPinia())  // 注册 Pinia
app.use(router)         // 注册路由
app.mount('#app')       // 挂载应用
```

## 🚀 特性亮点

### 1. 极速开发体验
- Vite 带来的秒级热更新
- 即时启动的开发服务器
- 高效的热模块替换 (HMR)

### 2. 完整的类型系统
- TypeScript 全面覆盖
- Vue 3 的 Composition API 类型推导
- `.vue` 文件的完整类型支持

### 3. 质量保证体系
- 多层 lint 检查（ESLint + Oxlint）
- 单元测试（Vitest）
- E2E 测试（Playwright）
- 自动化代码格式化

### 4. 现代化工作流
- 统一的代码风格（EditorConfig）
- Git Hooks 集成潜力
- CI/CD 友好

## 📝 最佳实践

### 1. 组件开发

推荐使用 `<script setup>` 语法：

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ msg: string }>()
const emit = defineEmits<{ change: [value: string] }>()
</script>
```

### 2. 状态管理

使用 Pinia 的 setup store 模式：

```typescript
export const useStore = defineStore('storeName', () => {
  // state
  const data = ref(null)
  
  // getters
  const computedValue = computed(() => data.value)
  
  // actions
  function fetchData() {}
  
  return { data, computedValue, fetchData }
})
```

### 3. 路由配置

在 `src/router/index.ts` 中定义路由：

```typescript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  }
]
```

### 4. 路径别名

使用 `@` 别名导入 src 下的文件：

```typescript
import MyComponent from '@/components/MyComponent.vue'
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
项目使用了 Vue 3.6 和 Vite 8.0 的 beta 版本：
- 可能存在不稳定性
- API 可能发生变化
- 生产环境使用需谨慎

### 2. Node.js 版本要求
- Node.js ^20.19.0 或 >=22.12.0
- 使用 pnpm 作为包管理器

### 3. 类型检查
- `.vue` 文件需要 Volar 插件支持
- 确保 IDE 已正确配置 TypeScript

## 📚 相关资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vite.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vitest 文档](https://vitest.dev/)
- [Playwright 文档](https://playwright.dev/)

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

查看 [LICENSE](LICENSE) 文件了解详情。
