export type PricingPlan = {
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

export type PricingData = {
  title: string;
  description: string;
  bestValueLabel: string;
  plans: PricingPlan[];
};

