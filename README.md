# Cogni Frontend

A monorepo containing the frontend applications for Cogni, an AI-powered work management platform that automates planning, task management, and workflow coordination.

## 🏗️ Architecture

This is a **Turborepo + pnpm** monorepo containing multiple applications and shared packages:

```
cogni-frontend/
├── apps/
│   ├── web/          # Main Next.js web application
│   ├── home/         # Marketing/landing page (Next.js)
│   └── mobile/       # Expo React Native mobile app
├── packages/
│   ├── api/          # Shared API client and hooks
│   ├── types/        # Shared TypeScript types
│   ├── utils/        # Shared utilities
│   └── pricing/         # Pricing components and constants
├── docs/             # Documentation
└── supabase/         # Supabase functions and migrations
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Mobile**: Expo (React Native)
- **Package Manager**: pnpm 9.15.0
- **Build System**: Turborepo
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4
- **Rich Text Editing**: TipTap with Y.js (collaborative editing)
- **AI Integration**: CopilotKit, OpenAI SDK
- **State Management**: SWR, React Context
- **Type Safety**: TypeScript 5

## 📋 Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** 9.15.0 (enforced via `packageManager` field)
- **Corepack** (for automatic pnpm version management)

### First-Time Setup

1. **Enable Corepack** (if not already enabled):
   ```bash
   corepack enable
   corepack prepare pnpm@9.15.0 --activate
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   
   Each app has a `.env.example` file with all required environment variables. Copy it to create your local environment file:
   
   ```bash
   # For web and home apps (Next.js)
   cp apps/web/.env.example apps/web/.env.local
   cp apps/home/.env.example apps/home/.env.local
   
   # For mobile app (Expo)
   cp apps/mobile/.env.example apps/mobile/.env
   ```
   
   Then fill in your actual values in the `.env.local` (or `.env` for mobile) files. See the `.env.example` files for all required variables and their descriptions.

## 🚀 Getting Started

### Development

Start all applications in development mode:

```bash
pnpm dev
```

This runs all apps in parallel:
- **Web app**: http://localhost:3000
- **Home app**: http://localhost:3002
- **Mobile app**: Expo DevTools (port 8081)

### Run Individual Apps

```bash
# Web application only
pnpm --filter web dev

# Marketing site only
pnpm --filter home dev

# Mobile app only
pnpm --filter mobile dev
```

### Build

Build all applications for production:

```bash
pnpm build
```

Build a specific app:

```bash
pnpm --filter web build
```

### Lint

Lint all applications:

```bash
pnpm lint
```

## 📦 Project Structure

### Applications

- **`apps/web`**: Main application with features for notes, threads, tasks, workspaces, and AI-powered workflows
- **`apps/home`**: Marketing website with landing page, pricing, and contact forms
- **`apps/mobile`**: React Native mobile application (Expo)

### Shared Packages

- **`packages/api`**: Supabase client, API hooks, and data fetching utilities
- **`packages/types`**: Shared TypeScript type definitions
- **`packages/utils`**: Shared utility functions (cookies, helpers, etc.)
- **`packages/pricing`**: Pricing-related components and constants

## 🔧 Available Scripts

### Root Level

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm lint` - Lint all apps

### App-Specific Scripts

Each app has its own scripts. Run them with:

```bash
pnpm --filter <app-name> <script>
```

**Web App** (`apps/web`):
- `dev` - Start Next.js dev server with Turbopack
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `type-check` - Run TypeScript type checking

**Home App** (`apps/home`):
- `dev` - Start Next.js dev server (port 3002)
- `build` - Build for production
- `start` - Start production server

**Mobile App** (`apps/mobile`):
- `dev` - Start Expo development server
- `android` - Run on Android
- `ios` - Run on iOS

## 📚 Documentation

- **[Monorepo Guide](./docs/MONOREPO_GUIDE.md)** - Comprehensive guide to working with the monorepo
- **[CopilotKit Docs](./docs/CopilotKit.md)** - AI integration documentation
- **[Vercel Deployment](./docs/VERCEL_DEPLOYMENT.md)** - Deployment instructions

## 🔑 Key Features

- **Collaborative Notes**: Real-time collaborative editing with TipTap and Y.js
- **AI-Powered Workflows**: Intelligent task management and automation
- **Thread Management**: Organize conversations and work items
- **Workspace Collaboration**: Multi-user workspace management
- **File Management**: Upload, preview, and manage files
- **Cross-Platform**: Web and mobile applications

## 🧩 Adding Dependencies

### To a Specific App

```bash
# Add to web app
pnpm --filter web add <package-name>

# Add dev dependency
pnpm --filter web add -D <package-name>
```

### To Root (Workspace Level)

```bash
# Add dev dependency to root
pnpm add -D -w <package-name>
```

**Important**: Always use `pnpm` commands from the root directory with the `--filter` flag. Never use `npm` or `yarn`.

## 🐛 Troubleshooting

### pnpm Version Mismatch

```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
```

### Clear Caches

```bash
# Clear Turborepo cache
pnpm turbo clean

# Clear pnpm cache
pnpm store prune
```

### Module Not Found

```bash
# Reinstall dependencies
pnpm install
```

For more troubleshooting tips, see the [Monorepo Guide](./docs/MONOREPO_GUIDE.md#troubleshooting).

## 📝 Development Guidelines

- Always use `pnpm` commands (never `npm` or `yarn`)
- Run commands from the root directory using `--filter` flag
- Keep shared code in `packages/` directory
- Use workspace protocol (`workspace:*`) for internal package dependencies
- Follow TypeScript strict mode guidelines
- Run linting and type checking before committing

## 🔗 Related Repositories

- **Backend**: [cogni-backend](../cogni-backend) - FastAPI backend service
- **Hocuspocus**: [cogni-hocuspocus](../cogni-hocuspocus) - Collaborative editing server

## 📄 License

Private - All rights reserved
