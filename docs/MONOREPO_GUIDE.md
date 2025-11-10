# Monorepo Development Guide

This document explains important considerations when developing in our Turborepo + pnpm monorepo setup.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Package Management](#package-management)
- [Configuration Files](#configuration-files)
- [Adding Dependencies](#adding-dependencies)
- [Common Workflows](#common-workflows)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

Our monorepo consists of:

```
cogni-frontend/
├── apps/
│   ├── web/          # Next.js web application
│   └── mobile/       # Expo React Native application
├── packages/         # Shared packages (future use)
├── docs/             # Documentation
├── turbo.json        # Turborepo pipeline configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json      # Root workspace manifest
```

### Key Technologies

- **pnpm**: Package manager with efficient dependency management
- **Turborepo**: Build system for running tasks across the monorepo
- **Corepack**: Node.js tool for managing package manager versions

---

## Package Management

### Why pnpm?

We use `pnpm` instead of `npm` or `yarn` because:

- **Efficient disk usage**: Stores packages in a global store with symlinks
- **Fast installs**: Parallel downloads and caching
- **Strict mode**: Better handling of peer dependencies
- **Native monorepo support**: Built-in workspace features
- **Better with Turborepo**: Recommended by Turbo team

### Package Manager Version

Our project uses **pnpm@9.15.0** enforced via `packageManager` field in root `package.json`:

```json
{
  "packageManager": "pnpm@9.15.0"
}
```

**Important**: Always use `pnpm` commands, never `npm` or `yarn`. Corepack ensures the correct version is used.

### Activating pnpm (First Time Setup)

If you get version mismatch errors:

```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
```

---

## Configuration Files

### Root-Level Configurations

#### `pnpm-workspace.yaml`

Defines which directories are part of the workspace:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Important**: 
- All packages under `apps/` and `packages/` are automatically linked
- Changes to this file require running `pnpm install`

#### `turbo.json`

Defines the task pipeline for Turborepo:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "lint": {}
  }
}
```

**Key Concepts**:
- `tasks`: Defines commands that Turborepo can orchestrate (previously `pipeline` in v1)
- `cache`: Whether to cache task outputs
- `persistent`: Keep the task running (for dev servers)
- `dependsOn`: Task dependencies (`^build` means "build dependencies first")
- `outputs`: Files/folders to cache for builds

**Common Changes**:
- Add new tasks when creating new package scripts
- Adjust cache settings for CI/CD optimization
- Define task dependencies for build order

#### Root `package.json`

Orchestrates workspace-level commands:

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
```

**Important**:
- `private: true` prevents accidental publishing
- `workspaces` tells pnpm which directories are packages
- Scripts run across ALL workspace packages

### App-Level Configurations

#### `apps/web/package.json` (Next.js)

```json
{
  "name": "web",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx"
  },
  "dependencies": { ... }
}
```

**Key Points**:
- Script names must match tasks in `turbo.json`
- Dependencies are installed at the workspace root
- Uses `@/*` path alias pointing to `./src/*`

#### `apps/mobile/package.json` (Expo)

```json
{
  "name": "mobile",
  "scripts": {
    "dev": "expo start",
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "lint": "expo lint"
  },
  "dependencies": { ... }
}
```

**Key Points**:
- Added `dev` script to match Turborepo convention
- Expo-specific scripts (`android`, `ios`) remain unchanged
- React Native dependencies managed separately

### TypeScript Configurations

#### `apps/web/tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Important**: Path aliases are relative to the app directory, not the workspace root.

### ESLint Configurations

Each app has its own `eslint.config.mjs`:

- **apps/web**: Next.js + TypeScript + Prettier rules
- **apps/mobile**: Expo-specific rules

**Note**: Consider creating a shared ESLint config in `packages/` for consistency.

---

## Adding Dependencies

### Adding to a Specific App

```bash
# Add to web app
pnpm --filter web add <package-name>

# Add dev dependency to mobile app
pnpm --filter mobile add -D <package-name>

# Examples
pnpm --filter web add axios
pnpm --filter mobile add react-native-svg
```

### Adding to Multiple Apps

```bash
# Add to both apps
pnpm --filter web --filter mobile add <package-name>

# Add to all workspaces
pnpm add <package-name> -w
```

### Adding to Root (Workspace Level)

```bash
# Root-level dev dependencies (e.g., linters, formatters)
pnpm add -D -w <package-name>

# Example: shared TypeScript config
pnpm add -D -w typescript
```

### Important Rules

❌ **DON'T**:
```bash
cd apps/web
pnpm add axios  # Don't do this! May bypass workspace
```

✅ **DO**:
```bash
# From root directory
pnpm --filter web add axios
```

### Checking Installed Packages

```bash
# List all dependencies in workspace
pnpm list --depth 0

# Check specific app dependencies
pnpm --filter web list

# Find where a package is installed
pnpm why <package-name>
```

---

## Common Workflows

### Starting Development

```bash
# Start all apps (web + mobile)
pnpm dev

# Start specific app
pnpm --filter web dev
pnpm --filter mobile dev
```

### Building for Production

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter web build
```

### Running Linters

```bash
# Lint all apps
pnpm lint

# Lint specific app
pnpm --filter web lint
```

### Installing Dependencies

```bash
# Install all workspace dependencies
pnpm install

# Clean install (removes node_modules first)
rm -rf node_modules apps/*/node_modules
pnpm install
```

### Running Scripts in Parallel

```bash
# Turbo runs tasks in parallel by default
pnpm dev  # Runs web and mobile dev servers in parallel
```

### Running Scripts Sequentially

```bash
# Build in dependency order
pnpm build  # turbo.json handles the order
```

---

## Troubleshooting

### Port Conflicts

**Problem**: Expo tries to use port 8081 already in use

```bash
# Find and kill the process
lsof -ti:8081 | xargs kill -9

# Or kill all expo processes
pkill -f "expo start"
```

### Peer Dependency Warnings

**Problem**: `WARN Issues with peer dependencies found`

This is common in monorepos. Usually safe to ignore unless causing runtime errors.

**Solution**: Add overrides if necessary:

```json
// Root package.json
{
  "pnpm": {
    "overrides": {
      "react": "19.1.0"
    }
  }
}
```

### Module Not Found Errors

**Problem**: Package installed but not found

```bash
# Reinstall dependencies
pnpm install

# Check if package is actually installed
pnpm --filter <app-name> list | grep <package-name>
```

### Turborepo Cache Issues

**Problem**: Stale cached builds

```bash
# Clear Turbo cache
pnpm turbo clean

# Force rebuild without cache
pnpm turbo run build --force
```

### pnpm Version Mismatch

**Problem**: `packageManager` version conflict

```bash
# Ensure Corepack is enabled
corepack enable

# Activate the project's pnpm version
corepack prepare pnpm@9.15.0 --activate

# Verify version
pnpm --version  # Should show 9.15.0
```

### Git Hooks Not Working

**Problem**: Husky hooks not running

```bash
# Reinstall hooks (from apps/web)
cd apps/web
pnpm prepare
```

### Metro Bundler Issues (Expo)

**Problem**: Expo/Metro cache causing issues

```bash
cd apps/mobile
pnpm start --clear  # Start with cache cleared
```

---

## Best Practices

### 1. Always Use Workspace Commands

Run commands from the root using filters:

```bash
# ✅ Good
pnpm --filter web add axios

# ❌ Bad
cd apps/web && pnpm add axios
```

### 2. Keep Shared Code in `packages/`

Create shared packages for:
- UI components
- Utilities
- Types/interfaces
- API clients

Example structure:
```
packages/
├── ui/           # Shared UI components
├── utils/        # Shared utilities
└── types/        # Shared TypeScript types
```

### 3. Version Consistency

Keep React/React Native versions aligned when possible:

```json
// apps/web/package.json & apps/mobile/package.json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0"  // web only
  }
}
```

### 4. Use Turbo for Everything

Add all common tasks to `turbo.json`:

```json
{
  "tasks": {
    "dev": { ... },
    "build": { ... },
    "lint": { ... },
    "test": { ... },      // Add when you add tests
    "type-check": { ... } // Add for TypeScript checking
  }
}
```

### 5. Document Package Dependencies

When adding a new dependency that affects multiple apps, document why:

```bash
# Add with comment in package.json or commit message
pnpm --filter web add @supabase/supabase-js
# Commit: "Add Supabase client for auth (web app only)"
```

### 6. Regular Dependency Updates

```bash
# Check outdated packages
pnpm outdated

# Update all dependencies interactively
pnpm update -i

# Update Turborepo
pnpm add -D -w turbo@latest
```

---

## Development Guidelines

### When to Add a Package to Root vs App

| Location | Use Case | Command |
|----------|----------|---------|
| Root | Dev tools (ESLint, Prettier, TypeScript) | `pnpm add -D -w <package>` |
| Root | Monorepo tools (Turborepo, Changesets) | `pnpm add -D -w <package>` |
| App | Runtime dependencies (React, APIs) | `pnpm --filter <app> add <package>` |
| App | App-specific tools (Metro, Next.js) | `pnpm --filter <app> add -D <package>` |

### Creating a New App

1. Create directory under `apps/`
2. Initialize with framework CLI
3. Add standard scripts (`dev`, `build`, `lint`)
4. Update `turbo.json` if needed
5. Run `pnpm install` from root

### Creating a Shared Package

1. Create directory under `packages/`
2. Add `package.json`:

```json
{
  "name": "@cogni/ui",
  "version": "0.0.1",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

3. Use in apps:

```json
// apps/web/package.json
{
  "dependencies": {
    "@cogni/ui": "workspace:*"
  }
}
```

---

## CI/CD Considerations

### Caching Strategy

Turborepo caches task outputs for faster builds:

```bash
# Enable remote caching (optional)
pnpm turbo link

# CI build command with cache
pnpm turbo run build --cache-dir=.turbo
```

### Selective App Deployment

Deploy only changed apps:

```bash
# Check which apps changed
pnpm turbo run build --filter=[HEAD^1]

# Or use dedicated deploy commands per app
pnpm --filter web build  # Deploy web only
```

---

## Additional Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspace Docs](https://pnpm.io/workspaces)
- [Expo in Monorepo](https://docs.expo.dev/guides/monorepos/)
- [Next.js in Monorepo](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Summary Checklist

- ✅ Always use `pnpm` commands (never `npm` or `yarn`)
- ✅ Add dependencies with `--filter` flag
- ✅ Run tasks from root using `pnpm dev`, `pnpm build`, etc.
- ✅ Update `turbo.json` when adding new tasks
- ✅ Keep script names consistent across apps
- ✅ Use workspace protocol (`workspace:*`) for internal packages
- ✅ Clear caches when troubleshooting
- ✅ Document significant dependency changes

---

**Last Updated**: November 10, 2025  
**Monorepo Version**: Turborepo 2.6.0 + pnpm 9.15.0

