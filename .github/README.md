# GitHub Actions CI/CD Setup

This repository uses GitHub Actions for continuous integration and deployment.

## Workflows

### CI (Continuous Integration)

- **File**: `.github/workflows/ci.yml`
- **Triggers**: Push to `main` or `staging` branch, Pull Requests targeting those branches
- **Actions**:
  - ESLint code quality checks
  - Prettier formatting validation
  - TypeScript type checking
  - Next.js build verification

### CD (Continuous Deployment)

- **File**: `.github/workflows/cd.yml`
- **Triggers**: Successful CI completion on `main` or `staging` branch
- **Actions**:
  - Deploy to Vercel production (main branch)
  - Deploy to Vercel staging (staging branch)

### Preview Deployment

- **File**: `.github/workflows/preview.yml`
- **Triggers**: Pull request opened, updated, or reopened
- **Actions**:
  - Builds and deploys a Vercel preview for the PR
  - Comments the preview URL on the PR (updates existing comment on subsequent pushes)

## Required Secrets

Configure these secrets in your GitHub repository settings:

| Secret | Purpose |
|--------|---------|
| `VERCEL_DEPLOY_HOOK_PRODUCTION` | Vercel deploy hook URL for production |
| `VERCEL_DEPLOY_HOOK_STAGING` | Vercel deploy hook URL for staging |
| `VERCEL_TOKEN` | Vercel API token for CLI-based preview deployments |
| `VERCEL_ORG_ID` | Vercel organization/team ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `OPENAI_API_KEY` | OpenAI API key |

## Getting Vercel Deploy Hooks

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project settings
3. Go to **Settings** → **Git** → **Deploy Hooks**
4. Create deploy hooks:
   - **Production Hook**: Set branch to `main`, name it "Production Deploy"
   - **Staging Hook**: Set branch to `staging`, name it "Staging Deploy"
5. Copy the generated hook URLs and add them as GitHub secrets

## Getting Vercel CLI Credentials (for Preview Deployments)

1. **VERCEL_TOKEN**: Go to [Vercel Dashboard](https://vercel.com/dashboard) → Settings → Tokens → Create a new token
2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**: Run `vercel link` locally in the project directory, then check `.vercel/project.json` for the `orgId` and `projectId` values

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
