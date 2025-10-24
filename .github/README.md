# GitHub Actions CI/CD Setup

This repository uses GitHub Actions for continuous integration and deployment.

## Workflows

### CI (Continuous Integration)

- **File**: `.github/workflows/ci.yml`
- **Triggers**: Push to `main`/`staging` branches, Pull Requests
- **Actions**:
  - ESLint code quality checks
  - Prettier formatting validation
  - TypeScript type checking
  - Next.js build verification

### CD (Continuous Deployment)

- **File**: `.github/workflows/cd.yml`
- **Triggers**: Successful CI completion on `main`/`staging` branches
- **Actions**:
  - Deploy to Vercel production (main branch)
  - Deploy to Vercel staging (staging branch)

## Required Secrets

Configure these secrets in your GitHub repository settings:

1. **VERCEL_ORG_ID** - Your Vercel organization ID
2. **VERCEL_TOKEN** - Your Vercel API token
3. **VERCEL_PROJECT_ID** - Your Vercel project ID
4. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
5. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Your Supabase anonymous key

## Getting Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project settings
3. Copy the Project ID from the General tab
4. Generate an API token from Account Settings > Tokens
5. Find your Organization ID in the URL or API responses

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
