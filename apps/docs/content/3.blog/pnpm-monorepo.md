---
title: "使用 pnpm 构建高效的 Monorepo 项目"
description: "深入探讨 pnpm 的工作区特性，以及如何利用它构建可扩展的 Monorepo 架构"
date: "2026-03-28"
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80
---

# 使用 pnpm 构建高效的 Monorepo 项目

在现代前端开发中，Monorepo（单一代码库）架构已经成为管理大型项目的标准实践。本文将深入介绍如何使用 pnpm 工作区（Workspace）功能构建高效的 Monorepo 项目。

## 什么是 Monorepo？

Monorepo 是一种将多个相关项目存储在同一个代码仓库中的开发策略。与多仓库（Multi-repo）相比，Monorepo 提供了以下优势：

- **代码共享**：轻松共享代码和组件
- **统一版本管理**：保持依赖版本一致性
- **原子提交**：跨项目的代码变更可以一次性提交
- **简化协作**：团队成员可以在同一仓库中协作

## 为什么选择 pnpm？

pnpm 是一个快速、节省磁盘空间的包管理器，它的工作区功能特别适合 Monorepo：

### 1. 高效的磁盘利用

pnpm 使用内容可寻址存储，所有包只会在磁盘上存储一次：

```
node_modules
├── .pnpm/          # 全局存储，所有项目共享
├── web/            # 项目 A 的依赖链接
└── docs/           # 项目 B 的依赖链接
```

### 2. 严格依赖管理

pnpm 默认不会提升依赖，避免了幽灵依赖问题：

```bash
# 错误：在其他包管理器中可能工作
import lodash from 'lodash'  # 未声明的依赖

# pnpm 会严格检查，确保依赖已声明
```

### 3. 原生工作区支持

pnpm 内置工作区功能，无需额外工具：

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

## 搭建 Monorepo 项目

### 第一步：初始化项目

```bash
mkdir my-monorepo
cd my-monorepo
pnpm init
```

### 第二步：配置工作区

创建 `pnpm-workspace.yaml` 文件：

```yaml
packages:
  # 所有子包目录
  - 'packages/*'
  - 'apps/*'
```

### 第三步：创建项目结构

```
my-monorepo/
├── apps/
│   ├── web/           # 主应用
│   └── docs/          # 文档站点
├── packages/
│   ├── ui/            # 共享 UI 组件
│   ├── utils/         # 工具函数
│   └── config/        # 共享配置
├── package.json       # 根 package.json
└── pnpm-workspace.yaml
```

### 第四步：配置根 package.json

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm --filter web dev",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 工作区命令详解

### 过滤特定包

```bash
# 在特定包中运行命令
pnpm --filter web dev

# 在多个包中运行
pnpm --filter "./packages/*" build
```

### 递归执行

```bash
# 在所有包中运行
pnpm -r build

# 并行执行
pnpm --parallel -r dev
```

### 工作区依赖

在包之间建立依赖关系：

```json
// apps/web/package.json
{
  "dependencies": {
    "@my-monorepo/ui": "workspace:*",
    "@my-monorepo/utils": "workspace:*"
  }
}
```

使用 `workspace:*` 协议，pnpm 会自动链接本地包：

```bash
cd apps/web
pnpm add @my-monorepo/ui --workspace
```

## 高级配置技巧

### 1. 共享 TypeScript 配置

```json
// packages/config/tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

// apps/web/tsconfig.json
{
  "extends": "@my-monorepo/config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### 2. 共享 ESLint 配置

```javascript
// packages/config/eslint.config.js
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    // 共享规则
  }
}
```

### 3. 使用 pnpm hooks

创建 `.pnpmfile.cjs` 自定义依赖解析：

```javascript
module.exports = {
  hooks: {
    readPackage(pkg) {
      // 自动添加 peer dependencies
      if (pkg.name === 'some-package') {
        pkg.peerDependencies = {
          ...pkg.peerDependencies,
          react: '^18.0.0'
        }
      }
      return pkg
    }
  }
}
```

## 最佳实践

### 1. 版本管理策略

```bash
# 使用 changesets 管理版本
pnpm add -D @changesets/cli
pnpm changeset init
```

### 2. 任务管道

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'

# 定义任务依赖
# pnpm --filter docs build
# 会自动先构建其依赖
```

### 3. CI/CD 集成

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

### 4. 目录结构约定

```
my-monorepo/
├── apps/              # 可部署的应用
│   ├── web/
│   └── mobile/
├── packages/          # 共享库
│   ├── ui/           # UI 组件
│   ├── utils/        # 工具函数
│   ├── hooks/        # React/Vue Hooks
│   └── types/        # 共享类型
├── tools/            # 构建工具
│   └── eslint-config/
└── scripts/          # 自动化脚本
```

## 常见问题解决

### 1. 依赖冲突

```bash
# 查看依赖树
pnpm list --depth=10

# 强制使用特定版本
pnpm add lodash@4.17.21 --force
```

### 2. 工作区链接问题

```bash
# 重新安装依赖
pnpm install --frozen-lockfile

# 清除缓存
pnpm store prune
```

### 3. 脚本执行顺序

```json
{
  "scripts": {
    "build:packages": "pnpm --filter './packages/*' build",
    "build:apps": "pnpm --filter './apps/*' build",
    "build": "pnpm build:packages && pnpm build:apps"
  }
}
```

## 总结

pnpm 工作区为 Monorepo 提供了轻量级、高效的解决方案。通过合理配置和最佳实践，你可以：

- 提高开发效率
- 降低维护成本
- 实现代码的最大化复用
- 保持项目的一致性和可扩展性

对于中小型团队，pnpm 工作区是一个比 Turborepo、Nx 等工具更简单的选择，同时提供了足够的功能支持。

## 参考资源

- [pnpm 官方文档](https://pnpm.io/workspaces)
- [Monorepo 工具对比](https://monorepo.tools/)
- [Changesets 版本管理](https://github.com/changesets/changesets)

---

希望这篇文章能帮助你更好地理解和使用 pnpm Monorepo！
