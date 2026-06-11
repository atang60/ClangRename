# ClangRename / Clang 重命名工具

简体中文 & English — 中英双语说明

## 简介 (中文)

ClangRename 是一款跨平台（macOS 与 Windows）的桌面批量重命名工具，支持多条可叠加的重命名规则与实时预览，适合整理大量文件名或批量重构命名规范。

## Overview (English)

ClangRename is a cross-platform (macOS & Windows) desktop application for batch renaming files. It supports multiple stackable rules, live preview with diffs, conflict detection, and undo for safe bulk operations.

## 主要功能 / Features

- 拖拽与选择文件/文件夹，按扩展名过滤 (Drag & drop, select files/folders, filter by extension)
- 可叠加的重命名规则 (Stackable rename rules):
  - 查找并替换（支持大小写敏感）(Find & Replace, optional case sensitivity)
  - 前缀 / 后缀 (Prefix / Suffix)
  - 序列编号 (Sequential Numbering)
  - 大小写转换 (Case Change: upper/lower/title/sentence)
  - 正则替换（支持捕获组）(Regex Replace)
  - 删除字符（按文本或位置范围）(Remove Characters)
  - 插入文本（任意位置）(Insert Text)
- 实时预览及差异高亮 (Live preview with diff highlighting)
- 冲突检测与提示 (Conflict detection)
- 批量重命名撤销 (Undo last batch operation)
- 导入/导出规则配置 (Import/Export rule profiles)
- 明/暗主题支持 (Light/Dark themes)

## 技术栈 / Tech Stack

- Electron — 桌面应用容器 (Electron)
- Vue 3 + Composition API — 前端框架 (Vue 3)
- Pinia — 状态管理 (Pinia)
- TypeScript — 类型支持 (TypeScript)
- Vite — 构建与开发服务器 (Vite)

## 开发 / Development

### 前置条件 / Prerequisites

- Node.js >= 14.21（推荐 18+）
- npm >= 6.14

### 快速开始 / Setup

```bash
npm install
```

### 本地开发 / Run locally

```bash
npm run dev
```

启动后会打开带热重载的 Electron 窗口。

### 构建 / Build

```bash
npm run build
```

### 打包 / Package

```bash
# macOS
npm run package:mac

# Windows
npm run package:win

# All
npm run package:all
```

产物将输出到 `release/` 目录，请确保该目录已被 `.gitignore` 忽略以免提交打包文件。

## 项目结构 / Project Structure

```
renamed/
├── electron/           # Electron 主进程
│   ├── main.ts         # 窗口创建与生命周期
│   ├── preload.ts      # 安全 context bridge
│   └── ipc/            # IPC 处理器
├── src/                # Vue 渲染进程
│   ├── components/     # 组件
│   ├── stores/         # Pinia 状态管理
│   ├── engine/         # 重命名算法与逻辑
│   └── types/          # TypeScript 类型
├── resources/          # 应用图标与资源
└── vite.config.ts      # Vite 配置
```

## 许可 / License

Clang 辰朗科技
