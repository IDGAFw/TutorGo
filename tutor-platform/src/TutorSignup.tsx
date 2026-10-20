import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import SiteHeader, { BrandLogo } from './SiteHeader';

function TutorSignup() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-800">
      <SiteHeader activePage="become-tutor" />
      <main className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pt-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <section>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              <GraduationCap className="h-4 w-4" /> Преподавайте на TutorGo
            </span>
            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Помогайте ученикам. <span className="text-blue-600">Развивайтесь вместе.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              Расскажите о себе и своём опыте. Создайте профиль, находите учеников и проводите занятия в удобное время.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: <Users className="h-5 w-5" />, title: 'Свои ученики', text: 'Находите учеников, которым нужен именно ваш предмет.' },
                { icon: <ShieldCheck className="h-5 w-5" />, title: 'Профиль преподавателя', text: 'Покажите опыт, образование и отзывы в одном месте.' },
                { icon: <GraduationCap className="h-5 w-5" />, title: 'Удобный график', text: 'Выбирайте формат и время занятий.' },
              ].map((benefit) => (
                <article key={benefit.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">{benefit.icon}</span>
                  <h2 className="mt-3 text-sm font-semibold">{benefit.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{benefit.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-indigo-50 p-5">
              <h2 className="font-semibold">Как начать</h2>
              <ol className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <li><span className="mr-2 font-bold text-blue-600">01</span>Заполните анкету</li>
                <li><span className="mr-2 font-bold text-blue-600">02</span>Подготовьте профиль</li>
                <li><span className="mr-2 font-bold text-blue-600">03</span>Находите учеников</li>
              </ol>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {submitted ? (
              <div className="py-8 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-7 w-7" /></span>
                <h2 className="mt-5 text-xl font-bold">Анкета заполнена</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Это демонстрационный сайт: данные не отправлялись и не сохранялись. Для приёма анкет нужно подключить сервер.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-sm font-semibold text-blue-600 hover:underline">Заполнить ещё раз</button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">Расскажите о себе</h2>
                <p className="mt-1 text-sm text-slate-500">Первый шаг к профилю преподавателя</p>
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <label className="block text-xs font-medium text-slate-600">
                    Имя и фамилия
                    <input required name="name" autoComplete="name" placeholder="Как к вам обращаться" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-blue-500" />
                  </label>
                  <label className="block text-xs font-medium text-slate-600">
                    Электронная почта
                    <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-blue-500" />
                  </label>
                  <label className="block text-xs font-medium text-slate-600">
                    Телефон
                    <input required name="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-blue-500" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-xs font-medium text-slate-600">
                      Предмет
                      <select required name="subject" defaultValue="" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500">
                        <option value="" disabled>Выберите</option>
                        <option>Математика</option>
                        <option>Английский язык</option>
                        <option>Физика</option>
                        <option>Другое</option>
                      </select>
                    </label>
                    <label className="block text-xs font-medium text-slate-600">
                      Опыт, лет
                      <input required name="experience" type="number" min="0" max="60" defaultValue="1" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />
                    </label>
                  </div>
                  <label className="block text-xs font-medium text-slate-600">
                    Коротко о вашем опыте
                    <textarea required name="about" rows={3} placeholder="Кого и чему вы преподаёте?" className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />
                  </label>
                  <label className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                    <input required type="checkbox" className="mt-1 accent-blue-600" />
                    Я согласен(на) на обработку данных для создания профиля преподавателя.
                  </label>
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Продолжить <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-[11px] leading-5 text-slate-400">
                    Пока анкета не отправляется на сервер и доступна только для демонстрации интерфейса.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="/" aria-label="TutorGo.kz — главная"><BrandLogo className="text-lg" /></a>
          <span className="text-xs text-slate-400">Учиться — значит расти.</span>
        </div>
      </footer>
    </div>
  );
}

export default TutorSignup;
