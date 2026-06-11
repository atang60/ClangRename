# 🔄 Renamed - Batch File Renamer

A cross-platform (macOS & Windows) desktop application for batch renaming files with multiple stackable rules and live preview.

## Features

- 🗂️ **File Management** — Drag & drop, select files/folders, filter by extension
- 🔧 **7 Rename Rules** — Stackable and reorderable:
  - Find & Replace (with case sensitivity)
  - Prefix / Suffix
  - Sequential Numbering
  - Case Change (upper/lower/title/sentence)
  - Regex Replace (with capture groups)
  - Remove Characters (by text or position range)
  - Insert Text (at any position)
- 👁️ **Live Preview** — Real-time diff highlighting of changes
- ⚠️ **Conflict Detection** — Warns when two files would have the same output name
- ↩️ **Undo** — Reverse the last batch rename operation
- 📥📤 **Import/Export** — Save and share rename rule profiles
- 🌓 **Dark/Light Theme** — Pleasing in any lighting

## Tech Stack

- **Electron** 21 — Cross-platform desktop shell
- **Vue 3** + Composition API — Reactive UI
- **Pinia** — State management
- **TypeScript** — Type safety throughout
- **Vite** — Fast dev server and build

## Development

### Prerequisites
- Node.js >= 14.21 (recommended: 18+)
- npm >= 6.14

### Setup

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts Vite dev server and opens an Electron window with hot reload.

### Build

```bash
npm run build
```

### Package

```bash
# macOS
npm run package:mac

# Windows
npm run package:win

# Both
npm run package:all
```

Output will be in the `release/` directory.

## Project Structure

```
renamed/
├── electron/           # Electron main process
│   ├── main.ts         # Window creation, lifecycle
│   ├── preload.ts      # Secure context bridge
│   └── ipc/            # IPC handlers
├── src/                # Vue renderer
│   ├── components/     # UI components
│   ├── stores/         # Pinia stores
│   ├── engine/         # Rename logic (pure functions)
│   └── types/          # TypeScript types
├── resources/          # App icons
└── vite.config.ts      # Vite config
```

## License

MIT
