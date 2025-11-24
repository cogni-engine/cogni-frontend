# @cogni/pricing

A reusable pricing component package for Cogni applications.

## Features

- **Reusable PricingCard component** with flexible button rendering
- **Shared pricing data** (English and Japanese)
- **TypeScript types** for pricing plans and data
- **Customizable styling** with className props

## Installation

This package is part of the Cogni monorepo and is already available in workspaces.

```bash
pnpm install
```

## Usage

### Basic Example

```tsx
import { PricingCard, DEFAULT_PRICING_EN } from '@cogni/pricing';

function MyPricingPage() {
  return (
    <div>
      {DEFAULT_PRICING_EN.plans.map(plan => (
        <PricingCard
          key={plan.id}
          plan={plan}
          bestValueLabel={DEFAULT_PRICING_EN.bestValueLabel}
          renderButton={(plan) => (
            <button onClick={() => console.log('Selected:', plan.id)}>
              {plan.ctaLabel}
            </button>
          )}
        />
      ))}
    </div>
  );
}
```

### With Next.js Link

```tsx
import Link from 'next/link';
import { PricingCard } from '@cogni/pricing';

<PricingCard
  plan={plan}
  renderButton={(plan) => (
    <Link href={plan.ctaHref}>
      {plan.ctaLabel}
    </Link>
  )}
/>
```

### With Custom Button Component

```tsx
import { Button } from '@/components/ui/button';
import { PricingCard } from '@cogni/pricing';

<PricingCard
  plan={plan}
  renderButton={(plan) => (
    <Button
      variant={plan.isBestValue ? 'default' : 'outline'}
      onClick={() => handleUpgrade(plan.id)}
    >
      {plan.ctaLabel}
    </Button>
  )}
/>
```

## API

### PricingCard Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `plan` | `PricingPlan` | Yes | The pricing plan data |
| `bestValueLabel` | `string` | No | Label for best value badge (default: "Best Value") |
| `renderButton` | `(plan: PricingPlan) => React.ReactNode` | No | Custom button renderer |
| `className` | `string` | No | Additional CSS classes for the card |
| `featureClassName` | `string` | No | Additional CSS classes for feature items |

### Types

```typescript
type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  ctaLabel: string;
  ctaHref: string;
  isBestValue?: boolean;
  features: Array<{
    label: string;
    included: boolean;
  }>;
};

type PricingData = {
  title: string;
  description: string;
  bestValueLabel: string;
  plans: PricingPlan[];
};
```

### Constants

- `DEFAULT_PRICING_EN` - English pricing data with 4 plans (Free, Pro, Business, Enterprise)
- `DEFAULT_PRICING_JA` - Japanese pricing data with 4 plans

## Customization

The `renderButton` prop allows you to inject custom button functionality. This makes the component flexible enough to:

- Use different routing libraries (Next.js Link, React Router, etc.)
- Implement custom click handlers
- Apply different styling based on context
- Add analytics tracking
- Handle authentication flows

## Example: Modal Usage

```tsx
import { Dialog } from '@/components/ui/dialog';
import { PricingCard, DEFAULT_PRICING_EN } from '@cogni/pricing';

function PricingModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="grid gap-6 md:grid-cols-3">
        {DEFAULT_PRICING_EN.plans.map(plan => (
          <PricingCard
            key={plan.id}
            plan={plan}
            renderButton={(plan) => (
              <button onClick={() => handleUpgrade(plan)}>
                {plan.ctaLabel}
              </button>
            )}
          />
        ))}
      </div>
    </Dialog>
  );
}
```

## Development

```bash
# Build the package
cd packages/pricing
pnpm build

# Watch mode
pnpm dev
```

