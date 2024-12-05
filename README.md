# LuxianAI

LuxianAI 是一个基于 Vue 3 + TypeScript + Electron 的桌面应用项目，包含 PC 网页版和桌面客户端两个版本。

## 项目结构

```
luxianai/
├── pc/                 # PC 网页版
│   ├── src/           # 源代码
│   │   ├── router/   # 路由配置
│   │   ├── App.vue   # 根组件
│   │   └── main.ts   # 入口文件
│   ├── public/        # 静态资源
│   └── ...           # 其他配置文件
├── electron/          # 桌面客户端
│   ├── src/
│   │   ├── main/     # 主进程
│   │   ├── preload/  # 预加载脚本
│   │   └── renderer/ # 渲染进程
│   ├── resources/    # 应用资源
│   └── build/        # 构建配置
└── shared/           # 共享组件和资源
    └── components/   # 共享组件
```

## 技术栈

- 🚀 Vue 3 - 渐进式 JavaScript 框架
- 📦 Vite - 下一代前端构建工具
- 🔧 TypeScript - JavaScript 的超集
- ⚡️ Electron - 跨平台桌面应用开发框架
- 📱 Electron-Builder - electron 应用打包工具
- 📦 pnpm - 快速的，节省磁盘空间的包管理工具

## 开发环境要求

- Node.js 16+
- pnpm 8+

## 快速开始

1. 克隆项目
```bash
git clone git@github.com:Zhe28/luxianai.git
cd luxianai
```

2. 安装依赖
```bash
pnpm install
```

3. 启动 PC 网页版
```bash
cd pc
pnpm dev
```

4. 启动桌面客户端
```bash
cd electron
pnpm dev
```

## 构建

1. 构建 PC 网页版
```bash
cd pc
pnpm build
```

2. 构建桌面客户端
```bash
cd electron
pnpm build
```

## 项目配置说明

### 工作空间配置
使用 pnpm workspace 管理多项目，配置文件为 `pnpm-workspace.yaml`

### 路径别名
- PC 网页版 (`pc/vite.config.ts`):
  ```ts
  '@': './src'
  '@shared': '../shared'
  '@shared-components': '../shared/components'
  ```
- 桌面客户端 (`electron/electron.vite.config.ts`):
  ```ts
  '@renderer': 'src/renderer/src'
  '@shared': '../shared'
  '@shared-components': '../shared/components'
  ```

## 开发规范

- 使用 ESLint 进行代码规范检查
- 使用 Prettier 进行代码格式化
- Git commit 遵循 conventional commit 规范
  - feat: 新功能
  - fix: 修复问题
  - docs: 文档修改
  - style: 代码格式修改
  - refactor: 代码重构
  - perf: 性能优化
  - test: 测试相关
  - chore: 其他修改

## 许可证

[MIT License](LICENSE)
