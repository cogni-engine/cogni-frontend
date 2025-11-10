# Quick Vercel Setup for Monorepo

## 🚨 Critical Settings

### Vercel Dashboard Configuration

```
Root Directory:        .  (or leave blank - DO NOT use apps/web)
Framework Preset:      Other
Node.js Version:       22.x

Build Command:         pnpm turbo run build --filter=web
Install Command:       pnpm install
Output Directory:      apps/web/.next
```

## ✅ Required Files

### ✓ `vercel.json` (at root)
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

### ✓ `.vercelignore` (at root)
```
apps/mobile/
docs/
.turbo/
```

### ✓ `apps/web/vercel.json`
```json
{
  "functions": {
    "src/app/api/copilotkit/route.ts": {
      "maxDuration": 60
    }
  }
}
```

## 🔐 Environment Variables

Add in Vercel Dashboard → Settings → Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
OPENAI_API_KEY=sk-xxx...
```

## 🧪 Test Locally First

```bash
# From repository root
pnpm turbo run build --filter=web

# If successful, Vercel will work too
```

## 🆘 Common Errors

### "No Next.js version detected"
→ Root Directory must be `.` not `apps/web`

### "Module not found"
→ Check `vercel.json` is at repository root

### "turbo: command not found"
→ Ensure turbo is in root devDependencies

## 📚 Full Documentation

See `docs/VERCEL_DEPLOYMENT.md` for complete guide.

