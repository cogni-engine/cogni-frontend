# Vercel Deployment Guide for Monorepo

This guide covers deploying the Next.js web app from our Turborepo monorepo to Vercel.

## 🎯 Overview

Our monorepo structure requires special Vercel configuration to ensure:
- Vercel builds from the workspace root
- Only the `web` app is deployed
- pnpm and Turborepo work correctly
- Environment variables reach the right app

---

## 📋 Initial Vercel Setup

### Option 1: Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   
   **Root Directory**: 
   - **IMPORTANT**: Leave as `.` (root of repository)
   - ⚠️ Do NOT set to `apps/web` - this causes dependency issues

   **Framework Preset**: 
   - Set to "Other" (we'll use custom commands)
   - Next.js auto-detect won't work with monorepo structure

   **Build & Development Settings**:
   ```
   Build Command: pnpm turbo run build --filter=web
   Install Command: pnpm install
   Output Directory: apps/web/.next
   ```

   **Node Version**:
   - Set to `22.x` (matches your local environment)
   
   **Why these settings?**
   - Root directory as `.` ensures pnpm can access workspace config
   - Turbo builds only the web app from the correct context
   - Output path points to where Next.js actually builds

3. **Environment Variables**
   
   Add these secrets (same as before):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   OPENAI_API_KEY=your_openai_key
   ```

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Navigate to web app
cd apps/web

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Confirm settings
```

---

## 🔧 Configuration Files

### `vercel.json` (Root)

Located at repository root with monorepo-specific config:

```json
{
  "buildCommand": "pnpm turbo run build --filter=web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "pnpm install --no-frozen-lockfile",
  "framework": null,
  "functions": {
    "apps/web/src/app/api/copilotkit/route.ts": {
      "maxDuration": 60
    }
  }
}
```

**Key Points**:
- `framework: null` - Disables auto-detection, uses custom build
- `outputDirectory: apps/web/.next` - Points to actual Next.js output
- `--filter=web` - Tells Turborepo to only build the web app
- `maxDuration: 60` - Extends timeout for AI streaming endpoint
- Function path includes `apps/web/` prefix

### `apps/web/vercel.json`

App-specific config (only for function overrides):

```json
{
  "functions": {
    "src/app/api/copilotkit/route.ts": {
      "maxDuration": 60
    }
  }
}
```

This is read when Vercel processes the web app.

### `.vercelignore` (Root)

Created to exclude unnecessary files from deployment:

```
apps/mobile/        # Don't deploy mobile app
docs/               # Skip documentation
packages/*/src/     # Skip source of shared packages
.turbo/             # Skip Turbo cache
```

---

## 🚀 Deployment Process

### How Vercel Builds Your App

1. **Install Phase**:
   ```bash
   cd /vercel/path0  # Vercel's build directory (root of repo)
   corepack enable
   pnpm install --frozen-lockfile
   ```

2. **Build Phase**:
   ```bash
   pnpm turbo run build --filter=web
   ```
   
   Turborepo will:
   - Check cache for previous builds
   - Build only `web` app and its dependencies
   - Output to `apps/web/.next`

3. **Deploy Phase**:
   - Vercel packages `apps/web/.next/`
   - Deploys to CDN
   - Serverless functions from `apps/web/src/app/api/`

### Automatic Deployments

- **Production**: Every push to `main` branch
- **Preview**: Every push to PR branches
- **Rollback**: Use Vercel dashboard to rollback to previous deployment

---

## 🐛 Troubleshooting

### Build Fails: "No Next.js version detected"

**Error Message**:
```
Error: No Next.js version detected. Make sure your package.json 
has "next" in either "dependencies" or "devDependencies".
```

**Root Cause**: Vercel's Root Directory is set to `apps/web`, but pnpm hoists dependencies to the workspace root.

**Solution**:
1. In Vercel Dashboard → Project Settings → General
2. Set **Root Directory** to `.` (or leave blank)
3. Ensure `vercel.json` is at repository root (not in `apps/web`)
4. Redeploy

**Verify locally**:
```bash
# From repo root
pnpm turbo run build --filter=web
# Should succeed
```

### Build Fails: "Module not found"

**Problem**: Vercel can't find dependencies

**Solution**: Ensure `vercel.json` has correct install command:
```json
{
  "installCommand": "cd ../.. && pnpm install"
}
```

### Build Fails: "turbo: command not found"

**Problem**: Turborepo not installed

**Solution**: Turbo should be in root `devDependencies`. Verify:
```bash
# Check locally
pnpm list turbo

# If missing, add it
pnpm add -D -w turbo
```

### Build Works Locally, Fails on Vercel

**Problem**: Environment differences

**Checklist**:
- ✅ Node version matches (22.x)
- ✅ `pnpm-lock.yaml` is committed
- ✅ All env vars are set in Vercel dashboard
- ✅ Build command includes `cd ../..`

### API Routes Timeout

**Problem**: CopilotKit streaming takes >10 seconds

**Solution**: Already configured in `vercel.json`:
```json
{
  "functions": {
    "src/app/api/copilotkit/route.ts": {
      "maxDuration": 60
    }
  }
}
```

Max is 60s on Pro plan, 300s on Enterprise.

### Deployment Shows Old Code

**Problem**: Turborepo cache or Vercel cache

**Solutions**:
```bash
# Clear Turbo cache locally
pnpm turbo clean

# Force rebuild on Vercel
vercel --force

# Or in dashboard: Settings → General → Clear Cache
```

### Wrong App Deployed

**Problem**: Vercel deploying from wrong directory

**Solution**: Check Vercel project settings:
- Root Directory should be `apps/web`
- Or use `vercel.json` with correct paths

---

## 📊 Monitoring Deployments

### Build Logs

View in Vercel Dashboard → Deployments → [Deployment] → Build Logs

Look for:
```
✓ Building...
✓ Linting and checking validity of types...
✓ Collecting page data...
✓ Generating static pages (0/5)
✓ Collecting build traces...
```

### Runtime Logs

Vercel Dashboard → Project → Logs

Filter by:
- Edge Function logs
- Serverless Function logs
- Build logs

---

## 🔐 Environment Variables

### Required Variables

```bash
# Supabase (Public)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# OpenAI (Secret)
OPENAI_API_KEY=sk-xxx...
```

### Adding Variables

**Via Dashboard**:
1. Project Settings → Environment Variables
2. Add Key/Value pairs
3. Select environments (Production, Preview, Development)
4. Save

**Via CLI**:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter value when prompted
```

### Environment-Specific Variables

```bash
# Production only
vercel env add OPENAI_API_KEY production

# Preview only (for testing)
vercel env add OPENAI_API_KEY preview
```

---

## 🎯 Best Practices

### 1. Always Test Builds Locally First

```bash
# Test production build
cd apps/web
pnpm build
pnpm start

# Test Turbo build (from root)
pnpm turbo run build --filter=web
```

### 2. Use Preview Deployments

Every PR gets a preview URL:
```
https://cogni-frontend-<branch>-<hash>.vercel.app
```

Test before merging to main!

### 3. Monitor Build Times

Turborepo cache should make builds faster:
- **First build**: ~2-3 minutes
- **Cached build**: ~30-60 seconds

If builds are slow, check:
- Cache is being restored
- Not installing unnecessary deps

### 4. Vercel Analytics

Enable in Project Settings → Analytics to track:
- Page load times
- Web Vitals
- Serverless function duration

### 5. Custom Domains

Add domains in Project Settings → Domains:
```
cogni.app          → Production
staging.cogni.app  → Preview (main branch)
```

---

## 🔄 CI/CD Integration

Your GitHub Actions workflow will:

1. **On PR**: 
   - Run tests/lints in CI
   - Vercel auto-deploys preview

2. **On Merge to Main**:
   - CI passes ✅
   - CD workflow triggers Vercel deploy hook
   - Production deployment

### Deploy Hooks

Create in Vercel → Project Settings → Git → Deploy Hooks:

```bash
# Add to GitHub Secrets
VERCEL_DEPLOY_HOOK_PRODUCTION=https://api.vercel.com/v1/integrations/deploy/xxx
```

Used in `.github/workflows/cd.yml`:
```yaml
- name: Deploy to Production
  run: |
    curl -X POST ${{ env.VERCEL_DEPLOY_HOOK_PRODUCTION }}
```

---

## 📦 Deploying Other Apps

### Mobile App (Expo)

Expo apps use different deployment (EAS Build, not Vercel):

```bash
cd apps/mobile
pnpm build  # or expo build
```

See Expo deployment docs separately.

### Future Packages

If you create shareable packages in `packages/`:

```typescript
// packages/ui/package.json
{
  "name": "@cogni/ui",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc"
  }
}
```

Turborepo will automatically build them before `web` app.

---

## 🆘 Getting Help

### Vercel Support

- Docs: https://vercel.com/docs
- Support: Dashboard → Help → Contact Support (Pro plan)
- Community: https://github.com/vercel/next.js/discussions

### Monorepo Resources

- Turborepo: https://turbo.build/repo/docs
- Vercel Monorepos: https://vercel.com/docs/monorepos

### Common Issues

See also: `MONOREPO_GUIDE.md` for general monorepo troubleshooting.

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Local build succeeds: `pnpm turbo run build --filter=web`
- [ ] Environment variables set in Vercel
- [ ] `vercel.json` configured with monorepo commands
- [ ] `.vercelignore` excludes mobile app
- [ ] API routes tested with correct timeouts
- [ ] Preview deployment tested on PR
- [ ] CI pipeline passes
- [ ] Custom domain configured (if applicable)

---

**Last Updated**: November 10, 2025  
**Vercel Config Version**: Monorepo with Turborepo + pnpm

