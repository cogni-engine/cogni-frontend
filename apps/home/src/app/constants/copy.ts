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
    signIn: string;
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
      title: 'Get your work moving with Cogno',
      description:
        'AI automates everything from planning to execution, intelligently notifying and managing your workflow.',
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
      signIn: 'Sign In',
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
        'Cogno watches every commitment, syncs work across teammates, and maps the path to each deadline—before you even ask.',
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
            'Import calendars, docs, and tasks—Cogno learns your cadence instantly.',
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
            "Based on materials, deadlines, and comprehension levels, Cogno optimizes each student's learning process.\n\nAI constantly checks question responses, progress, and acquisition status, and escalates to instructors when necessary.\n\nTeachers can significantly reduce confirmation and management workload, while students can focus on planning, problem-solving, and deep understanding.",
        },
        {
          title: 'Care & Healthcare',
          description:
            'Standardize and structure care work to prevent knowledge silos.\n\nAI optimally assigns tasks by organizing work, managing the field with situation-appropriate notifications and follow-ups.\n\nAddresses the challenges of work complexity and staff shortages, achieving both efficiency and stable care quality simultaneously.',
        },
        {
          title: 'Personal Management',
          description:
            'Based on goals, lifestyle rhythms, and past behavioral data, Cogno optimizes individual action processes.\n\nFor daily habits including fitness, AI constantly checks progress and execution status, providing notifications and adjustments at appropriate times.\n\nUsers are freed from hesitation and procrastination, maintaining self-discipline while focusing on continuous growth and improving the quality of their actions.',
        },
      ],
    },
    cta: {
      title: 'Discover the new way of working guided by Cogno.',
      description:
        'Launch Cogno in minutes and experience AI-powered automation of planning and execution.',
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
          description: 'Start free and experience Cogno\'s basic features',
          price: '$0',
          priceNote: '/month',
          ctaLabel: 'Get started with Cogno',
          ctaHref: '/contact',
          features: [
            { label: 'Workspace participation (limited)', included: true },
            { label: 'Unlimited message history', included: true },
            { label: 'Note creation (limited)', included: true },
            { label: 'Limited note assignments', included: true },
            { label: 'Advanced AI reasoning and chat (limited)', included: true },
            { label: 'Limited memory and context', included: true },
            { label: 'Limited AI notifications', included: true },
          ],
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'Unlock the full power of AI for your personal productivity',
          price: '$120',
          priceNote: '/month',
          ctaLabel: 'Get started with Cogno',
          ctaHref: '/contact',
          features: [
            { label: 'All Free features included', included: true },
            { label: 'Workspace participation', included: true },
            { label: 'Unlimited message history', included: true },
            { label: 'Note creation', included: true },
            { label: 'Note assignments', included: true },
            { label: 'More memory and context available', included: true },
            { label: 'Unlimited file uploads', included: true },
            { label: 'Advanced AI reasoning and chat', included: true },
            { label: 'AI-assisted notes', included: true },
            { label: 'AI-integrated workspace', included: true },
            { label: 'AI-initiated notifications', included: true },
            { label: 'AI time management', included: true },
          ],
        },
        {
          id: 'business',
          name: 'Business',
          description: 'Collaborate with your team and manage organizational projects efficiently',
          price: '$150',
          priceNote: '/ user / month',
          ctaLabel: 'Get started with Cogno',
          ctaHref: '/contact',
          isBestValue: true,
          features: [
            { label: 'All Pro features included', included: true },
            { label: 'Team invitation links', included: true },
            { label: 'Required admin controls', included: true },
            { label: 'Organizational project management features', included: true },
          ],
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'Deploy at scale with confidence and dedicated support for your organization',
          price: '',
          ctaLabel: 'Contact sales',
          ctaHref: '/contact',
          features: [
            { label: 'All Business features included', included: true },
            { label: 'Large-scale user support', included: true },
            { label: 'Dedicated customer success', included: true },
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
      title: 'Cogno で、仕事が動き出す。',
      description:
        'AIが計画から実行まで自動化し、通知を出してマネジメントしてくれる。',
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
      signIn: 'サインイン',
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
        'Cognoは時間、タスク、集中のリズムを理解し、AIが自動的に次の行動を設計します。ユーザーごとに最適化されたマネジメントを実現。',
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
          description:
            '教材・期限・理解度をもとに、Cognoが生徒一人ひとりの学習プロセスを最適化。\n\nAIが質問対応しながら、進捗・習得状況をチェックし、理解が不十分な場合には講師への質問をともに考えます。\n\n教員は確認・管理の工数を大幅に削減でき、生徒は方向性をぶらさずに効率的に学習できます',
        },
        {
          title: '介護・ヘルスケア',
          description:
            '介護業務をマニュアル化・構造化し、属人化を防止。\n\n業務を整理して最適にアサインし、状況に応じたAIによる通知とフォローで現場をマネジメントします。\n\n業務の複雑さや人員不足に悩む現場でも、無理なく業務を回せる体制を整え、効率化とケア品質の安定を実感できます。',
        },
        {
          title: 'パーソナルマネジメント',
          description:
            '目標・生活リズム・過去の行動データをもとに、Cognoが個人の行動プロセスを最適化。\n\nフィットネスをはじめとした日々の習慣に対して、AIが進捗と実行状況を常時チェックし、適切なタイミングで通知や調整を行います。\n\n迷いや先延ばしから解放され、自己規律を保ちながら、継続的な成長と行動の質の向上に集中できます。',
        },
      ],
    },
    cta: {
      title: 'Cognoが導く新しい動き方を、ぜひ確かめてください',
      description:
        '数分でCognoを起動し、AIによる計画と実行の自動化を体験しましょう。',
      primaryCta: { label: 'Cognoを始める', href: `${NEXT_PUBLIC_APP_URL}` },
      secondaryCta: { label: '営業担当者に問い合わせる', href: '/contact' },
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
          description: 'まずは無料で始めて、Cognoの基本機能を体験できます',
          price: '$0',
          priceNote: '/ 月',
          ctaLabel: 'Cognoを始める',
          ctaHref: '/contact',
          features: [
            { label: '無制限のメッセージ履歴', included: true },
            { label: 'ワークスペース参加に制限あり', included: true },
            { label: 'ノート作成に制限あり', included: true },
            { label: 'ノートの割り当て数に制限あり', included: true },
            { label: 'AIによる高度な推論とチャット（制限あり）', included: true },
            { label: 'メモリとコンテキストに制限あり', included: true },
            { label: 'AI通知に制限あり', included: true },
          ],
        },
        {
          id: 'pro',
          name: 'Pro',
          description: '個人で本格的にCognoを使い、AIの力を最大限に活用',
          price: '$120',
          priceNote: '/ 月',
          ctaLabel: 'Cognoを始める',
          ctaHref: '/contact',
          features: [
            { label: '無制限のメッセージ履歴', included: true },
            { label: '無制限のワークスペース参加', included: true },
            { label: '無制限のノート作成', included: true },
            { label: '無制限のノートの割り当て', included: true },
            { label: 'より多くのメモリとコンテキスト利用可能', included: true },
            { label: 'より多くのファイルアップロード', included: true },
            { label: 'AIによる高度な推論とチャット', included: true },
            { label: 'AI補助ノート', included: true },
            { label: 'AI統合ワークスペース', included: true },
            { label: 'AIによる自発的な通知・確認', included: true },
            { label: 'AIによる時間の管理', included: true },
          ],
        },
        {
          id: 'business',
          name: 'Business',
          description: 'AIを活用して、組織のプロジェクトを効率的に管理・スケーリング',
          price: '$150',
          priceNote: '/ ユーザー / 月',
          ctaLabel: 'Cognoを始める',
          ctaHref: '/contact',
          isBestValue: true,
          features: [
            { label: '無制限のメッセージ履歴・ワークスペース参加', included: true },
            { label: '無制限のノート作成・割り当て', included: true },
            { label: 'より多くのメモリと組織のコンテキスト利用可能', included: true },
            { label: 'より多くのファイルアップロード', included: true },
            { label: 'AIによる高度な推論とチャット・AI補助ノート', included: true },
            { label: 'チームに最適化された、AI統合ワークスペース', included: true },
            { label: '組織のコンテキストを元にした、AIによる自発的な通知', included: true },
            { label: 'AIによる時間の管理・チームメンバーの進捗確認', included: true },
            { label: 'チーム用の招待リンク', included: true },
            { label: '必須の管理者コントロール', included: true },
            { label: '組織プロジェクトの管理機能', included: true },
          ],
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'もっとも包括的なビジネスの基本システムでパフォーマンスを最大化',
          price: '',
          ctaLabel: '営業担当者に問い合わせる',
          ctaHref: '/contact',
          features: [
            { label: 'すべてのBusinessの機能', included: true },
            { label: '無制限のメッセージ履歴・ワークスペース参加・ノート作成・割り当て', included: true },
            { label: '拡張メモリと組織のコンテキスト・ファイルアップロード', included: true },
            { label: 'AIによる高度な推論・補助ノート・統合ワークスペース・自発的通知・時間管理', included: true },
            { label: 'チーム招待・管理者コントロール・組織プロジェクト管理', included: true },
            { label: '大規模ユーザー数対応', included: true },
            { label: '専用カスタマーサクセス', included: true },
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
