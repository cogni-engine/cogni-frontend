export const SECTION_IDS = {
  solution: 'solution',
  features: 'features',
  howItWorks: 'how-it-works',
} as const;

export type Language = 'en' | 'ja';

export type LocalizedCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    imageAlt: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  navigation: {
    solution: string;
    features: string;
    howItWorks: string;
    contact: string;
  };
  problem: {
    title: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    highlights: string[];
  };
  features: {
    title: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
      asset: string;
      focus?: 'center' | 'top' | 'bottom';
    }>;
  };
  howItWorks: {
    id: string;
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  useCases: {
    title: string;
    cases: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  footer: {
    privacy: string;
    terms: string;
  };
};

export const LOCALIZED_COPY: Record<Language, LocalizedCopy> = {
  en: {
    hero: {
      eyebrow: 'AI for high-output teams',
      title: 'Beat every deadline without breaking a sweat',
      description:
        'Cogni runs your time management, keeps shared action items aligned, and builds proactive plans so you stay ahead of the work.',
      bullets: [
        'AI handles time management in real time',
        'Shared to-dos stay perfectly synchronized across people',
        'Proactive plans keep every deadline protected',
      ],
      imageAlt: 'Professional reviewing Cogni AI planning dashboard',
      primaryCta: { label: 'Book a demo', href: '/contact' },
      secondaryCta: {
        label: 'See how it works',
        href: `#${SECTION_IDS.howItWorks}`,
      },
    },
    navigation: {
      solution: 'Solution',
      features: 'Features',
      howItWorks: 'How it works',
      contact: 'Talk to us',
    },
    problem: {
      title: 'Manual planning is slowing you down',
      points: [
        'Too many spreadsheets just to stay on top of time',
        'Shared responsibilities go missing without visibility',
        'Deadlines slip because reminders aren’t intelligent',
      ],
    },
    solution: {
      title: 'Let AI handle the heavy lifting',
      description:
        'Cogni watches every commitment, syncs work across teammates, and maps the path to each deadline—before you even ask.',
      highlights: [
        'AI keeps the schedule balanced and your time protected',
        'Collaborative task boards make multi-owner work effortless',
        'Proactive plans with smart nudges keep delivery on track',
      ],
    },
    features: {
      title: 'Everything your ops brain needs',
      description:
        'From scheduling to smart nudges, Cogni keeps the entire delivery machine humming.',
      cards: [
        {
          title: 'Automated time orchestration',
          description:
            'AI allocates focus blocks and reshuffles when priorities change.',
          asset: '/edu/assets/feature_timer.png',
          focus: 'bottom',
        },
        {
          title: 'Shared task intelligence',
          description:
            'Centralize to-dos, owners, and context in one living workspace.',
          asset: '/edu/assets/feature_notes.png',
        },
        {
          title: 'Real-time progress radar',
          description:
            'Dashboards spotlight risks before they become blockers.',
          asset: '/edu/assets/feature_dashboard.png',
        },
        {
          title: 'Precision notifications',
          description:
            'Signal the right people at the right moment to keep momentum high.',
          asset: '/edu/assets/feature_notify.png',
        },
      ],
    },
    howItWorks: {
      id: SECTION_IDS.howItWorks,
      title: 'From idea to done in three moves',
      steps: [
        {
          title: 'Sync your work',
          description:
            'Import calendars, docs, and tasks—Cogni learns your cadence instantly.',
        },
        {
          title: 'Let AI plan it',
          description:
            'We map dependencies, owners, and timelines without manual juggling.',
        },
        {
          title: 'Stay in flow',
          description:
            'Automated reminders and adaptive schedules keep every deadline covered.',
        },
      ],
    },
    useCases: {
      title: 'Built for teams that can’t miss',
      cases: [
        {
          title: 'Product launches',
          description:
            'Coordinate roadmap, marketing, and ops deadlines with AI-guarded focus.',
        },
        {
          title: 'Client delivery',
          description:
            'Give every stakeholder a live view of priorities and next actions.',
        },
        {
          title: 'Internal operations',
          description:
            'Automate recurring workflows and keep the entire organization aligned.',
        },
      ],
    },
    cta: {
      title: 'Ready for an AI command center?',
      description:
        'Spin up a workspace in minutes and let Cogni orchestrate the plan, the people, and the pace.',
      primaryCta: { label: 'Start the conversation', href: '/contact' },
      secondaryCta: { label: 'View product tour', href: '/demo' },
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  ja: {
    hero: {
      eyebrow: 'AIによる新しいマネジメント体験',
      title: '考える時間を取り戻す、次世代AIワークスペース',
      description:
        'CogniはAIが計画を立て、所要時間に基づいて自動的にタイマーを起動し、最適なタイミングで通知。やるべきことを整理し、実行まで導く“AIマネージャー”です。',
      bullets: [
        'AIが予定・タスク・集中時間を自動で最適化',
        'ユーザーごとに最適化されたAIが実行をサポート',
        'Noteのアサインとチャットで思考と行動を同期',
      ],
      imageAlt: 'AIが時間とタスクを自動で管理するCognoダッシュボード',
      primaryCta: { label: '無料で始める', href: '/contact' },
      secondaryCta: { label: '機能を見る', href: `#${SECTION_IDS.howItWorks}` },
    },
    navigation: {
      solution: 'ソリューション',
      features: '機能',
      howItWorks: '使い方',
      contact: 'お問い合わせ',
    },
    problem: {
      title: 'タスク管理や計画立てに時間を奪われていませんか？',
      points: [
        'スケジュールやToDoが分散し、頭の中が常に混乱',
        'リマインドが後手に回り、気づいたら締切直前',
        '優先順位を考える時間がなく、実行が遅れる',
      ],
    },
    solution: {
      title: 'AIが計画と実行を一体化',
      description:
        'Cogniは時間、タスク、集中のリズムを理解し、AIが自動的に次の行動を設計します。ユーザーごとに最適化されたマネジメントを実現。',
      highlights: [
        'AIが所要時間を分析し、タイマーを自発的に起動',
        'タスク進行に合わせて最適なタイミングで通知',
        'ワークスペース内でNoteとチャットを連携し、思考と行動を統合',
      ],
    },
    features: {
      title: 'AIマネジメントを支える主要機能',
      description:
        '時間とタスクの管理をAIが肩代わりし、あなたは本質的な思考と実行に集中できます。',
      cards: [
        {
          title: 'AIタイムオーケストレーション',
          description:
            '所要時間に基づき、自動でタイマーを起動。集中と休息のリズムを整えます。',
          asset: '/edu/assets/feature_timer.png',
        },
        {
          title: 'スマートタスクアサイン',
          description:
            'Noteから自動でタスクを抽出・アサイン。チーム内での共有もスムーズに。',
          asset: '/edu/assets/feature_notes.png',
        },
        {
          title: 'リアルタイムチャット統合',
          description:
            'ワークスペース内でAIとメンバーが連携。進捗と意思決定を一箇所で管理。',
          asset: '/edu/assets/feature_chat.png',
        },
        {
          title: 'AI通知・リマインドエンジン',
          description:
            '予定や集中時間を解析し、最適なタイミングで行動を促します。',
          asset: '/edu/assets/feature_notify.png',
        },
      ],
    },
    howItWorks: {
      id: SECTION_IDS.howItWorks,
      title: 'AIが動かす、3ステップのマネジメント',
      steps: [
        {
          title: 'やることを登録する',
          description: 'NoteやチャットからAIが自動でタスクを抽出します。',
        },
        {
          title: 'AIが計画を設計',
          description: '所要時間や優先度に基づき、自発的にスケジュールを構築。',
        },
        {
          title: 'AIが実行を支援',
          description: '適切なタイミングで通知・タイマーを起動し、集中を維持。',
        },
      ],
    },
    useCases: {
      title: 'どんなチームにもフィットするAIマネジメント',
      cases: [
        {
          title: '教育・学習管理',
          description: '生徒や講師の進捗に合わせてAIが学習時間を自動で最適化。',
        },
        {
          title: '介護・ヘルスケア',
          description: 'ケアスケジュールやスタッフ間の引き継ぎをAIが一元管理。',
        },
        {
          title: 'パーソナルマネジメント',
          description: '自分専用のAIが、計画・通知・振り返りまで全てサポート。',
        },
      ],
    },
    cta: {
      title: 'AIがあなたの時間をマネジメントします',
      description:
        '数分でCogniを起動し、AIによる計画と実行の自動化を体験しましょう。',
      primaryCta: { label: '今すぐ始める', href: '/contact' },
      secondaryCta: { label: 'デモを見る', href: '/demo' },
    },
    footer: {
      privacy: 'プライバシー',
      terms: '利用規約',
    },
  },
};
