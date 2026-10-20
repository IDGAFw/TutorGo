import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  LockKeyhole,
  ShieldCheck,
  Star,
  Video,
} from 'lucide-react';
import { tutors } from './tutors';
import SiteHeader, { BrandLogo } from './SiteHeader';

const dates = [
  { day: 'Пн', date: 19 },
  { day: 'Вт', date: 20 },
  { day: 'Ср', date: 21 },
  { day: 'Чт', date: 22 },
  { day: 'Пт', date: 23 },
  { day: 'Сб', date: 24 },
];
const times = ['10:00', '12:00', '16:00', '18:00', '19:00', '20:00'];

function PageFooter() {
  return (
    <footer className="mt-8 border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-sm sm:px-8">
        <a href="/" aria-label="TutorGo.kz — главная"><BrandLogo className="text-lg" /></a>
        <span className="text-xs text-slate-400">Учиться — значит расти.</span>
      </div>
    </footer>
  );
}

function TutorProfile({ tutorId }: { tutorId: number }) {
  const tutor = tutors.find((item) => item.id === tutorId);
  const [selectedDate, setSelectedDate] = useState(22);
  const [selectedTime, setSelectedTime] = useState('18:00');

  if (!tutor) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Репетитор не найден</h1>
        <a href="/tutors" className="mt-4 inline-block text-blue-600 hover:underline">Вернуться к каталогу</a>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 pb-10 pt-7 sm:px-8">
        <div className="mb-5 text-xs text-slate-400">
          <a href="/" className="hover:text-blue-600">Главная</a><span className="px-1.5">/</span>
          <a href="/tutors" className="hover:text-blue-600">Репетиторы</a><span className="px-1.5">/</span>
          <span>{tutor.subjects}</span><span className="px-1.5">/</span>{tutor.name}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <img src={tutor.image} alt={tutor.name} className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28" />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap gap-2">
                {tutor.verified && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">Документы проверены</span>}
                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-700">Частный преподаватель</span>
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl">{tutor.name}</h1>
              <p className="mt-1 text-sm text-slate-500">Репетитор по предмету «{tutor.subjects}» · Опыт {tutor.experience} лет</p>
              <div className="mt-2 flex items-center gap-1.5 text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <strong>{tutor.rating.toFixed(1).replace('.', ',')}</strong>
                <span className="text-slate-400">{tutor.reviews} отзывов</span>
                <span className="ml-2 rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">Сейчас на сайте</span>
              </div>
            </div>
            <button type="button" aria-label="Добавить в избранное" className="self-start rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 sm:self-center">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </section>

        <nav aria-label="Навигация по профилю" className="mt-4 flex gap-5 overflow-x-auto border-b border-slate-200 text-sm">
          <a href="#about" className="border-b-2 border-blue-600 pb-3 font-medium text-blue-600">О себе</a>
          <a href="#education" className="pb-3 text-slate-500 hover:text-blue-600">Образование</a>
          <a href="#reviews" className="pb-3 text-slate-500 hover:text-blue-600">Отзывы · {tutor.reviews}</a>
        </nav>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="space-y-5">
            <section id="about" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold">Сначала понять. Потом решить.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{tutor.description} На занятиях разбираем темы на понятных примерах и составляем план, который подходит именно ученику.</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Первое занятие — знакомство, определение цели и разбор вопросов. Вы увидите план обучения и сможете спокойно решить, подходит ли вам такой формат.</p>
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-indigo-50 p-4 text-center">
                <div><strong className="block text-2xl text-blue-600">{tutor.reviews + 38}</strong><span className="text-[11px] text-slate-500">учеников</span></div>
                <div><strong className="block text-2xl text-blue-600">{tutor.reviews}+</strong><span className="text-[11px] text-slate-500">отзывов</span></div>
                <div><strong className="block text-2xl text-blue-600">{tutor.experience} лет</strong><span className="text-[11px] text-slate-500">опыта</span></div>
              </div>
              <h3 className="mt-5 font-semibold">Как проходят занятия</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><Video className="h-4 w-4 shrink-0 text-blue-600" /><span><strong className="text-slate-800">План под вашу цель</strong><br />Определяем задачу и двигаемся к результату в подходящем темпе.</span></li>
                <li className="flex gap-3"><GraduationCap className="h-4 w-4 shrink-0 text-blue-600" /><span><strong className="text-slate-800">Практика вместо зубрёжки</strong><br />Разбираем тему на примерах и закрепляем знания упражнениями.</span></li>
                <li className="flex gap-3"><Check className="h-4 w-4 shrink-0 text-blue-600" /><span><strong className="text-slate-800">Поддержка между встречами</strong><br />Домашние задания и обратная связь после урока.</span></li>
              </ul>
            </section>

            <section id="education" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Образование и опыт</h2>
                {tutor.verified && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] text-emerald-700">Проверено TutorGo</span>}
              </div>
              <div className="mt-5 flex gap-3">
                <GraduationCap className="h-5 w-5 shrink-0 text-blue-600" />
                <div><strong className="text-sm">Педагогическое образование</strong><p className="mt-1 text-xs text-slate-500">Профильное образование · {tutor.experience} лет преподавательской практики</p></div>
              </div>
              <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
                <Check className="h-5 w-5 shrink-0 text-blue-600" />
                <div><strong className="text-sm">Частный преподаватель</strong><p className="mt-1 text-xs text-slate-500">Индивидуальные онлайн-занятия</p></div>
              </div>
            </section>

            <section id="reviews" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Отзывы учеников</h2>
                <span className="flex items-center gap-1 text-sm text-blue-600"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{tutor.rating.toFixed(1).replace('.', ',')}</span>
              </div>
              {[
                { name: 'София', text: 'Раньше боялась открывать задания ЕНТ. Сейчас решаю намного увереннее и понимаю, откуда берётся ответ.' },
                { name: 'Дамир', text: 'Занятия проходят спокойно и понятно. Стал увереннее на уроках и вижу прогресс после каждой темы.' },
              ].map((review) => (
                <article key={review.name} className="mt-5 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div><strong className="text-sm">{review.name}</strong><p className="text-[11px] text-slate-400">Ученик · недавно</p></div>
                    <span className="text-amber-400" aria-label="5 из 5 звёзд">★★★★★</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-slate-600">{review.text}</p>
                </article>
              ))}
              <p className="mt-4 text-xs text-slate-400">Показаны примеры отзывов для демонстрации страницы.</p>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xl font-bold">{tutor.price.toLocaleString('ru-RU')} ₸ <span className="text-xs font-normal text-slate-400">/ 60 минут</span></p>
              <div className="mt-5 flex items-center justify-between">
                <h2 className="font-semibold">Выберите дату</h2>
                <div className="flex gap-1">
                  <button type="button" aria-label="Предыдущий месяц" className="rounded p-1 text-slate-400 hover:bg-slate-100"><ChevronLeft className="h-4 w-4" /></button>
                  <button type="button" aria-label="Следующий месяц" className="rounded p-1 text-slate-400 hover:bg-slate-100"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">Октябрь 2026</p>
              <div className="mt-3 grid grid-cols-6 gap-1.5">
                {dates.map((date) => (
                  <button key={date.date} type="button" onClick={() => setSelectedDate(date.date)} className={`rounded-lg py-2 text-center ${selectedDate === date.date ? 'bg-blue-600 text-white' : 'border border-slate-100 text-slate-600 hover:bg-blue-50'}`}>
                    <span className="block text-[9px] opacity-70">{date.day}</span><span className="text-xs font-semibold">{date.date}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs font-medium text-slate-600">Доступное время</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {times.slice(0, 3).map((time) => (
                  <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-lg border px-2 py-2 text-xs ${selectedTime === time ? 'border-blue-600 bg-blue-50 font-semibold text-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>{time}</button>
                ))}
              </div>
              <a href={`/booking/${tutor.id}?date=${selectedDate}&time=${encodeURIComponent(selectedTime)}`} className="mt-4 block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700">Забронировать занятие</a>
              <p className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700"><ShieldCheck className="h-4 w-4" />Безопасная оплата после подтверждения</p>
            </section>
            <div className="rounded-xl bg-orange-50 p-4 text-xs leading-relaxed text-orange-900"><strong>Важно знать заранее</strong><p className="mt-1">Вы выбираете удобное время. Перед оплатой можно проверить детали занятия.</p></div>
          </aside>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

function BookingPage({ tutorId }: { tutorId: number }) {
  const tutor = tutors.find((item) => item.id === tutorId);
  const params = new URLSearchParams(window.location.search);
  const [selectedDate, setSelectedDate] = useState(Number(params.get('date')) || 22);
  const [selectedTime, setSelectedTime] = useState(params.get('time') || '18:00');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitted, setSubmitted] = useState(false);

  if (!tutor) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Репетитор не найден</h1>
        <a href="/tutors" className="mt-4 inline-block text-blue-600 hover:underline">Вернуться к каталогу</a>
      </main>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="mx-auto max-w-xl px-5 py-16">
        <section className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-7 w-7" /></span>
          <h1 className="mt-5 text-2xl font-bold">Заявка подготовлена</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Это демонстрация интерфейса: бронирование и оплата пока не отправляются. Для реальных заявок нужно подключить сервер и платёжную систему.</p>
          <a href={`/tutors/${tutor.id}`} className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Вернуться в профиль</a>
        </section>
      </main>
    );
  }

  return (
    <>
    <main className="mx-auto max-w-7xl px-5 pb-10 pt-7 sm:px-8">
      <a href={`/tutors/${tutor.id}`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600"><ArrowLeft className="h-3.5 w-3.5" /> В профиль {tutor.name}</a>
      <div className="mt-5">
        <h1 className="text-2xl font-bold sm:text-3xl">Время для новых знаний</h1>
        <p className="mt-1 text-sm text-slate-500">Выберите время и подтвердите занятие — договоритесь с вашим репетитором.</p>
      </div>
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="font-bold"><span className="mr-2 text-blue-600">01</span>Дата и время</h2>
            <p className="mt-2 flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="h-4 w-4" />Октябрь 2026</p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {dates.map((date) => (
                <button key={date.date} type="button" onClick={() => setSelectedDate(date.date)} className={`rounded-lg border px-2 py-2.5 ${selectedDate === date.date ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 hover:border-blue-300'}`}>
                  <span className="block text-[10px] opacity-70">{date.day}</span><span className="text-sm font-semibold">{date.date}</span>
                </button>
              ))}
            </div>
            <h3 className="mt-5 text-sm font-semibold">Четверг, {selectedDate} октября</h3>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {times.map((time) => (
                <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-lg border px-2 py-2 text-xs ${selectedTime === time ? 'border-blue-600 bg-blue-600 font-semibold text-white' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>{time}</button>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-emerald-700"><Clock3 className="h-4 w-4" />Время указано по часовому поясу Алматы (UTC+5)</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="font-bold"><span className="mr-2 text-blue-600">02</span>Данные ученика</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-medium text-slate-600 sm:col-span-2">Имя и фамилия
                <input required name="studentName" autoComplete="name" placeholder="Например, Алина Иванова" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />
              </label>
              <label className="text-xs font-medium text-slate-600">Электронная почта
                <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />
              </label>
              <label className="text-xs font-medium text-slate-600">Телефон
                <input required type="tel" name="phone" autoComplete="tel" placeholder="+7 (___) ___-__-__" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />
              </label>
              <label className="text-xs font-medium text-slate-600 sm:col-span-2">Цель занятий
                <select name="goal" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500">
                  {tutor.goals.map((goal) => <option key={goal}>{goal}</option>)}
                </select>
              </label>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">Контактные данные нужны, чтобы обсудить детали занятия. Это демо-форма и пока не отправляет введённые данные.</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="font-bold"><span className="mr-2 text-blue-600">03</span>Способ оплаты</h2>
            <div className="mt-4 space-y-2">
              {[
                { id: 'card', title: 'Банковская карта', description: 'Visa, Mastercard' },
                { id: 'fast', title: 'Система быстрых платежей', description: 'Оплата по QR-коду' },
              ].map((method) => (
                <label key={method.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${paymentMethod === method.id ? 'border-blue-400 bg-blue-50' : 'border-slate-200'}`}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="mt-1 accent-blue-600" />
                  <span><strong className="block text-sm">{method.title}</strong><span className="text-xs text-slate-400">{method.description}</span></span>
                </label>
              ))}
            </div>
          </section>
        </form>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold">Ваше занятие</h2>
            <div className="mt-4 flex gap-3 border-b border-slate-100 pb-4">
              <img src={tutor.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div><strong className="text-sm">{tutor.name}</strong><p className="mt-1 text-xs text-slate-500">{tutor.subjects}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{tutor.rating.toFixed(1).replace('.', ',')} · {tutor.experience} лет опыта</p></div>
            </div>
            <div className="space-y-3 py-4 text-xs text-slate-600">
              <p className="flex gap-2"><CalendarDays className="h-4 w-4 text-slate-400" />Четверг, {selectedDate} октября 2026</p>
              <p className="flex gap-2"><Clock3 className="h-4 w-4 text-slate-400" />{selectedTime} · 60 минут</p>
              <p className="flex gap-2"><Video className="h-4 w-4 text-slate-400" />Онлайн-занятие</p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between"><span className="text-sm text-slate-600">К оплате</span><strong className="text-xl">{tutor.price.toLocaleString('ru-RU')} ₸</strong></div>
              <button type="submit" form="booking-form" className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Оплатить и забронировать</button>
              <p className="mt-3 text-center text-[10px] leading-relaxed text-slate-400">Оплата не производится в демонстрационном режиме.</p>
            </div>
          </section>
          <div className="rounded-xl bg-emerald-50 p-4 text-xs leading-relaxed text-emerald-800"><div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4" />Безопасная оплата</div><p className="mt-1">Платёжный шлюз подключается отдельно перед запуском настоящих бронирований.</p></div>
          <p className="flex items-center justify-center gap-1 text-[10px] text-slate-400"><LockKeyhole className="h-3 w-3" />Ваши данные защищены</p>
        </aside>
      </div>
    </main>
    <PageFooter />
    </>
  );
}

function TutorPages() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const parts = path.split('/');
  const tutorId = Number(parts.at(-1));
  const isBooking = parts[1] === 'booking';

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-800">
      <SiteHeader activePage="tutors" />
      {isBooking ? <BookingPage tutorId={tutorId} /> : <TutorProfile tutorId={tutorId} />}
      {!isBooking && null}
    </div>
  );
}

export default TutorPages;
