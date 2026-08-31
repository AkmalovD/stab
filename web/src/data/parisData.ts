// src/constants/parisData.ts
export const parisData = {
  name: "Париж",
  country: "Франция",
  universities: [
    {
      name: "Sorbonne University",
      rank: 59,
      fields: ["Гуманитарные науки", "Медицина", "Наука", "Право"],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/cinquième/Sorbonne_University_main_building.jpg/1280px-Sorbonne_University_main_building.jpg",
      description: "Humanities, Medicine, Science, Law",
      badge: "Rank #59 Global"
    },
    {
      name: "Sciences Po Paris",
      rank: 220,
      fields: ["Политология", "Международные отношения", "Экономика", "Право"],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sciences_Po_Paris_main_entrance.jpg/1280px-Sciences_Po_Paris_main_entrance.jpg",
      description: "Political Science, International Relations, Economics",
      badge: "Top University France"
    }
  ],
  costOfLiving: {
    rent: 800,
    food: 350,
    transport: 90,
    total: [1240, 1600]
  },
  scholarships: [
    {
      name: "Eiffel Excellence Scholarship",
      type: "Government",
      description: "Грант от правительства Франции, покрывает обучение, проживание и ежемесячное пособие.",
      button: "Подать заявку"
    },
    {
      name: "Campus France Scholarship",
      type: "Government",
      description: "Стипендия французского агентства поддержки студентов для иностранных учащихся.",
      button: "Подробнее"
    }
  ],
  housing: [
    {
      type: "University Dormitory (CROUS)",
      price: "€200-400/месяц",
      description: "Лучше всего для первокурсников. Субсидируется государством, коммунальные услуги включены.",
      icon: "Building2"
    },
    {
      type: "Share House / Colocation",
      price: "€500-800/месяц",
      description: "Популярно среди иностранных студентов. Общая кухня и зоны отдыха.",
      icon: "Home"
    },
    {
      type: "Private Apartment",
      price: "€900-1500+/месяц",
      description: "Отдельная квартира. Требуется поручитель или сервис Visale при аренде.",
      icon: "BedDouble"
    }
  ],
  essentials: [
    { title: "Banking", description: "BNP Paribas или N26 — удобны для иностранцев и студентов." },
    { title: "Healthcare", description: "Обязательная медицинская страховка через Sécurité Sociale (CPAM)." },
    { title: "Sim Card", description: "Free Mobile или Lebara — выгодные тарифы для студентов." },
    { title: "Part-time Work", description: "Можно работать до 964 часов в год (≈20 ч/неделя) по студенческой визе." }
  ],
  timeline: [
    { step: "12 месяцев до", title: "Исследование и выбор", description: "Выберите курс и университет. Проверьте языковые требования: французский (DELF/DALF) или английский (IELTS/TOEFL)." },
    { step: "9 месяцев до", title: "Подача и тесты", description: "Подайте документы через Campus France или напрямую. Сдайте языковые тесты при необходимости." },
    { step: "3 месяца до", title: "Виза и жильё", description: "Подайте на долгосрочную студенческую визу (VLS-TS). Подайте заявку на жильё CROUS через Portail Trouver Mon Master." },
    { step: "1 месяц до", title: "Финальная подготовка", description: "Купите билеты, соберите вещи, обменяйте валюту на евро. Зарегистрируйтесь на платформе ETUDES EN FRANCE." }
  ]
};
