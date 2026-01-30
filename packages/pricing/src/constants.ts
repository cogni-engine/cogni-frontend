import type { PricingData } from './types';

/**
 * Default pricing data in English
 */
export const DEFAULT_PRICING_EN: PricingData = {
  title: 'Choose a plan built for your needs',
  description: 'Start with the free plan to get started, and upgrade anytime later.',
  bestValueLabel: 'Best Value',
  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Try and get started with basic features',
      price: '$0',
      priceNote: '/month',
      ctaLabel: 'Get started with Cogno',
      ctaHref: '/contact',
      features: [
        { label: 'Basic chat', included: true },
        { label: 'Basic AI work', included: true },
        { label: 'Standard notifications', included: true },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For individuals who want to use it seriously',
      price: '$40',
      priceNote: '/month',
      ctaLabel: 'Get started with Cogno',
      ctaHref: '/contact',
      features: [
        { label: 'Increased chat capacity', included: true },
        { label: 'Cogno worker access', included: true },
        { label: 'Better notifications', included: true },
        { label: 'More AI work capacity', included: true },
      ],
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Enable team operations and organizational management',
      price: '$45',
      priceNote: '/ user / month',
      ctaLabel: 'Get started with Cogno',
      ctaHref: '/contact',
      isBestValue: true,
      features: [
        { label: 'All Pro features', included: true },
        { label: 'Even more chat capacity', included: true },
        { label: 'Enhanced Cogno worker access', included: true },
        { label: 'Advanced notifications', included: true },
        { label: 'Maximum AI work capacity', included: true },
        { label: 'Priority email support', included: true },
        { label: 'Organization user management', included: true },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Meet enterprise-wide requirements for governance and high security',
      price: '',
      ctaLabel: 'Contact sales',
      ctaHref: '/contact',
      features: [
        { label: 'All Business features', included: true },
        { label: 'Advanced security (SAML / SCIM / SOC2)', included: true },
        { label: 'Organization-wide user management', included: true },
        {
          label: 'Custom permissions & integration management',
          included: true,
        },
        { label: 'Large-scale user support', included: true },
        { label: 'Dedicated customer success', included: true },
        { label: 'SLA (99.9% uptime guarantee)', included: true },
        {
          label: 'Dedicated servers / dedicated cloud (optional)',
          included: true,
        },
        { label: 'Audit logs', included: true },
        { label: 'Legal & compliance support', included: true },
      ],
    },
  ],
};

/**
 * Default pricing data in Japanese
 */
export const DEFAULT_PRICING_JA: PricingData = {
  title: 'ビジネス向けに構築されている有料プランを選びましょう',
  description: 'まずはフリープランで基本から始めて、あとからいつでもアップグレードすることもできます。',
  bestValueLabel: 'ベストバリュー',
  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'お試し・導入・ユーザー獲得',
      price: '$0',
      priceNote: '/ 月',
      ctaLabel: 'Cognoを始める',
      ctaHref: '/contact',
      features: [
        { label: '基本的なチャット', included: true },
        { label: '基本的なAI作業', included: true },
        { label: '標準的な通知', included: true },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      description: '個人ユーザーが本気で継続利用できる状態',
      price: '$40',
      priceNote: '/ 月',
      ctaLabel: 'Cognoを始める',
      ctaHref: '/contact',
      features: [
        { label: 'チャット容量の増加', included: true },
        { label: 'Cogno worker へのアクセス', included: true },
        { label: 'より良い通知機能', included: true },
        { label: 'より多くのAI作業容量', included: true },
      ],
    },
    {
      id: 'business',
      name: 'Business',
      description: 'チーム運用・組織管理を可能にする',
      price: '$45',
      priceNote: '/ ユーザー / 月',
      ctaLabel: 'Cognoを始める',
      ctaHref: '/contact',
      isBestValue: true,
      features: [
        { label: 'Proの全機能', included: true },
        { label: 'さらに多くのチャット容量', included: true },
        { label: '強化されたCogno worker アクセス', included: true },
        { label: '高度な通知機能', included: true },
        { label: '最大のAI作業容量', included: true },
        { label: '優先メールサポート', included: true },
        { label: '組織ユーザー管理', included: true },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: '企業全体の導入・ガバナンス・高セキュリティを満たす',
      price: '',
      ctaLabel: '営業担当者に問い合わせる',
      ctaHref: '/contact',
      features: [
        { label: 'Businessの全機能', included: true },
        {
          label: '高度なセキュリティ（SAML / SCIM / SOC2）',
          included: true,
        },
        { label: '組織横断のユーザー管理', included: true },
        { label: 'カスタム権限・統合管理', included: true },
        { label: '大規模ユーザー数対応', included: true },
        { label: '専任カスタマーサクセス', included: true },
        { label: 'SLA（99.9%アップタイム保証など）', included: true },
        {
          label: '専用サーバー / 専用クラウド（オプション）',
          included: true,
        },
        { label: '監査ログ', included: true },
        { label: '法務・コンプライアンス対応', included: true },
      ],
    },
  ],
};

