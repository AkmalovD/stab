// src/constants/tokyoData.ts
export const tokyoData = {
  name: "Токио",
  country: "Япония",
  universities: [
    {
      name: "University of Tokyo (Todai)",
      rank: 28,
      fields: ["Наука", "Инженерия", "Медицина", "Гуманитарные науки"],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Yasuda_Auditorium.jpg/1280px-Yasuda_Auditorium.jpg",
      description: "Science, Engineering, Medicine, Humanities",
      badge: "Rank #28 Global"
    },
    {
      name: "Waseda University",
      rank: 201,
      fields: ["Бизнес", "Социальные науки", "Международные отношения", "Инженерия"],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Waseda_University_Okuma_Auditorium.jpg/1280px-Waseda_University_Okuma_Auditorium.jpg",
      description: "Business, Social Sciences, International Relations",
      badge: "Top University Japan"
    }
  ],
  costOfLiving: {
    rent: 600,
    food: 300,
    transport: 80,
    total: [980, 1300]
  },
  scholarships: [
    {
      name: "MEXT Scholarship",
      type: "Government",
      description: "Грант от правительства Японии, покрывает обучение, проживание и ежемесячное пособие.",
      button: "Подать заявку"
    },
    {
      name: "JASSO Scholarship",
      type: "Government",
      description: "Стипендия Японской организации поддержки студентов для иностранных учащихся.",
      button: "Подробнее"
    }
  ],
  housing: [
    {
      type: "University Dormitory",
      price: "¥20,000-50,000/месяц",
      description: "Лучше всего для первокурсников. Коммунальные услуги часто включены.",
      icon: "Building2"
    },
    {
      type: "Share House",
      price: "¥40,000-70,000/месяц",
      description: "Популярно среди иностранных студентов. Общая кухня и зоны отдыха.",
      icon: "Home"
    },
    {
      type: "Private Apartment",
      price: "¥70,000-130,000+/месяц",
      description: "Отдельная квартира. Требуется гарант (поручитель) при аренде.",
      icon: "BedDouble"
    }
  ],
  essentials: [
    { title: "Banking", description: "Japan Post Bank или Sony Bank — удобны для иностранцев." },
    { title: "Healthcare", description: "Обязательная медицинская страховка (Kokumin Kenko Hoken)." },
    { title: "Sim Card", description: "IIJmio или Rakuten Mobile — выгодные тарифы для студентов." },
    { title: "Part-time Work", description: "Можно работать 28 ч/неделя при наличии разрешения." }
  ],
  timeline: [
    { step: "12 месяцев до", title: "Исследование и выбор", description: "Выберите курс и университет. Проверьте требования по языку и документам." },
    { step: "9 месяцев до", title: "Подача и тесты", description: "Подайте документы напрямую или через JASSO. Сдайте JLPT/TOEFL при необходимости." },
    { step: "3 месяца до", title: "Виза и жильё", description: "Получите COE (Certificate of Eligibility). Подайте на студенческую визу. Забронируйте жильё." },
    { step: "1 месяц до", title: "Финальная подготовка", description: "Купите билеты, соберите вещи, обменяйте валюту на иены." }
  ]
};
