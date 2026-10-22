export type Tutor = {
  id: number;
  name: string;
  subjects: string;
  experience: number;
  rating: number;
  reviews: number;
  description: string;
  price: number;
  image: string;
  nextLesson: string;
  goals: string[];
  verified: boolean;
  freeTime: boolean;
  grades: string[];
};

export const tutors: Tutor[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    subjects: 'Математика',
    experience: 8,
    rating: 4.9,
    reviews: 48,
    description: 'Объясняю сложное простыми словами. Помогаю полюбить математику и уверенно сдать экзамены.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Чт, 22 окт · 18:00',
    goals: ['Подготовка к ЕНТ', 'Школьная программа'],
    verified: true,
    freeTime: true,
    grades: ['5–9 класс', '10–11 класс'],
  },
  {
    id: 2,
    name: 'Михаил Волков',
    subjects: 'Математика и физика',
    experience: 6,
    rating: 5.0,
    reviews: 32,
    description: 'От школьной программы до олимпиад. Учимся мыслить, а не запоминать формулы.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Пт, 23 окт · 16:00',
    goals: ['Подготовка к ЕНТ', 'Олимпиады'],
    verified: true,
    freeTime: true,
    grades: ['5–9 класс', '10–11 класс', 'Студент'],
  },
  {
    id: 3,
    name: 'Елена Морозова',
    subjects: 'Математика',
    experience: 12,
    rating: 4.9,
    reviews: 61,
    description: 'Устраняем пробелы и готовимся к экзаменам. Спокойные занятия в комфортном темпе.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Чт, 22 окт · 17:00',
    goals: ['Подготовка к ЕНТ', 'Школьная программа'],
    verified: true,
    freeTime: false,
    grades: ['5–9 класс', '10–11 класс'],
  },
  {
    id: 4,
    name: 'Данияр Беков',
    subjects: 'Математика',
    experience: 4,
    rating: 4.8,
    reviews: 27,
    description: 'Помогаю разобраться в сложных темах и подготовиться к контрольным без стресса.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Пт, 23 окт · 19:00',
    goals: ['Школьная программа'],
    verified: false,
    freeTime: true,
    grades: ['1–4 класс', '5–9 класс'],
  },
  {
    id: 5,
    name: 'Алия Нурланова',
    subjects: 'Математика',
    experience: 9,
    rating: 5.0,
    reviews: 54,
    description: 'Готовлю к поступлению в НИШ и БИЛ. Индивидуальный план и понятные объяснения.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Сб, 24 окт · 11:00',
    goals: ['НИШ / БИЛ', 'Подготовка к ЕНТ'],
    verified: true,
    freeTime: true,
    grades: ['5–9 класс', '10–11 класс'],
  },
  {
    id: 6,
    name: 'Руслан Ахметов',
    subjects: 'Математика и физика',
    experience: 5,
    rating: 4.9,
    reviews: 39,
    description: 'Разбираем задачи вместе и шаг за шагом повышаем уверенность и результаты.',
    price: 1700,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Сб, 24 окт · 14:00',
    goals: ['Подготовка к ЕНТ', 'Школьная программа'],
    verified: true,
    freeTime: false,
    grades: ['5–9 класс', '10–11 класс', 'Студент'],
  },
  {
    id: 7,
    name: 'Айжан Сейтова',
    subjects: 'Английский язык',
    experience: 7,
    rating: 4.9,
    reviews: 43,
    description: 'Разговорный английский и подготовка к экзаменам в дружелюбном темпе.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=240&h=240&q=80',
    nextLesson: 'Пн, 26 окт · 17:00',
    goals: ['Школьная программа', 'Подготовка к ЕНТ'],
    verified: true,
    freeTime: true,
    grades: ['5–9 класс', '10–11 класс'],
  },
];
