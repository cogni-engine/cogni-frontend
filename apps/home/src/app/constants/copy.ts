export const SECTION_IDS = {
  solution: 'solution',
  features: 'features',
  howItWorks: 'how-it-works',
  terms: 'terms',
  privacy: 'privacy',
} as const;

export type Language = 'en' | 'ja';

export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export type LocalizedCopy = {
  hero: {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  navigation: {
    solution: string;
    features: string;
    pricing: string;
    contact: string;
    getStarted: string;
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
      label: string;
      iconType: 'timer' | 'notify' | 'chat' | 'task';
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
      asset?: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  contact: {
    title: string;
    description: string;
    form: {
      firstName: string;
      lastName: string;
      companyName: string;
      workMail: string;
      jobTitle: string;
      expectedUserCount: string;
      expectedUserCountOptions: string[];
      subject: string;
      subjectOptions: string[];
      phoneNumber: string;
      message: string;
      submit: string;
      submitting: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  footer: {
    privacy: string;
    terms: string;
  };
  pricing: {
    title: string;
    description: string;
    bestValueLabel: string;
    plans: Array<{
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
    }>;
  };
  terms: {
    title: string;
    effectiveDate: string;
    preamble: string;
    articles: Array<{
      number: number;
      title: string;
      content: string[];
    }>;
  };
  privacy: {
    title: string;
    effectiveDate: string;
    preamble: string;
    items: Array<{
      number: number;
      title: string;
      content: string[];
    }>;
  };
};

export const LOCALIZED_COPY: Record<Language, LocalizedCopy> = {
  en: {
    hero: {
      title: 'Cogno moves you forward',
      description:
        'Next-generation workspace where AI automates planning, management, and execution',
      primaryCta: {
        label: 'Get started with Cogno',
        href: `${NEXT_PUBLIC_APP_URL}`,
      },
      secondaryCta: {
        label: 'Compare plans',
        href: '/pricing',
      },
    },
    navigation: {
      solution: 'Solution',
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Talk to us',
      getStarted: 'Get Started!',
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
      title: 'Plan, assign, execute, and manage—all in one place with AI',
      description: '',
      cards: [
        {
          label: 'Planning & Execution',
          iconType: 'timer',
          title: 'From planning to execution with Cogno',
          description:
            'Cogno is an AI agent that understands your team members and deadlines. It handles everything from prioritization and planning to document creation, learning, and execution. You can even communicate via voice. It automatically starts timers and provides support based on your current situation.',
          asset: '/edu/assets/feature_timer.png',
          focus: 'bottom',
        },
        {
          label: 'Notifications & Reminders',
          iconType: 'notify',
          title: 'Powered by AI notifications and reminders',
          description:
            "AI sends strategic notifications based on progress and deadlines. Whether it's personal tasks or team projects, it even checks completion status to reduce management overhead.",
          asset: '/edu/assets/feature_notify.png',
        },
        {
          label: 'Collaboration',
          iconType: 'chat',
          title: 'Organize team work with Chat and Notes',
          description:
            'AI and team members collaborate within workspaces. Manage progress and decisions in one place. Chat enables real-time communication while AI understands conversations and organizes information. Notes capture ideas, meeting minutes, and task details for team-wide sharing.',
          asset: '/edu/assets/feature_chat.png',
        },
        {
          label: 'Task Management',
          iconType: 'task',
          title: 'AI-powered task creation and assignment',
          description:
            'Automatically extract deadlines from Notes and organize them as tasks. You can also create Notes with AI. AI identifies tasks from meeting minutes and chat content, automatically setting deadlines and priorities that adjust based on project progress. This dramatically reduces manual input and management effort, boosting team productivity.',
          asset: '/edu/assets/feature_notes.png',
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
      title: 'AI management that fits any team',
      cases: [
        {
          title: 'Education & Learning Management',
          description:
            'AI automatically optimizes learning time based on student and instructor progress.',
        },
        {
          title: 'Care & Healthcare',
          description:
            'AI centrally manages care schedules and handovers between staff members.',
        },
        {
          title: 'Personal Management',
          description:
            'Your personal AI supports everything from planning and notifications to reflection.',
        },
      ],
    },
    cta: {
      title: 'AI manages your time',
      description:
        'Launch Cogni in minutes and experience AI-powered automation of planning and execution.',
      primaryCta: { label: 'Get started now', href: `${NEXT_PUBLIC_APP_URL}` },
      secondaryCta: { label: 'request a demo', href: '/contact' },
    },
    contact: {
      title: 'Get started with Cogno',
      description:
        'Fill out the form below and our team will get back to you within 24 hours.',
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        companyName: 'Company Name',
        workMail: 'Work Email',
        jobTitle: 'Job Title',
        expectedUserCount: 'Expected User Count',
        expectedUserCountOptions: [
          '1-10 users',
          '11-50 users',
          '51-100 users',
          '101-500 users',
          '500+ users',
        ],
        subject: 'Inquiry Type',
        subjectOptions: [
          'Discuss Cogno implementation',
          'Discuss which Cogno plan is suitable',
          'Have questions about the product',
          'Need support',
          'Discuss compliance planning',
          'Other',
        ],
        phoneNumber: 'Phone Number',
        message: 'Message (Optional)',
        submit: 'Submit',
        submitting: 'Submitting...',
        successMessage: 'Thank you! We will contact you soon.',
        errorMessage: 'Something went wrong. Please try again.',
      },
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
    },
    pricing: {
      title: 'Choose a plan built for your needs',
      description:
        'Start with the free plan to get started, and upgrade anytime later.',
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
            { label: 'Basic features (limited)', included: true },
            { label: 'Lightweight data storage', included: true },
            { label: 'Personal use (minimum)', included: true },
            { label: 'Email support (low priority)', included: true },
            { label: '1 user only', included: true },
            { label: 'API/Integrations (limited)', included: true },
            { label: 'Advanced analytics & management', included: false },
            { label: 'Team features', included: false },
            {
              label: 'High-speed processing & priority servers',
              included: false,
            },
          ],
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For individuals who want to use it seriously',
          price: '$120',
          priceNote: '/month',
          ctaLabel: 'Get started with Cogno',
          ctaHref: '/contact',
          features: [
            { label: 'All Free features', included: true },
            { label: 'High-speed processing', included: true },
            { label: 'Extended storage capacity', included: true },
            { label: 'Advanced tools unlocked', included: true },
            { label: '3-5 workspace participation', included: true },
            { label: 'Mobile sync', included: true },
            { label: 'Priority support', included: true },
            { label: 'API usage (limited)', included: true },
            { label: 'Team management', included: true },
            { label: 'Invite multiple users', included: true },
            { label: 'Security features (SSO, etc.)', included: true },
          ],
        },
        {
          id: 'business',
          name: 'Business',
          description: 'Enable team operations and organizational management',
          price: '$150',
          priceNote: '/ user / month',
          ctaLabel: 'Get started with Cogno',
          ctaHref: '/contact',
          isBestValue: true,
          features: [
            { label: 'All Pro features', included: true },
            { label: 'Team workspaces', included: true },
            { label: 'Multi-member permission management', included: true },
            { label: 'Organizational project management', included: true },
            { label: 'Roles and permissions (Admin / Member)', included: true },
            { label: 'Secure sharing (internal only, etc.)', included: true },
            { label: 'Team activity logs', included: true },
            { label: 'Enhanced API usage', included: true },
            { label: 'SSO (paid option available)', included: true },
            { label: 'Data retention & backup', included: true },
            { label: 'Enterprise integration management', included: true },
            { label: 'SLA', included: true },
          ],
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description:
            'Meet enterprise-wide requirements for governance and high security',
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
    },
    terms: {
      title: 'Cogno Terms of Service',
      effectiveDate: 'Effective Date: November 24, 2025',
      preamble:
        'These Terms of Service (the "Terms") set forth the terms and conditions for the use of "Cogno" (the "Service") provided by Cogno (the "Company"). Users shall use the Service after agreeing to these Terms.',
      articles: [
        {
          number: 1,
          title: 'Service Content',
          content: [
            'The Service is a workspace service that provides features such as task management, planning support, reminders, and prioritization using AI.',
            'Proposals, notifications, and judgments made by AI provided by the Service are merely supplementary information, and the Company does not guarantee the accuracy, completeness, or usefulness of such content.',
            'All responsibility for final decisions and actions made using the Service belongs to the user.',
          ],
        },
        {
          number: 2,
          title: 'Account Management',
          content: [
            'Users shall manage their account information at their own responsibility.',
            'The Company shall not be liable for any damage caused by unauthorized use of accounts due to user negligence.',
          ],
        },
        {
          number: 3,
          title: 'Prohibited Acts',
          content: [
            'Users shall not engage in the following acts:',
            'Acts that violate laws or public order and morals',
            'Acts that infringe on the rights or interests of others',
            'Acts that interfere with the operation of the Service',
            'Unauthorized access, reverse engineering, or other unauthorized acts',
            'Acts that the Company deems inappropriate',
          ],
        },
        {
          number: 4,
          title: 'Intellectual Property Rights and Data Handling',
          content: [
            'Rights to data (tasks, notes, etc.) entered by users into the Service belong in principle to the user.',
            'The Company may use such data to the extent necessary for providing the Service and improving quality.',
          ],
        },
        {
          number: 5,
          title: 'Disclaimer',
          content: [
            'The Service is provided "as is," and the Company makes no warranties regarding its operation, content, or results.',
            'The Company shall not be liable for any damage arising from the use or inability to use the Service.',
          ],
        },
        {
          number: 6,
          title: 'Service Changes and Termination',
          content: [
            'The Company may change or terminate all or part of the Service without prior notice to users.',
          ],
        },
        {
          number: 7,
          title: 'Changes to Terms',
          content: [
            "The Company may change these Terms at any time, and the changed Terms shall take effect when displayed on the Company's website or the Service.",
          ],
        },
        {
          number: 8,
          title: 'Governing Law and Jurisdiction',
          content: [
            'These Terms shall be governed by Japanese law, and disputes concerning the Service shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Cogno Privacy Policy',
      effectiveDate: 'Effective Date: November 24, 2025',
      preamble:
        'Cogno (the "Company") sets forth the following Privacy Policy regarding the handling of users\' personal information in this service.',
      items: [
        {
          number: 1,
          title: 'Information We Collect',
          content: [
            'The Company may collect the following information:',
            'Name, email address, and other information provided during registration',
            'Task content, notes, and input data',
            'Usage history and access information',
          ],
        },
        {
          number: 2,
          title: 'Purpose of Use',
          content: [
            'Information collected will be used for the following purposes:',
            'Providing and operating the Service',
            'Improving and enhancing service quality',
            'Notifications and communications to users',
          ],
        },
        {
          number: 3,
          title: 'Third-Party Disclosure',
          content: [
            'The Company will not provide personal information to third parties without the consent of the individual, except as required by law.',
          ],
        },
        {
          number: 4,
          title: 'Use of External Services',
          content: [
            'The Company may use external services to the extent necessary for operating this service.',
          ],
        },
        {
          number: 5,
          title: 'Security Management',
          content: [
            'The Company will appropriately manage collected personal information and strive to prevent unauthorized access, leakage, etc.',
          ],
        },
        {
          number: 6,
          title: 'Disclosure, Correction, and Deletion',
          content: [
            'Users may request disclosure, correction, or deletion of their personal information from the Company.',
          ],
        },
        {
          number: 7,
          title: 'Revisions',
          content: ['This policy may be revised as necessary.'],
        },
        {
          number: 8,
          title: 'Contact',
          content: [
            'For inquiries regarding the handling of personal information, please contact us through the inquiry window within this service.',
          ],
        },
      ],
    },
  },
  ja: {
    hero: {
      title: 'Cognoが、動かす',
      description: 'AIが計画から実行までを自動化する次世代ワークスペース',
      primaryCta: { label: 'Cognoを始める', href: `${NEXT_PUBLIC_APP_URL}` },
      secondaryCta: {
        label: 'プランを比較する',
        href: '/pricing',
      },
    },
    navigation: {
      solution: 'ソリューション',
      features: '機能',
      pricing: '料金',
      contact: 'お問い合わせ',
      getStarted: 'Cognoを始める',
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
      title: 'AIで「計画・アサイン・実行・管理」が一箇所に。',
      description: '',
      cards: [
        {
          label: '計画・実行',
          iconType: 'timer',
          title: 'Cogno で、計画から実行まで。',
          description:
            'Cognoは、チームのメンバーや、期限まで把握したAIエージェントです。優先順位づけや計画から資料作成、学習や実行まで一気貫通。伝えたいことは、音声でも。自動的にタイマーを起動するなど、その時の状況に応じてサポートを得る。',
          asset: '/edu/assets/feature_timer.png',
        },
        {
          label: '通知・リマインド',
          iconType: 'notify',
          title: 'AI通知・リマインドで動く。',
          description:
            '進捗具合や締切を考えて、AIが計画性を持って通知。個人のやることでも、チームプロジェクトでも完了しているかの確認まで行い、マネジメント工数を減らします。',
          asset: '/edu/assets/feature_notify.png',
        },
        {
          label: 'コラボレーション',
          iconType: 'chat',
          title: 'ChatとNoteで、チームでやることを整理',
          description:
            'ワークスペース内でAIとメンバーが連携。進捗と意思決定を一箇所で管理。Chat機能では、リアルタイムでメンバー同士がコミュニケーションを取りながら、AIが会話の内容を理解し、必要な情報を整理。Note機能では、アイデアや議事録、タスクの詳細を記録し、チーム全体で共有。',
          asset: '/edu/assets/feature_chat.png',
        },
        {
          label: 'タスク管理',
          iconType: 'task',
          title: 'タスクの作成・アサインも、AIで',
          description:
            'Noteから自動で期限を抽出し、タスクとして整理。もちろん、Noteの作成もAIと一緒に行えます。会議の議事録やチャットの内容から、AIが自動的にタスクを識別。期限や優先順位も自動で設定され、プロジェクトの進捗に応じて調整されます。手動での入力や管理の手間を大幅に削減し、チーム全体の生産性を向上させます。',
          asset: '/edu/assets/feature_notes.png',
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
      primaryCta: { label: '今すぐ始める', href: `${NEXT_PUBLIC_APP_URL}` },
      secondaryCta: { label: 'お問い合わせ', href: '/contact' },
    },
    contact: {
      title: 'Cognoを始める',
      description:
        '以下のフォームにご記入ください。24時間以内にご連絡いたします。',
      form: {
        firstName: '名',
        lastName: '姓',
        companyName: '会社名',
        workMail: '仕事用メールアドレス',
        jobTitle: '役職',
        expectedUserCount: '予想ユーザー数',
        expectedUserCountOptions: [
          '1-10名',
          '11-50名',
          '51-100名',
          '101-500名',
          '500名以上',
        ],
        subject: 'お問い合わせ内容',
        subjectOptions: [
          'Cognoの導入について相談したい',
          'どのCognoプランが適しているか相談したい',
          '製品に関して質問したい',
          'サポートのお願いをしたい',
          'コンプライアンス計画について相談したい',
          'その他',
        ],
        phoneNumber: '電話番号',
        message: 'メッセージ（任意）',
        submit: '送信',
        submitting: '送信中...',
        successMessage: 'ありがとうございます！すぐにご連絡いたします。',
        errorMessage: 'エラーが発生しました。もう一度お試しください。',
      },
    },
    footer: {
      privacy: 'プライバシー',
      terms: '利用規約',
    },
    pricing: {
      title: 'ビジネス向けに構築されている有料プランを選びましょう',
      description:
        'まずはフリープランで基本から始めて、あとからいつでもアップグレードすることもできます。',
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
            { label: '基本機能の利用（制限あり）', included: true },
            { label: '軽量なデータ保存容量', included: true },
            { label: '個人向けの最低限の使用', included: true },
            { label: 'メールサポート（低優先度）', included: true },
            { label: '1ユーザーのみ', included: true },
            { label: 'API/連携は制限', included: true },
            { label: '高度な分析・管理機能', included: false },
            { label: 'チーム機能', included: false },
            { label: '高速処理・優先サーバー', included: false },
          ],
        },
        {
          id: 'pro',
          name: 'Pro',
          description: '個人ユーザーが本気で継続利用できる状態',
          price: '$120',
          priceNote: '/ 月',
          ctaLabel: 'Cognoを始める',
          ctaHref: '/contact',
          features: [
            { label: 'Freeの全機能', included: true },
            { label: '高速処理', included: true },
            { label: '保存容量の拡張', included: true },
            { label: '高機能ツールの解放', included: true },
            { label: '3〜5ワークスペース参加可能', included: true },
            { label: 'モバイル同期', included: true },
            { label: '優先サポート', included: true },
            { label: 'API利用（制限あり）', included: true },
            { label: 'チーム管理', included: true },
            { label: '複数ユーザーの招待', included: true },
            { label: 'セキュリティ機能追加（SSOなど）', included: true },
          ],
        },
        {
          id: 'business',
          name: 'Business',
          description: 'チーム運用・組織管理を可能にする',
          price: '$150',
          priceNote: '/ ユーザー / 月',
          ctaLabel: 'Cognoを始める',
          ctaHref: '/contact',
          isBestValue: true,
          features: [
            { label: 'Proの全機能', included: true },
            { label: 'チームワークスペース', included: true },
            { label: '複数メンバーの権限管理', included: true },
            { label: '組織プロジェクトの管理機能', included: true },
            { label: 'ロールと権限（Admin / Member）', included: true },
            { label: 'セキュア共有（社内限定など）', included: true },
            { label: 'チームアクティビティログ', included: true },
            { label: 'API利用強化', included: true },
            { label: 'SSO（有料の場合が多い）', included: true },
            { label: 'データ保持・バックアップ', included: true },
            { label: '大規模組織向けの統合管理', included: true },
            { label: 'SLA', included: true },
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
    },
    terms: {
      title: 'Cogno 利用規約',
      effectiveDate: '制定日：2025年11月24日',
      preamble:
        '本利用規約（以下「本規約」といいます。）は、Cogno（以下「当社」といいます。）が提供する「Cogno」（以下「本サービス」といいます。）の利用条件を定めるものです。利用者は、本規約に同意したうえで本サービスを利用するものとします。',
      articles: [
        {
          number: 1,
          title: '本サービスの内容',
          content: [
            '本サービスは、AIを活用し、タスク管理、計画支援、リマインド、優先順位付け等の機能を提供するワークスペースサービスです。',
            '本サービスが提供するAIによる提案・通知・判断は、あくまで補助的な情報であり、その内容の正確性・完全性・有用性を保証するものではありません。',
            '本サービスを利用して行う最終的な意思決定および行動の責任は、すべて利用者に帰属します。',
          ],
        },
        {
          number: 2,
          title: 'アカウント管理',
          content: [
            '利用者は、自己の責任においてアカウント情報を管理するものとします。',
            '利用者の過失によるアカウントの不正使用により生じた損害について、当社は一切の責任を負いません。',
          ],
        },
        {
          number: 3,
          title: '禁止事項',
          content: [
            '利用者は、以下の行為を行ってはなりません。',
            '法令または公序良俗に違反する行為',
            '他者の権利または利益を侵害する行為',
            '本サービスの運営を妨害する行為',
            '不正アクセス、リバースエンジニアリングその他不正行為',
            '当社が不適切と判断する行為',
          ],
        },
        {
          number: 4,
          title: '知的財産権およびデータの取扱い',
          content: [
            '利用者が本サービスに入力したデータ（タスク、ノート等）の権利は、原則として利用者に帰属します。',
            '当社は、本サービスの提供および品質向上のために必要な範囲で、当該データを利用できるものとします。',
          ],
        },
        {
          number: 5,
          title: '免責事項',
          content: [
            '本サービスは現状有姿で提供され、当社はその動作、内容、結果について一切の保証を行いません。',
            '本サービスの利用または利用不能により生じたいかなる損害についても、当社は責任を負いません。',
          ],
        },
        {
          number: 6,
          title: 'サービスの変更・終了',
          content: [
            '当社は、利用者への事前通知なく、本サービスの全部または一部を変更または終了できるものとします。',
          ],
        },
        {
          number: 7,
          title: '規約の変更',
          content: [
            '当社は、本規約を随時変更できるものとし、変更後の規約は当社ウェブサイトまたは本サービス上に表示した時点で効力を有するものとします。',
          ],
        },
        {
          number: 8,
          title: '準拠法・管轄',
          content: [
            '本規約は日本法を準拠法とし、本サービスに関する紛争については東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
          ],
        },
      ],
    },
    privacy: {
      title: 'Cogno プライバシーポリシー',
      effectiveDate: '制定日：2025年11月24日',
      preamble:
        'Cogno（以下「当社」といいます。）は、本サービスにおける利用者の個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。',
      items: [
        {
          number: 1,
          title: '取得する情報',
          content: [
            '当社は、以下の情報を取得する場合があります。',
            '氏名、メールアドレス、その他登録時に提供される情報',
            'タスク内容、ノート、入力データ',
            '利用履歴、アクセス情報',
          ],
        },
        {
          number: 2,
          title: '利用目的',
          content: [
            '取得した情報は、以下の目的で利用します。',
            '本サービスの提供および運営',
            'サービス品質の向上および改善',
            '利用者への通知および連絡',
          ],
        },
        {
          number: 3,
          title: '第三者提供',
          content: [
            '当社は、法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。',
          ],
        },
        {
          number: 4,
          title: '外部サービスの利用',
          content: [
            '当社は、本サービス運営に必要な範囲で外部サービスを利用する場合があります。',
          ],
        },
        {
          number: 5,
          title: '安全管理',
          content: [
            '当社は、取得した個人情報を適切に管理し、不正アクセス、漏洩等の防止に努めます。',
          ],
        },
        {
          number: 6,
          title: '開示・訂正・削除',
          content: [
            '利用者は、自身の個人情報の開示・訂正・削除を当社に請求することができます。',
          ],
        },
        {
          number: 7,
          title: '改定',
          content: ['本ポリシーは、必要に応じて改定されることがあります。'],
        },
        {
          number: 8,
          title: 'お問い合わせ',
          content: [
            '個人情報の取扱いに関するお問い合わせは、当サービス内の問い合わせ窓口よりご連絡ください。',
          ],
        },
      ],
    },
  },
};
