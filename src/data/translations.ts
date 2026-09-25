import { SiteLanguage } from '../types';

export interface Translations {
  nav: {
    about: string;
    journey: string;
    education: string;
    experience: string;
    skills: string;
    certificates: string;
    internship: string;
    contact: string;
    cvButton: string;
  };
  hero: {
    storyLabel: string;
    title: string;
    ctaInternship: string;
    ctaAbout: string;
    portraitAlt: string;
    estLabel: string;
    scrollLabel: string;
  };
  about: {
    heading: string;
    subheading: string;
    route: string;
    tagline: string;
    labels: {
      name: string;
      born: string;
      birthplace: string;
      field: string;
      university: string;
      interest: string;
    };
    values: {
      name: string;
      born: string;
      birthplace: string;
      field: string;
      university: string;
      interest: string;
    };
    quoteCredit: string;
    bio1: string;
    bio2: string;
  };
  journey: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    badge: string;
    stepLabel: string;
  };
  skills: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    allTab: string;
    linguisticTab: string;
    professionalTab: string;
    proficiencyLabel: string;
  };
  certificates: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    viewCredential: string;
    previewTitle: string;
    closeModal: string;
    issuerLabel: string;
    dateLabel: string;
    skillsVerified: string;
    filterAll: string;
    filterAcademic: string;
    filterInternship: string;
    filterLeadership: string;
  };
  education: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    currentBadge: string;
  };
  experience: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    detailsLabel: string;
    viewDetails: string;
  };
  languages: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    proficiencyLabel: string;
  };
  internship: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    subtitle: string;
    tabExperience: string;
    tabLearning: string;
    tabReflection: string;
    caddyPillarTitle: string;
    caddyPillarSubtitle: string;
    dailyPillarTitle: string;
    dailyPillarSubtitle: string;
    filterAll: string;
    filterCaddy: string;
    filterDaily: string;
    filterActivity: string;
    facts: {
      organizationLabel: string;
      organizationValue: string;
      organizationSub: string;
      roleLabel: string;
      roleValue: string;
      roleSub: string;
      locationLabel: string;
      locationValue: string;
      locationSub: string;
      periodLabel: string;
      periodValue: string;
      periodSub: string;
    };
    caddyDutiesHeading: string;
    caddyDutiesSubheading: string;
    clickToEnlarge: string;
    videoTitle: string;
    videoSubtitle: string;
    videoArchiveTag: string;
    setVideoSource: string;
    selectVideoSlot: string;
    saveUrl: string;
    uploadMp4: string;
    replaceVideo: string;
    slotReel1: string;
    slotReel1Sub: string;
    slotMain: string;
    slotMainSub: string;
    slotReel2: string;
    slotReel2Sub: string;
  };
  contact: {
    japaneseTitle: string;
    englishTitle: string;
    tag: string;
    heading: string;
    subtitle: string;
    whatsappTitle: string;
    whatsappPrompt: string;
    fastResponseBadge: string;
    chatWhatsapp: string;
    emailLabel: string;
    instagramLabel: string;
    linkedinLabel: string;
    locationLabel: string;
    cvButton: string;
    cvOfficial: string;
    cvDirectPdf: string;
    sendMessage: string;
    inputName: string;
    inputEmail: string;
    inputSubject: string;
    inputSubjectPlaceholder: string;
    inputMessage: string;
    sendButton: string;
    successTitle: string;
    successDesc: string;
  };
  footer: {
    tagline: string;
    locationBiak: string;
    locationOsaka: string;
    scrollTop: string;
    copyright: string;
    philosophy: string;
  };
  cvModal: {
    title: string;
    verifiedDocument: string;
    downloadPdf: string;
    printButton: string;
    closeButton: string;
    tabDocument: string;
    tabInteractive: string;
    docTitle: string;
    openNewTab: string;
    formatNote: string;
    downloadFull: string;
    bornNote: string;
    sectionInternship: string;
    sectionEducation: string;
    sectionOrganization: string;
    sectionSkills: string;
    coreCompetencies: string;
    languageProficiency: string;
  };
}

export const translations: Record<SiteLanguage, Translations> = {
  ja: {
    nav: {
      about: '自己紹介',
      journey: '歩み・軌跡',
      education: '学歴',
      experience: '活動・経験',
      skills: '能力・技能',
      certificates: '資格・実績',
      internship: '大阪実習',
      contact: 'お問い合わせ',
      cvButton: '履歴書プレビュー',
    },
    hero: {
      storyLabel: '私の物語',
      title: '日本文学科 在学生',
      ctaInternship: '日本での実習を見る',
      ctaAbout: '略歴と学問',
      portraitAlt: 'ライナー・ヤワンの写真',
      estLabel: '2026年 卒業見込',
      scrollLabel: 'スクロールして詳しく見る',
    },
    about: {
      heading: '自己紹介',
      subheading: 'ビアク → バンドン → 大阪',
      route: 'ビアク → バンドン → 大阪',
      tagline: '言葉と文化の架け橋',
      labels: {
        name: '氏名',
        born: '生年月日',
        birthplace: '出身地',
        field: '専攻分野',
        university: '大学',
        interest: '趣味・特技',
      },
      values: {
        name: 'ライナー・ジャコブ・ヤワン (Rainer Jackob Yawan)',
        born: '2002年9月22日',
        birthplace: 'インドネシア・パプア州ビアク島',
        field: '日本文学専攻（日本語学・文化）',
        university: 'マラナタキリスト教大学 (Universitas Kristen Maranatha)',
        interest: 'フットサル・サッカー・異文化交流',
      },
      quoteCredit: '座右の銘 · ライナー・ヤワン',
      bio1: 'インドネシア東部パプア州ビアク島で生まれ育ち、幼少期から異なる地域や文化への強い探究心を持ち続けてきました。ジャカルタでの日本語集中特訓を経て、マラナタキリスト教大学日本文学科へ進学。日本語学・日本文学・日本社会文化を深く学んでいます。',
      bio2: '2025年からは名門「大阪ゴルフクラブ」での国際キャディ実習生として日本に滞在。実践的なスポーツ敬語、徹底したおもてなし精神、コースマネジメントを身につけながら、インドネシアと日本を繋ぐ国際人を目指して日々研鑽を積んでいます。',
    },
    journey: {
      japaneseTitle: '文化の軌跡',
      englishTitle: 'CULTURAL JOURNEY MAP',
      tag: '歩みと経歴',
      subtitle: '故郷パプア州ビアク島から、ジャカルタ、バンドンを経て、大阪での国際実習に至る軌跡。',
      badge: 'ビアク → 大阪',
      stepLabel: 'ステップ',
    },
    skills: {
      japaneseTitle: '能力・技能',
      englishTitle: 'SKILLS & COMPETENCIES',
      tag: '保有技能・資格',
      subtitle: '履歴書（CV）記載の公式スキル・語学運用能力および実践的なチームワーク・対人折衝力。',
      allTab: 'すべての能力',
      linguisticTab: '語学能力（言語）',
      professionalTab: '主要実務・対人能力',
      proficiencyLabel: '習熟度',
    },
    certificates: {
      japaneseTitle: '資格・実績',
      englishTitle: 'CERTIFICATES & ACHIEVEMENTS',
      tag: '公的修了証・表彰',
      subtitle: '公式資格、大学学部長賞（ディーンズ・リスト）、および文化芸能活動の実績。',
      viewCredential: '証明書の詳細を見る',
      previewTitle: '公式修了証・資格証明書',
      closeModal: '閉じる',
      issuerLabel: '発行元',
      dateLabel: '取得年月',
      skillsVerified: '認定スキル・能力',
      filterAll: 'すべて',
      filterAcademic: '学業優秀賞',
      filterInternship: '実習・国際',
      filterLeadership: '組織・奉仕',
    },
    education: {
      japaneseTitle: '学びの軌跡',
      englishTitle: 'EDUCATION & FORMATION',
      tag: '学歴・教育背景',
      subtitle: '初等教育から現在に至る日本文学研究までの教育の歩み。',
      currentBadge: '在学中・学位取得見込',
    },
    experience: {
      japaneseTitle: '活動・キャンパスライフ',
      englishTitle: 'ACTIVITIES & CAMPUS LIFE',
      tag: '現場実績・学生生活',
      subtitle: '国際キャディ実習、JIC日本語・文化研修、日本語指導、学生代表、文化祭舞台統括など多様な現場経験。',
      detailsLabel: '詳細を見る',
      viewDetails: '詳細を見る',
    },
    languages: {
      japaneseTitle: '言語能力',
      englishTitle: 'LANGUAGE PROFICIENCY',
      tag: '多言語運用力',
      subtitle: 'インドネシア語・英語・日本語の多言語コミュニケーション能力。',
      proficiencyLabel: '習熟度',
    },
    internship: {
      japaneseTitle: '大阪ゴルフクラブ実習・日本での日常',
      englishTitle: 'CADDY INTERNSHIP & DAILY LIFE IN JAPAN',
      tag: '実習・日本生活記録',
      subtitle: '名門大阪ゴルフクラブでのキャディ実務と、関西での文化体験・日本生活の記録。',
      tabExperience: 'キャディ現場実務',
      tabLearning: 'おもてなし・敬語習得',
      tabReflection: '成長と文化の架け橋',
      caddyPillarTitle: '大阪ゴルフクラブ・キャディ実習',
      caddyPillarSubtitle: '1937年開場の名門シーサイドコースでのコース管理・キャディ接客・乗用カート運行',
      dailyPillarTitle: '日本での日常生活と文化探訪',
      dailyPillarSubtitle: '関西（神戸・大阪）での暮らし、異人館街の散策、美しい紅葉と自立生活',
      filterAll: 'すべての写真',
      filterCaddy: '⛳ キャディ実習・ゴルフ',
      filterDaily: '🍁 日本での日常・街歩き',
      filterActivity: '⭐ 学内・教育活動',
      facts: {
        organizationLabel: '実習機関',
        organizationValue: '大阪ゴルフクラブ',
        organizationSub: '大阪府泉南郡岬町 (1937年開場)',
        roleLabel: '役職・実習内容',
        roleValue: '国際キャディ・接客実習生',
        roleSub: 'コース案内・プレイヤー支援',
        locationLabel: '実習拠点',
        locationValue: '大阪府岬町 / 関西圏',
        locationSub: 'シーサイドリンクスコース',
        periodLabel: '実習期間',
        periodValue: '2025年 - 2026年',
        periodSub: '国際長期実習プログラム',
      },
      caddyDutiesHeading: 'キャディ実務における責任と実践項目',
      caddyDutiesSubheading: 'ゴルフ規則の遵守、安全運行、お客様へのきめ細やかな配慮',
      clickToEnlarge: '拡大して見る',
      videoTitle: '実習・日本生活の映像記録',
      videoSubtitle: '大阪ゴルフクラブでの実務と関西での生活を収めたショート動画ギャラリー',
      videoArchiveTag: '実習動画アーカイブ',
      setVideoSource: '動画ソース設定',
      selectVideoSlot: '動画スロットを選択:',
      saveUrl: 'URLを保存',
      uploadMp4: 'MP4をアップロード',
      replaceVideo: '動画を変更',
      slotReel1: '映像 一',
      slotReel1Sub: 'コース業務・キャディ実務',
      slotMain: 'メイン映像',
      slotMainSub: '実習特集・ハイライト',
      slotReel2: '映像 二',
      slotReel2Sub: '日本生活・異文化体験',
    },
    contact: {
      japaneseTitle: 'お問い合わせ',
      englishTitle: 'GET IN TOUCH',
      tag: 'ご連絡窓口',
      heading: 'お問い合わせ・ご連絡',
      subtitle: '語学研究、協業、実習、キャリアに関するご質問やメッセージをお待ちしております。',
      whatsappTitle: 'WhatsAppで直接連絡',
      whatsappPrompt: '迅速なメッセージ交換をご希望の場合は、WhatsAppから直接ご連絡いただけます。',
      fastResponseBadge: '迅速対応',
      chatWhatsapp: 'WhatsAppを開く',
      emailLabel: '公式メール',
      instagramLabel: 'インスタグラム',
      linkedinLabel: 'リンクトイン',
      locationLabel: '活動拠点',
      cvButton: '履歴書（CV）プレビュー・ダウンロード',
      cvOfficial: '公式履歴書（日英併記）',
      cvDirectPdf: 'PDF直接ダウンロード',
      sendMessage: 'メッセージ送信',
      inputName: 'お名前',
      inputEmail: 'メールアドレス',
      inputSubject: '件名・ご用件',
      inputSubjectPlaceholder: '語学研修、協業、実習に関するお問い合わせなど...',
      inputMessage: 'お問い合わせ内容...',
      sendButton: 'メッセージを送信する',
      successTitle: '送信完了',
      successDesc: 'メッセージを受け付けました。折り返しご連絡いたします。',
    },
    footer: {
      tagline: '日本文学科在学中 · 国際キャディ実習生',
      locationBiak: 'パプア州ビアク',
      locationOsaka: '日本・大阪',
      scrollTop: 'ページ最上部へ戻る',
      copyright: '© 2026 Rainer Jackob Yawan. All rights reserved.',
      philosophy: '一期一会 · 言葉と文化を繋ぐ歩み',
    },
    cvModal: {
      title: '履歴書 · 職務経歴書 (CV)',
      verifiedDocument: 'ライナー・ジャコブ・ヤワン · 公式確認済文書',
      downloadPdf: 'PDFダウンロード',
      printButton: '印刷する',
      closeButton: '閉じる',
      tabDocument: '公式CV文書 (PDF)',
      tabInteractive: 'ポートフォリオ形式',
      docTitle: '公式履歴書 · ライナー・ジャコブ・ヤワン',
      openNewTab: '新しいタブでPDFを開く',
      formatNote: '標準PDF形式 · 1ページ',
      downloadFull: '完全版ファイル（.pdf）を保存',
      bornNote: '生年月日・出身: 2002年9月22日（パプア州ビアク島出身）',
      sectionInternship: '職歴・国際実習経験 (WORK EXPERIENCE & INTERNSHIPS)',
      sectionEducation: '学歴・教育背景 (EDUCATION)',
      sectionOrganization: '組織・委員会活動経験 (ORGANIZATIONAL EXPERIENCE)',
      sectionSkills: '保有能力・語学力 (SKILLS & LANGUAGES)',
      coreCompetencies: '主要実務能力',
      languageProficiency: '語学力・運用レベル',
    },
  },
  en: {
    nav: {
      about: 'About',
      journey: 'Journey',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      certificates: 'Certificates',
      internship: 'Japan Internship',
      contact: 'Contact',
      cvButton: 'Preview CV',
    },
    hero: {
      storyLabel: 'My Story',
      title: 'Japanese Literature Student',
      ctaInternship: 'Explore Internship',
      ctaAbout: 'Biography & Studies',
      portraitAlt: 'Rainer Jackob Yawan Portrait',
      estLabel: 'Class of 2026',
      scrollLabel: 'Scroll to Explore',
    },
    about: {
      heading: 'About Me',
      subheading: 'Biak → Bandung → Osaka',
      route: 'Biak → Bandung → Osaka',
      tagline: 'Bridging Language and Culture',
      labels: {
        name: 'NAME',
        born: 'BORN',
        birthplace: 'BIRTHPLACE',
        field: 'FIELD OF STUDY',
        university: 'UNIVERSITY',
        interest: 'INTEREST',
      },
      values: {
        name: 'Rainer Jackob Yawan',
        born: 'September 22, 2002',
        birthplace: 'Biak Island, Papua, Indonesia',
        field: 'Japanese Literature (Linguistics & Culture)',
        university: 'Maranatha Christian University',
        interest: 'Futsal, Football & Cultural Exchange',
      },
      quoteCredit: 'Personal Motto · Rainer Jackob Yawan',
      bio1: 'Born and raised on Biak Island in Papua, Indonesia, I have always held a strong curiosity for cultures and languages across the globe. After intensive preparatory training in Jakarta, I enrolled in Japanese Literature at Maranatha Christian University to delve deeply into Japanese linguistics, literature, and society.',
      bio2: 'In 2025, I began an international professional caddy internship at the prestigious Osaka Golf Club in Japan. Practicing sports keigo, delivering genuine Omotenashi hospitality, and navigating coastal fairways daily, I am dedicated to serving as a resilient cultural bridge between Indonesia and Japan.',
    },
    journey: {
      japaneseTitle: '文化の軌跡',
      englishTitle: 'CULTURAL JOURNEY MAP',
      tag: 'TRAJECTORY & REGIONS',
      subtitle: 'Tracing the educational and cultural trajectory from Biak Island to hands-on immersion in Osaka, Japan.',
      badge: 'BIAK → OSAKA',
      stepLabel: 'STEP',
    },
    skills: {
      japaneseTitle: '能力・技能',
      englishTitle: 'SKILLS & COMPETENCIES',
      tag: 'EXPERTISE & LANGUAGES',
      subtitle: 'Verified language proficiencies and core professional competencies based on the official Curriculum Vitae (CV).',
      allTab: 'All Competencies',
      linguisticTab: 'Language Proficiencies',
      professionalTab: 'Core Professional Skills',
      proficiencyLabel: 'Proficiency',
    },
    certificates: {
      japaneseTitle: '資格・実績',
      englishTitle: 'CERTIFICATES & ACHIEVEMENTS',
      tag: 'HONORS & CREDENTIALS',
      subtitle: 'Verified academic honors, Dean’s List awards, and international program certifications.',
      viewCredential: 'View Credential Details',
      previewTitle: 'Official Certificate Preview',
      closeModal: 'Close Preview',
      issuerLabel: 'Issuing Organization',
      dateLabel: 'Issue Date / Period',
      skillsVerified: 'Skills Verified',
      filterAll: 'All Credentials',
      filterAcademic: "Dean's List & Honors",
      filterInternship: 'Internship & Global',
      filterLeadership: 'Leadership & Service',
    },
    education: {
      japaneseTitle: '学びの軌跡',
      englishTitle: 'EDUCATION & FORMATION',
      tag: 'ACADEMIC BACKGROUND',
      subtitle: 'Academic journey from early schooling in Papua to higher education in Japanese Literature.',
      currentBadge: 'Current Degree Candidate',
    },
    experience: {
      japaneseTitle: '活動と経験',
      englishTitle: 'ACTIVITIES & CAMPUS LIFE',
      tag: 'ROLES & CAMPUS LIFE',
      subtitle: 'International caddy internship, JIC vocational & cultural preparation, Japanese instruction, student leadership, and stage management.',
      detailsLabel: 'View Details',
      viewDetails: 'View Details',
    },
    languages: {
      japaneseTitle: '言語能力',
      englishTitle: 'LANGUAGE PROFICIENCY',
      tag: 'MULTILINGUAL MASTERY',
      subtitle: 'Communication competency across Indonesian, English, and Japanese environments.',
      proficiencyLabel: 'Proficiency',
    },
    internship: {
      japaneseTitle: '大阪ゴルフクラブ実習・日本での日常',
      englishTitle: 'CADDY INTERNSHIP & DAILY LIFE IN JAPAN',
      tag: 'INTERNSHIP & JAPAN LIVING',
      subtitle: 'Hands-on caddy operations at the historic Osaka Golf Club alongside vibrant daily life and cultural immersion across Japan.',
      tabExperience: 'Caddy Operations & Hospitality',
      tabLearning: 'Real-Time Keigo & Omotenashi',
      tabReflection: 'Cross-Cultural Growth',
      caddyPillarTitle: 'Osaka Golf Club · Caddy Internship',
      caddyPillarSubtitle: 'Course management, green reading, cart navigation, and Japanese hospitality at a classic 1937 seaside course',
      dailyPillarTitle: 'Daily Life & Cultural Immersion in Japan',
      dailyPillarSubtitle: 'Independent living, exploring Kobe’s historic Kitano-cho, autumn foliage, and bonding with local community',
      filterAll: 'All Photographs',
      filterCaddy: '⛳ Caddy & Golf',
      filterDaily: '🍁 Daily Life · Japan',
      filterActivity: '⭐ Campus & Teaching',
      facts: {
        organizationLabel: 'ORGANIZATION',
        organizationValue: 'Osaka Golf Club',
        organizationSub: 'Misaki, Osaka Prefecture (Est. 1937)',
        roleLabel: 'ROLE & POSITION',
        roleValue: 'International Caddy & Hospitality Intern',
        roleSub: 'Fairway Navigation & Player Support',
        locationLabel: 'LOCATION',
        locationValue: 'Misaki, Osaka & Kansai, Japan',
        locationSub: 'Historic Seaside Links Course',
        periodLabel: 'TENURE PERIOD',
        periodValue: '2025 - 2026',
        periodSub: 'International Internship Program',
      },
      caddyDutiesHeading: 'Key Caddy Operational Responsibilities & Skills',
      caddyDutiesSubheading: 'Strict adherence to golfing etiquette, player safety, and anticipatory care',
      clickToEnlarge: 'Click to Enlarge',
      videoTitle: 'Visual Impressions & Video Journal',
      videoSubtitle: 'A collection of visual moments capturing fairway routines and personal life across Japan',
      videoArchiveTag: 'VIDEO REELS ARCHIVE',
      setVideoSource: 'Set Video Source',
      selectVideoSlot: 'Select Video Slot:',
      saveUrl: 'Save URL',
      uploadMp4: 'Upload MP4',
      replaceVideo: 'Replace Video',
      slotReel1: 'REEL 01',
      slotReel1Sub: 'Course & Caddy Duties',
      slotMain: 'MAIN REEL',
      slotMainSub: 'Internship Feature',
      slotReel2: 'REEL 02',
      slotReel2Sub: 'Japan Life & Immersion',
    },
    contact: {
      japaneseTitle: 'つながる',
      englishTitle: 'CONTACT & INQUIRIES',
      tag: 'CONNECT & INQUIRE',
      heading: 'Contact & Inquiries',
      subtitle: 'Feel free to reach out for collaborations, academic inquiries, or language exchange.',
      whatsappTitle: 'Direct WhatsApp Chat',
      whatsappPrompt: 'Connect immediately via WhatsApp for responsive and direct communication.',
      fastResponseBadge: 'FAST RESPONSE',
      chatWhatsapp: 'Message on WhatsApp',
      emailLabel: 'Official Email',
      instagramLabel: 'INSTAGRAM',
      linkedinLabel: 'LINKEDIN',
      locationLabel: 'Current Location',
      cvButton: 'PREVIEW & DOWNLOAD CV (RÉSUMÉ)',
      cvOfficial: 'Official Curriculum Vitae (Bilingual)',
      cvDirectPdf: 'Direct Download (PDF)',
      sendMessage: 'Send a Message',
      inputName: 'Your Name',
      inputEmail: 'Email Address',
      inputSubject: 'Subject / Topic',
      inputSubjectPlaceholder: 'Language study, collaboration, internship inquiry...',
      inputMessage: 'Your message...',
      sendButton: 'Send Message',
      successTitle: 'Message Received',
      successDesc: 'Thank you for reaching out. I will respond to you promptly.',
    },
    footer: {
      tagline: 'Undergraduate in Japanese Literature · International Caddy Intern',
      locationBiak: 'Biak, Papua',
      locationOsaka: 'Osaka, Japan',
      scrollTop: 'Back to Top',
      copyright: '© 2026 Rainer Jackob Yawan. All rights reserved.',
      philosophy: 'Ichi-go Ichi-e · Treasuring Every Cultural Encounter',
    },
    cvModal: {
      title: 'Curriculum Vitae (CV)',
      verifiedDocument: 'Rainer Jackob Yawan · Verified Document',
      downloadPdf: 'Download PDF',
      printButton: 'Print',
      closeButton: 'Close',
      tabDocument: 'Authentic Document (PDF)',
      tabInteractive: 'Portfolio Format',
      docTitle: 'Curriculum Vitae · Rainer Jackob Yawan',
      openNewTab: 'Open PDF in New Tab',
      formatNote: 'Standard PDF Format · 1 Page',
      downloadFull: 'Download Full File (.pdf)',
      bornNote: 'DOB & Origin: Sept 22, 2002 (Biak Island, Papua, Indonesia)',
      sectionInternship: 'WORK EXPERIENCE & INTERNATIONAL INTERNSHIP',
      sectionEducation: 'EDUCATION & ACADEMIC FORMATION',
      sectionOrganization: 'ORGANIZATIONAL EXPERIENCE & LEADERSHIP',
      sectionSkills: 'SKILLS, COMPETENCIES & LANGUAGES',
      coreCompetencies: 'Core Professional Competencies',
      languageProficiency: 'Language Proficiency',
    },
  },
};
