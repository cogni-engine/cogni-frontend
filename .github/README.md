# GitHub Actions CI/CD Setup

This repository uses GitHub Actions for continuous integration and deployment.

## Workflows

### CI (Continuous Integration)

- **File**: `.github/workflows/ci.yml`
- **Triggers**: Push to `main` branch, Pull Requests
- **Actions**:
  - ESLint code quality checks
  - Prettier formatting validation
  - TypeScript type checking
  - Next.js build verification

### CD (Continuous Deployment)

- **File**: `.github/workflows/cd.yml`
- **Triggers**: Successful CI completion on `main` branch
- **Actions**:
  - Deploy to Vercel production (main branch)

## Required Secrets

Configure these secrets in your GitHub repository settings:

1. **VERCEL_DEPLOY_HOOK_PRODUCTION** - Vercel deploy hook URL for production
2. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Your Supabase anonymous key

## Getting Vercel Deploy Hooks

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project settings
3. Go to **Settings** → **Git** → **Deploy Hooks**
4. Create a deploy hook:
   - **Production Hook**: Set branch to `main`, name it "Production Deploy"
5. Copy the generated hook URL and add it as a GitHub secret

## Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to Settings > API
4. Copy your **Project URL** and **anon/public key**

## Local Development

The same scripts used in CI can be run locally:

```bash
# Run all checks
yarn lint
yarn format:check
yarn type-check
yarn build

# Fix formatting issues
yarn format

# Fix linting issues
yarn lint:fix
```
