// Initial Technical Specification Data for Prox Marketing Agency
// Document Version: 1.0 (August 28, 2026) | Domain: proxmarketing.uz

export const INITIAL_CMS_DATA = {
  // Hero Banner Settings
  hero: {
    badge: {
      uz: "Raqamli marketing va IT yechimlari",
      ru: "Digital-маркетинг и IT-решения",
      en: "Digital Marketing & IT Solutions"
    },
    title: {
      uz: "Biznesingizni raqamli dunyoda tizimli rivojlantiring va sotuvlarni oshiring",
      ru: "Системно развивайте бизнес в цифровом мире и увеличивайте продажи",
      en: "Systematically grow your business in the digital world and scale sales"
    },
    subtitle: {
      uz: "Prox Marketing Agency — strategik SMM, maqsadli reklama, brending va zamonaviy avtomatlashtirish orqali brendingizni yangi bosqichga olib chiqadi.",
      ru: "Prox Marketing Agency — выводит ваш бренд на новый уровень с помощью стратегического SMM, таргетированной рекламы, брендинга и современной автоматизации.",
      en: "Prox Marketing Agency — takes your brand to the next level through strategic SMM, targeted advertising, branding, and modern automation."
    },
    ctaButton: {
      uz: "Bepul konsultatsiya olish",
      ru: "Получить бесплатную консультацию",
      en: "Get Free Consultation"
    },
    secondaryButton: {
      uz: "Xizmatlar bilan tanishish",
      ru: "Ознакомиться с услугами",
      en: "Explore Services"
    },
    bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    stats: [
      {
        value: "50+",
        labelUz: "Muvaffaqiyatli loyihalar",
        labelRu: "Успешных проектов",
        labelEn: "Successful Projects"
      },
      {
        value: "5x",
        labelUz: "O'rtacha ROI o'sishi",
        labelRu: "Средний рост ROI",
        labelEn: "Average ROI Growth"
      },
      {
        value: "99%",
        labelUz: "Mijozlar mamnuniyati",
        labelRu: "Довольных клиентов",
        labelEn: "Client Satisfaction"
      },
      {
        value: "24/7",
        labelUz: "Tezkor qo'llab-quvvatlash",
        labelRu: "Быстрая поддержка",
        labelEn: "Fast Support"
      }
    ]
  },

  // About Us Page Data
  about: {
    description: {
      uz: "Prox — bizneslarni raqamli dunyoda tizimli rivojlantirish va sotuvlarni oshirishga ixtisoslashgan digital marketing agentligi. Agentlik strategik SMM, marketing, maqsadli reklama va zamonaviy avtomatlashtirish yechimlari orqali brendlarni yangi bosqichga olib chiqadi.",
      ru: "Prox — digital-маркетинговое агентство, специализирующееся на системном развитии бизнеса в цифровом мире и увеличении продаж. Агентство выводит бренды на новый уровень с помощью стратегического SMM, комплексного маркетинга, таргетированной рекламы и современных решений автоматизации.",
      en: "Prox is a digital marketing agency specializing in systematic business growth in the digital space and scaling sales. The agency takes brands to a new level through strategic SMM, marketing, targeted advertising, and cutting-edge automation."
    },
    mission: {
      titleUz: "Bizning missiyamiz",
      titleRu: "Наша миссия",
      titleEn: "Our Mission",
      descUz: "O'zbekiston va xalqaro bozordagi tadbirkorlar va bizneslarga zamonaviy raqamli texnologiyalar, aniq hisob-kitoblar va ijodiy yondashuv orqali shaffof va kafolatlangan sotuv o'sishini taqdim etish.",
      descRu: "Обеспечить предпринимателей и бизнес в Узбекистане и на международном рынке прозрачным и гарантированным ростом продаж с помощью современных цифровых технологий, точных расчетов и креативного подхода.",
      descEn: "Provide entrepreneurs with transparent, guaranteed sales growth using modern digital technologies, accurate metrics, and creative strategy."
    },
    values: [
      {
        icon: "ShieldCheck",
        titleUz: "Shaffoflik va mas'uliyat",
        titleRu: "Прозрачность и ответственность",
        titleEn: "Transparency & Accountability",
        descUz: "Har bir sarflangan reklama byudjeti va erishilgan natijalar bo'yicha batafsil, aniq hisobotlar taqdim etamiz.",
        descRu: "Предоставляем подробные, точные отчеты по каждому затраченному рекламному бюджету и достигнутым результатам.",
        descEn: "We provide detailed, precise reporting for every dollar spent and every milestone achieved."
      },
      {
        icon: "TrendingUp",
        titleUz: "Natijaga yo'naltirilganlik",
        titleRu: "Ориентация на результат",
        titleEn: "Result-Driven Execution",
        descUz: "Shunchaki chiroyli rasm emas, balki aniq mijozlar oqimi (lidlar) va real sotuvlar hosil qilamiz.",
        descRu: "Создаем не просто красивую картинку, а реальный поток клиентов (лидов) и ощутимый рост продаж.",
        descEn: "We do not just create pretty pictures; we drive actual leads and quantifiable revenue growth."
      },
      {
        icon: "Zap",
        titleUz: "Innovatsiya va avtomatlashtirish",
        titleRu: "Инновации и автоматизация",
        titleEn: "Innovation & Automation",
        descUz: "Sun'iy intellekt, Telegram botlar va eng ilg'or CRM integratsiyalari orqali vaqtingizni tejaymiz.",
        descRu: "Экономим ваше время с помощью искусственного интеллекта, Telegram-ботов и передовых CRM-интеграций.",
        descEn: "Save time and resources with AI, custom Telegram bots, and automated CRM integrations."
      },
      {
        icon: "Users",
        titleUz: "Mijoz bilan mustahkam hamkorlik",
        titleRu: "Крепкое партнерство",
        titleEn: "Strong Partnership",
        descUz: "Biz o'zimizni tashqi pudratchi emas, biznesingizning ichki strategik marketing bo'limi deb bilamiz.",
        descRu: "Мы позиционируем себя не как стороннего подрядчика, а как стратегический внутренний отдел вашего бизнеса.",
        descEn: "We act as your dedicated internal strategic marketing team, not just an external contractor."
      }
    ]
  },

  // Services (Exact list from Technical Specification 7.1, 7.2, 7.3)
  services: {
    smm: [
      {
        id: "smm-1",
        titleUz: "Strategiya ishlab chiqish",
        titleRu: "Разработка стратегии",
        titleEn: "Strategy Development",
        descUz: "Auditoriyani o'rganish, maqsadlarni belgilash va yo'l xaritasini tuzish",
        descRu: "Изучение целевой аудитории, постановка ключевых целей и составление дорожной карты",
        descEn: "Audience research, goal definition, and comprehensive roadmap planning",
        icon: "Compass"
      },
      {
        id: "smm-2",
        titleUz: "Kontent yaratish",
        titleRu: "Создание контента",
        titleEn: "Content Creation",
        descUz: "Professional video, storis, motion va kreativ dizaynlar",
        descRu: "Профессиональные видео, сторис, моушн и креативный визуальный дизайн",
        descEn: "Professional video production, stories, motion graphics, and creative designs",
        icon: "Video"
      },
      {
        id: "smm-3",
        titleUz: "Post va storilarni boshqarish",
        titleRu: "Управление постами и сторис",
        titleEn: "Post & Story Management",
        descUz: "Muntazam, sifatli va maqsadli kontent rejalari",
        descRu: "Регулярный, качественный и целевой контент-план публикаций",
        descEn: "Regular, high-quality, and goal-driven content scheduling",
        icon: "CalendarCheck"
      },
      {
        id: "smm-4",
        titleUz: "Reklama kampaniyalari",
        titleRu: "Рекламные кампании",
        titleEn: "Ad Campaigns",
        descUz: "Instagram va Facebook platformalarida to'g'ri target kreativlarni ishga tushirish",
        descRu: "Запуск точных таргетированных креативов в Instagram и Facebook",
        descEn: "Launching laser-targeted creative ad campaigns on Instagram and Facebook",
        icon: "Target"
      },
      {
        id: "smm-5",
        titleUz: "Brend imijini mustahkamlash",
        titleRu: "Укрепление имиджа бренда",
        titleEn: "Brand Image Building",
        descUz: "Mijozlar bilan ishonchli aloqani shakllantirish",
        descRu: "Формирование доверительных и долгосрочных отношений с клиентами",
        descEn: "Building genuine trust and strong community rapport with your audience",
        icon: "Award"
      },
      {
        id: "smm-6",
        titleUz: "Analitika va hisobot",
        titleRu: "Аналитика и отчетность",
        titleEn: "Analytics & Reporting",
        descUz: "Natijalarni raqamlar orqali o'lchash va har oy yakunida hisobot topshirish",
        descRu: "Измерение результатов в цифрах и предоставление детального отчета в конце каждого месяца",
        descEn: "Measuring KPIs with actionable metrics and delivering comprehensive monthly reports",
        icon: "BarChart3"
      }
    ],
    marketing: [
      {
        id: "mkt-1",
        titleUz: "SMM xizmatlaridagi barcha takliflar",
        titleRu: "Все предложения из пакета SMM",
        titleEn: "Full SMM Package Included",
        descUz: "SMM yo'nalishidagi barcha xizmatlar to'liq qamrab olinadi",
        descRu: "Все услуги направления SMM полностью включены в данный комплекс",
        descEn: "Complete coverage of all SMM services bundled seamlessly",
        icon: "CheckCircle2"
      },
      {
        id: "mkt-2",
        titleUz: "Target reklama",
        titleRu: "Таргетированная реклама",
        titleEn: "Targeted Advertising",
        descUz: "To'g'ri auditoriya tanlash va reklama byudjetini optimallashtirish; Google Ads va Telegram Ads uchun reklamalarni joylashtirish",
        descRu: "Подбор точной аудитории и оптимизация бюджета; запуск рекламы в Google Ads и Telegram Ads",
        descEn: "Audience targeting, budget optimization, and launch on Google Ads & Telegram Ads",
        icon: "Layers"
      },
      {
        id: "mkt-3",
        titleUz: "Branding",
        titleRu: "Брендинг",
        titleEn: "Branding & Identity",
        descUz: "Logo, firma uslubi, brandbook, brend ovozi va imijini yaratish",
        descRu: "Создание логотипа, фирменного стиля, брендбука, тональности (brand voice) и имиджа",
        descEn: "Logo design, corporate identity, comprehensive brandbook, and distinctive brand voice",
        icon: "Palette"
      },
      {
        id: "mkt-4",
        titleUz: "Marketing strategiya va konsalting",
        titleRu: "Маркетинговая стратегия и консалтинг",
        titleEn: "Marketing Strategy & Consulting",
        descUz: "Bozor va auditoriya tahlili, strategik reja va sotuvni ko'tarish bo'yicha tavsiyalar",
        descRu: "Анализ рынка и конкурентов, стратегический план и экспертные рекомендации по масштабированию продаж",
        descEn: "Market analysis, strategic roadmap, and expert consulting to elevate sales figures",
        icon: "Briefcase"
      },
      {
        id: "mkt-5",
        titleUz: "Influencer marketing (blogerlar bilan ishlash)",
        titleRu: "Инфлюенс-маркетинг (работа с блогерами)",
        titleEn: "Influencer Marketing",
        descUz: "To'g'ri bloger tanlash va reklama kampaniyasini boshqarish",
        descRu: "Подбор релевантных лидеров мнений и полное ведение рекламных интеграций",
        descEn: "Selecting matching influencers and managing high-converting influencer campaigns",
        icon: "Sparkles"
      },
      {
        id: "mkt-6",
        titleUz: "Sotuv bo'limi nazorati",
        titleRu: "Контроль отдела продаж",
        titleEn: "Sales Department Supervision",
        descUz: "Sotuvchilarni o'qitish va savdoga tayyorlash",
        descRu: "Обучение менеджеров по продажам, скрипты и подготовка к эффективным сделкам",
        descEn: "Training sales representatives, scripting, and preparing the team for closed deals",
        icon: "UserCheck"
      },
      {
        id: "mkt-7",
        titleUz: "To'liq sotuvni nazoratga olish",
        titleRu: "Полный контроль продаж",
        titleEn: "End-to-End Sales Control",
        descUz: "Sotuv jarayonlarini boshidan oxirigacha tizimli boshqarish va nazorat qilish",
        descRu: "Системное сквозное управление и аудит всех этапов воронки продаж",
        descEn: "Systematic end-to-end sales pipeline management and conversion auditing",
        icon: "ShieldAlert"
      }
    ],
    it: [
      {
        id: "it-1",
        titleUz: "Veb-sayt ishlab chiqish",
        titleRu: "Разработка веб-сайтов",
        titleEn: "Website Development",
        descUz: "Landing page, korporativ sayt, internet-do'kon",
        descRu: "Лендинги, многостраничные корпоративные сайты и интернет-магазины под ключ",
        descEn: "High-converting landing pages, corporate portals, and modern e-commerce stores",
        icon: "Globe"
      },
      {
        id: "it-2",
        titleUz: "Mobil ilovalar yaratish",
        titleRu: "Создание мобильных приложений",
        titleEn: "Mobile App Development",
        descUz: "iOS va Android uchun mobil dasturlar",
        descRu: "Нативные и кроссплатформенные мобильные приложения для iOS и Android",
        descEn: "High-performance native and cross-platform mobile apps for iOS and Android",
        icon: "Smartphone"
      },
      {
        id: "it-3",
        titleUz: "Onlayn buyurtma va to'lov tizimlari bilan integratsiya",
        titleRu: "Интеграция систем онлайн-заказа и платежей",
        titleEn: "Payment & Order Integrations",
        descUz: "Zamonaviy to'lov va buyurtma tizimlarini ulash",
        descRu: "Подключение современных платежных шлюзов (Payme, Click, Uzum) и систем учета",
        descEn: "Integration with modern payment gateways (Payme, Click, Stripe) and order pipelines",
        icon: "CreditCard"
      },
      {
        id: "it-4",
        titleUz: "UI/UX dizayn",
        titleRu: "UI/UX дизайн",
        titleEn: "UI/UX Design",
        descUz: "Foydalanuvchi uchun qulay interfeyslar, brend uslubiga mos dizayn yechimlari",
        descRu: "Интуитивно понятные пользовательские интерфейсы и эстетичные дизайн-системы",
        descEn: "User-friendly interfaces, seamless journeys, and bespoke brand-aligned aesthetics",
        icon: "Figma"
      },
      {
        id: "it-5",
        titleUz: "Texnik qo'llab-quvvatlash",
        titleRu: "Техническая поддержка",
        titleEn: "Technical Support & DevOps",
        descUz: "Veb-sayt va dasturlarga xizmat ko'rsatish, xavfsizlik va yangilanishlar",
        descRu: "Бесперебойное обслуживание сайтов и сервисов, кибербезопасность и регулярные обновления",
        descEn: "Ongoing site and server maintenance, robust security protocols, and version updates",
        icon: "Wrench"
      },
      {
        id: "it-6",
        titleUz: "Sun'iy intellekt va botlar",
        titleRu: "Искусственный интеллект и боты",
        titleEn: "AI & Smart Bots",
        descUz: "Telegram botlar, Instagramda AI chat-botlar yaratish va biznes hisoblariga ulash",
        descRu: "Разработка функциональных Telegram-ботов и умных AI-чат-ботов для Instagram и CRM",
        descEn: "Custom Telegram bots, AI-powered Instagram chatbots, and business automation hooks",
        icon: "Bot"
      }
    ]
  },

  // Tariffs / Pricing (Section 8)
  tariffs: {
    smm: [
      {
        id: "smm-pack-1",
        durationUz: "1 oylik",
        durationRu: "1 месяц",
        durationEn: "1 Month",
        price: "$1500",
        periodUz: "/ oy",
        periodRu: "/ мес",
        periodEn: "/ mo",
        featuresUz: [
          "To'liq strategiya va auditoriya tahlili",
          "Oylik sifatli postlar va storilar rejasi",
          "Professional dizayn va video montaj",
          "Target reklama kampaniyasini sozlash",
          "Oylik yakuniy tahliliy hisobot"
        ],
        featuresRu: [
          "Полная стратегия и анализ целевой аудитории",
          "План качественных публикаций и сторис на месяц",
          "Профессиональный дизайн и видеомонтаж",
          "Настройка и оптимизация таргетированной рекламы",
          "Итоговый ежемесячный аналитический отчет"
        ],
        featuresEn: [
          "Full strategy & audience research",
          "Monthly content & story schedule",
          "Professional design & video editing",
          "Targeted ad campaign setup & scaling",
          "Detailed end-of-month analytics report"
        ]
      },
      {
        id: "smm-pack-3",
        durationUz: "3 oylik paket",
        durationRu: "Пакет на 3 месяца",
        durationEn: "3 Months Package",
        price: "$1350",
        periodUz: "/ oy",
        periodRu: "/ мес",
        periodEn: "/ mo",
        featuresUz: [
          "1 oylik paketdagi barcha xizmatlar",
          "Chuqurlashtirilgan brending va vizual uslub",
          "A/B test reklama kampaniyalari",
          "Storislar uchun haftalik interaktivlar",
          "Haftalik oraliq hisobotlar"
        ],
        featuresRu: [
          "Все услуги 1-месячного пакета",
          "Углубленный брендинг и визуальный стиль",
          "A/B тестирование рекламных гипотез",
          "Еженедельные интерактивы в сторис",
          "Еженедельные промежуточные отчеты"
        ],
        featuresEn: [
          "All features from 1-month plan",
          "In-depth visual style enhancement",
          "Systematic A/B ad split testing",
          "Weekly interactive engagement stories",
          "Weekly progress reports"
        ]
      },
      {
        id: "smm-pack-6",
        durationUz: "6 oylik paket",
        durationRu: "Пакет на 6 месяцев",
        durationEn: "6 Months Package",
        price: "$1200",
        periodUz: "/ oy",
        periodRu: "/ мес",
        periodEn: "/ mo",
        featuresUz: [
          "3 oylik paketdagi barcha xizmatlar",
          "Blogerlar bilan integratsiya koordinatsiyasi",
          "Motion-dizayn va maxsus kreativlar",
          "Shaxsiy marketing menejeri",
          "Doimiy auditoriya va raqobatchilar monitoringi"
        ],
        featuresRu: [
          "Все услуги 3-месячного пакета",
          "Координация интеграций с блогерами",
          "Моушн-дизайн и эксклюзивные креативы",
          "Персональный маркетинг-менеджер",
          "Постоянный мониторинг конкурентов и рынка"
        ],
        featuresEn: [
          "All features from 3-month package",
          "Influencer marketing coordination",
          "Motion design & high-level creatives",
          "Dedicated senior account manager",
          "Continuous competitor monitoring"
        ]
      },
      {
        id: "smm-pack-12",
        durationUz: "12 oylik (1 yillik) paket",
        durationRu: "Пакет на 12 месяцев (1 год)",
        durationEn: "12 Months (1 Year) Package",
        price: "$1000",
        periodUz: "/ oy",
        periodRu: "/ мес",
        periodEn: "/ mo",
        featuresUz: [
          "6 oylik paketdagi barcha imkoniyatlar",
          "Maksimal darajadagi brend avtoriteti",
          "Telegram bot orqali savdoni avtomatlashtirish",
          "Yillik strategik brend yo'l xaritasi",
          "24/7 ustuvor texnik va konsalting yordami"
        ],
        featuresRu: [
          "Все возможности 6-месячного пакета",
          "Максимальный рост авторитета бренда",
          "Автоматизация продаж через Telegram-бота",
          "Годовая стратегическая дорожная карта",
          "Приоритетная круглосуточная поддержка 24/7"
        ],
        featuresEn: [
          "Everything in 6-month tier",
          "Maximum brand authority scaling",
          "Sales automation via Telegram bot",
          "Annual strategic brand roadmap",
          "24/7 VIP priority support"
        ]
      }
    ],
    marketing: {
      titleUz: "Marketing xizmati",
      titleRu: "Маркетинг",
      titleEn: "Marketing",
      startingPrice: "$2000",
      prefixUz: "Boshlang'ich narx —",
      prefixRu: "Начальная цена — от",
      prefixEn: "Starting from",
      noteUz: "loyiha hajmiga qarab individual hisoblanadi",
      noteRu: "рассчитывается индивидуально в зависимости от масштаба проекта",
      noteEn: "calculated individually based on project scope",
      includedUz: [
        "SMM xizmatlarining barcha 6 yo'nalishi to'liq qamrovi",
        "Target reklama: Instagram, Facebook, Google Ads & Telegram Ads",
        "To'liq brending, logo, brandbook va vizual identifikatsiya",
        "Chuqur bozor, auditoriya va raqobatchilar tahlili",
        "Influencer marketing va blogerlar bilan to'liq koordinatsiya",
        "Sotuv bo'limi tahlili, skriptlar va savdoga tayyorlash",
        "Sotuv jarayonlarini boshidan oxirigacha tizimli nazorat qilish"
      ],
      includedRu: [
        "Полный охват всех 6 направлений SMM-услуг",
        "Таргетированная реклама: Instagram, Facebook, Google Ads и Telegram Ads",
        "Комплексный брендинг: логотип, брендбук и визуальный стиль",
        "Глубокий анализ рынка, целевой аудитории и конкурентов",
        "Инфлюенс-маркетинг и координация работы с блогерами",
        "Аудит отдела продаж, скрипты и обучение менеджеров",
        "Сквозной системный контроль всех этапов продаж"
      ],
      includedEn: [
        "Full coverage of all 6 SMM pillars",
        "Multi-channel ads: Instagram, Facebook, Google & Telegram Ads",
        "End-to-end branding, logo, guidelines & visual assets",
        "Deep competitor, demographic & industry auditing",
        "Influencer partnerships and media buying management",
        "Sales department training, qualification & scripting",
        "Full-funnel pipeline oversight and revenue optimization"
      ]
    },
    it: {
      titleUz: "IT xizmatlari tariflari",
      titleRu: "Тарифы на IT-услуги",
      titleEn: "IT Services Pricing",
      noteUz: "Har bir loyiha individual buyurtma asosida kelishiladi",
      noteRu: "Каждый проект оценивается и согласуется индивидуально",
      noteEn: "Each project is estimated individually based on requirements",
      categories: [
        {
          nameUz: "Landing Page / Promo sayt",
          nameRu: "Landing Page / Промо-сайт",
          nameEn: "Landing Page / Promo Website",
          estimateUz: "7-14 kun",
          estimateRu: "7-14 дней",
          estimateEn: "7-14 days",
          tagUz: "Tezkor start",
          tagRu: "Быстрый старт",
          tagEn: "Fast Launch"
        },
        {
          nameUz: "Korporativ Veb-sayt",
          nameRu: "Корпоративный веб-сайт",
          nameEn: "Corporate Website",
          estimateUz: "15-30 kun",
          estimateRu: "15-30 дней",
          estimateEn: "15-30 days",
          tagUz: "Biznes uchun",
          tagRu: "Для бизнеса",
          tagEn: "Business"
        },
        {
          nameUz: "Internet-do'kon & To'lov tizimlari",
          nameRu: "Интернет-магазин и платежи",
          nameEn: "E-Commerce & Payments",
          estimateUz: "20-45 kun",
          estimateRu: "20-45 дней",
          estimateEn: "20-45 days",
          tagUz: "E-commerce",
          tagRu: "E-commerce",
          tagEn: "E-commerce"
        },
        {
          nameUz: "Telegram / AI Chat-botlar",
          nameRu: "Telegram / AI чат-боты",
          nameEn: "Telegram / AI Chatbots",
          estimateUz: "5-15 kun",
          estimateRu: "5-15 дней",
          estimateEn: "5-15 days",
          tagUz: "Avtomatlashtirish",
          tagRu: "Автоматизация",
          tagEn: "Automation"
        },
        {
          nameUz: "Mobil ilovalar (iOS & Android)",
          nameRu: "Мобильные приложения (iOS & Android)",
          nameEn: "Mobile Apps (iOS & Android)",
          estimateUz: "30-60+ kun",
          estimateRu: "30-60+ дней",
          estimateEn: "30-60+ days",
          tagUz: "Murakkab tizim",
          tagRu: "Сложная система",
          tagEn: "Enterprise"
        }
      ]
    }
  },

  // Partners & Clients
  partners: [
    {
      id: "partner-1",
      name: "Apex Retail",
      industryUz: "Savdo va Retail",
      industryRu: "Ритейл и торговля",
      industryEn: "Retail & Commerce",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&h=80&q=80"
    },
    {
      id: "partner-2",
      name: "Nova Tech Solutions",
      industryUz: "IT va Telekom",
      industryRu: "IT и телеком",
      industryEn: "IT & Telecom",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&h=80&q=80"
    },
    {
      id: "partner-3",
      name: "SilkRoad Logistics",
      industryUz: "Logistika va Transport",
      industryRu: "Логистика и транспорт",
      industryEn: "Logistics & Freight",
      logo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=200&h=80&q=80"
    },
    {
      id: "partner-4",
      name: "Tashkent Grand Clinic",
      industryUz: "Tibbiyot va Salomatlik",
      industryRu: "Медицина и здоровье",
      industryEn: "Healthcare & Clinic",
      logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&h=80&q=80"
    },
    {
      id: "partner-5",
      name: "Prestige Real Estate",
      industryUz: "Ko'chmas mulk",
      industryRu: "Недвижимость",
      industryEn: "Real Estate",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&h=80&q=80"
    },
    {
      id: "partner-6",
      name: "Orient Food Group",
      industryUz: "Restoran va HoReCa",
      industryRu: "Рестораны и HoReCa",
      industryEn: "Restaurants & HoReCa",
      logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&h=80&q=80"
    }
  ],

  // Portfolio / Cases (Section 6.6)
  portfolio: {
    showInNav: true,
    comingSoonMode: true, // As per TZ: Initially contains 0 published cases and displays stylish "Tez orada" ("Скоро")
    items: []
  },

  // Team Members (Section 6.2)
  team: {
    showOnAbout: false, // As per TZ: By default hidden/empty on public view, toggleable from admin
    members: [
      {
        id: "member-1",
        name: "Azizbek Rahimov",
        roleUz: "Bosh marketing strateg",
        roleRu: "Главный маркетинг-стратег",
        roleEn: "Head of Marketing Strategy",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        bioUz: "7+ yillik tajribaga ega strategik marketolog. 40 dan ortiq yirik kampaniyalarni muvaffaqiyatli boshqargan.",
        bioRu: "Маркетолог-стратег с 7+ летним опытом. Успешно провел более 40 крупных федеральных кампаний."
      },
      {
        id: "member-2",
        name: "Madina Karimova",
        roleUz: "SMM & Kreativ direktor",
        roleRu: "SMM & Креативный директор",
        roleEn: "SMM & Creative Director",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        bioUz: "Vizual brending va virusli videolarni yaratish bo'yicha mutaxassis.",
        bioRu: "Эксперт в области визуального брендинга и создания вирусных видеоформатов."
      },
      {
        id: "member-3",
        name: "Javohir Usmonov",
        roleUz: "Bosh IT arxitektor",
        roleRu: "Главный IT-архитектор",
        roleEn: "Lead IT Architect",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        bioUz: "Veb-ilovalar, API integratsiyalari va AI botlarni ishlab chiqish yetakchisi.",
        bioRu: "Лидер разработки веб-сервисов, сложных API-интеграций и ботов на базе ИИ."
      }
    ]
  },

  // Contact Info (Section 6.7)
  contact: {
    phone: "+998 20 026 04 18",
    phoneClean: "+998200260418",
    instagram: "@prox_uz",
    instagramUrl: "https://instagram.com/prox_uz",
    telegram: "@manager_prox",
    telegramUrl: "https://t.me/manager_prox",
    address: "", // By default empty per TZ: "hozircha jismoniy manzil yo'qligi sababli yashirin"
    mapIframeUrl: "" // By default empty per TZ
  },

  // Telegram Bot Dispatch Configuration (Section 9.1)
  telegramSettings: {
    botToken: "",
    chatId: "",
    isConfigured: false,
    directFallbackUser: "manager_prox"
  },

  // Leads CRM State (Section 9.1 & Admin 8)
  leads: [
    {
      id: "lead-init-1",
      date: "2026-11-05 14:20",
      name: "Rustam Aliyev",
      phone: "+998 90 123 45 67",
      service: "Marketing",
      comment: "Yangi ishlab chiqarish biznesimiz uchun to'liq marketing strategiya kerak.",
      status: "Yangi"
    },
    {
      id: "lead-init-2",
      date: "2026-11-05 11:45",
      name: "Nilufar Xoliqova",
      phone: "+998 99 876 54 32",
      service: "SMM",
      comment: "Kiyim do'koni uchun 6 oylik SMM tarifiga qiziqyapmiz.",
      status: "Jarayonda"
    }
  ],

  // Blog / News module (Extensible, toggleable)
  blog: {
    enabled: false,
    posts: [
      {
        id: "post-1",
        titleUz: "2026-yilda biznesingizni rivojlantirish uchun 5 ta asosiy marketing trendi",
        titleRu: "5 главных трендов маркетинга для масштабирования бизнеса в 2026 году",
        titleEn: "5 Major Marketing Trends to Scale Your Business in 2026",
        date: "2026-10-15",
        author: "Prox Team",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        excerptUz: "Sun'iy intellekt, mikro-video formatlar va sotuv voronkalarini avtomatlashtirish qanday ishlaydi?",
        excerptRu: "Как искусственный интеллект, микро-видео форматы и автоматизация воронок меняют правила игры?"
      }
    ]
  }
};
