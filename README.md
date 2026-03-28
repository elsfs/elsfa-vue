# elsfa-vue

这个模板可以帮助你在 Vite 中快速开始使用 Vue 3 进行开发。

## 推荐的 IDE 设置

[VS Code](https://code.visualstudio.com/) + [Vue（官方）](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并请禁用 Vetur）。

## 推荐的浏览器设置

- 基于 Chromium 的浏览器（Chrome、Edge、Brave 等）：
  - 安装 [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - 在 Chrome DevTools 中[开启自定义对象格式化器](http://bit.ly/object-formatters)
- Firefox：
  - 安装 [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - 在 Firefox DevTools 中[开启自定义对象格式化器](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 在 TS 中对 `.vue` 导入的类型支持

TypeScript 默认无法处理对 `.vue` 导入的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` CLI 进行类型检查。在编辑器中需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 以使 TypeScript 语言服务识别 `.vue` 类型。

## 自定义配置

参阅 [Vite 配置参考](https://vite.dev/config/)。

## 项目安装

```sh
pnpm install
```

### 开发环境编译与热重载

```sh
pnpm dev
```

### 生产环境类型检查、编译与压缩

```sh
pnpm build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
pnpm test:unit
```

### 使用 [Playwright](https://playwright.dev) 运行端到端测试

```sh
# 第一次运行前安装浏览器
npx playwright install

# 在 CI 上测试前需要先构建项目
pnpm build

# 运行端到端测试
pnpm test:e2e
# 仅在 Chromium 上运行
pnpm test:e2e --project=chromium
# 运行指定测试文件
pnpm test:e2e tests/example.spec.ts
# 以调试模式运行
pnpm test:e2e --debug
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
pnpm lint
```
