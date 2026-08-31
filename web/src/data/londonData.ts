// src/constants/londonData.ts
export const londonData = {
  name: "Лондон",
  country: "Великобритания",
  universities: [
    {
      name: "Imperial College London",
      rank: 6,
      fields: ["Наука", "Инженерия", "Медицина", "Бизнес"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWV0hEEdvizs7POqse6VrITypZO752xOlxqsSAkof9gA0yY1dc5j7Ub40KPwg2XrX_HziNqMEpc6hkNSARQmazcEsf9MZqGHFPsXbhWxsOaZwcKjPpgFj8eHiZOj3leXcdBZ6IB-IcbV3QPWp8Uveol89Ho7j6SrPZMLR2pMGzgZcyoDCQweISU_tLY0dBRmQK8vpbGF_HZrzgbQY8a2wnjC6JTy0CXdF-i4mgQBXtQjphvBPD7PPGb7t1yuPMB--WKoQ1yc4CslfV",
      description: "Science, Engineering, Medicine, Business",
      badge: "Rank #6 Global"
    },
    {
      name: "UCL (University College London)",
      rank: 8,
      fields: ["Многопрофильный", "Исследовательский университет"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmNpqSXjVDKGxgPq1bJWU5vDraqHK5tOwmLuzd2lT_JPqP_8r1Ex2OKXm0r75xz2VGbUmBmd0mLhtgkEdCiE0U_qmgHnBP310pBOXE8coaK8WotWLsT1QSLjxxxIG1j3noAZrz2wXwRiO-FTwBzDYh2FXIv9g5nTGUWlwR_ARchNvi1F4sl82KkcPVUoGj_pTIaEzAtZfXANmwxQ0BQGM5Ugs1wdNpEB99NBWGbN4Men9roHnJXDCGERnUORBrbHLQdtfgFKnp-lY_",
      description: "Multidisciplinary, Research-intensive",
      badge: "Rank #8 Global"
    }
  ],
  costOfLiving: {
    rent: 850,
    food: 350,
    transport: 100,
    total: [1300, 1600]
  },
  scholarships: [
    {
      name: "Chevening Scholarship",
      type: "Government",
      description: "Грант от правительства Великобритании для иностранных студентов.",
      button: "Подать заявку"
    },
    {
      name: "Commonwealth Scholarship",
      type: "Government",
      description: "Стипендии для студентов из 14 стран для обучения в университетах Великобритании.",
      button: "Подробнее"
    }
  ],
  housing: [
    {
      type: "University Halls",
      price: "£200-350/неделя",
      description: "Лучше всего для первокурсников. Обычно коммунальные услуги включены.",
      icon: "Building2"
    },
    {
      type: "Private Flat Share",
      price: "£150-250/неделя",
      description: "Часто выбирают старшекурсники. Комната в доме на 3-5 человек.",
      icon: "Home"
    },
    {
      type: "Private Studio",
      price: "£350-600+/неделя",
      description: "Современные студенческие апартаменты с удобствами.",
      icon: "BedDouble"
    }
  ],
  essentials: [
    { title: "Banking", description: "Monzo или Revolut для студентов." },
    { title: "Healthcare", description: "NHS surcharge покрывает большинство нужд." },
    { title: "Sim Card", description: "GiffGaff или Voxi — выгодные тарифы." },
    { title: "Part-time Work", description: "Можно работать 20 ч/неделя во время учебы." }
  ],
  timeline: [
    { step: "12 месяцев до", title: "Исследование и выбор", description: "Выберите курс и университет. Проверьте требования." },
    { step: "9 месяцев до", title: "Подача и тесты", description: "Подача через UCAS. IELTS/TOEFL по необходимости." },
    { step: "3 месяца до", title: "Виза и жильё", description: "Примите оффер (CAS). Подайте на визу. Забронируйте жильё." },
    { step: "1 месяц до", title: "Финальная подготовка", description: "Купите билеты, соберите вещи, обменяйте валюту." }
  ]
};
