import { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageSquareText,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { tutors } from './tutors';
import SiteHeader, { BrandLogo } from './SiteHeader';

const formatPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₸`;
const formatTutorCount = (count: number) => {
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} репетиторов`;
  if (count % 10 === 1) return `${count} репетитор`;
  if (count % 10 >= 2 && count % 10 <= 4) return `${count} репетитора`;
  return `${count} репетиторов`;
};

function TutorListing() {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('subject') ?? 'Математика');
  const [goal, setGoal] = useState('Любая цель');
  const [grade, setGrade] = useState('10–11 класс');
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minExperience, setMinExperience] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [freeTimeOnly, setFreeTimeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredTutors = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('ru');
    const results = tutors.filter((tutor) => {
      const matchesQuery = !search
        || tutor.subjects.toLocaleLowerCase('ru').includes(search)
        || tutor.goals.some((item) => item.toLocaleLowerCase('ru').includes(search));
      const matchesGoal = goal === 'Любая цель' || tutor.goals.includes(goal);
      const matchesGrade = grade === 'Любой класс' || tutor.grades.includes(grade);
      return matchesQuery
        && matchesGoal
        && matchesGrade
        && tutor.price >= minPrice
        && tutor.price <= maxPrice
        && tutor.experience >= minExperience
        && (!verifiedOnly || tutor.verified)
        && (!freeTimeOnly || tutor.freeTime)
        && (!favoritesOnly || favorites.includes(tutor.id));
    });

    if (sortBy === 'rating') return results.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'price-low') return results.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return results.sort((a, b) => b.price - a.price);
    return results;
  }, [query, goal, grade, minPrice, maxPrice, minExperience, verifiedOnly, freeTimeOnly, favoritesOnly, favorites, sortBy]);

  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filteredTutors.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleTutors = filteredTutors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setQuery('');
    setGoal('Любая цель');
    setGrade('10–11 класс');
    setMinPrice(500);
    setMaxPrice(2500);
    setMinExperience(0);
    setVerifiedOnly(false);
    setFreeTimeOnly(false);
    setFavoritesOnly(false);
    setPage(1);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  };

  const filters = (
    <div className="space-y-5 text-[13px]">
      <label className="block">
        <span className="mb-2 block font-medium text-slate-700">Предмет</span>
        <span className="relative block">
          <select value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 outline-none focus:border-blue-500">
            <option value="">Любой предмет</option>
            <option>Математика</option>
            <option>Английский</option>
            <option>Физика</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block font-medium text-slate-700">Цель занятий</span>
        <span className="relative block">
          <select value={goal} onChange={(event) => { setGoal(event.target.value); setPage(1); }} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 outline-none focus:border-blue-500">
            <option>Любая цель</option>
            <option>Подготовка к ЕНТ</option>
            <option>Школьная программа</option>
            <option>НИШ / БИЛ</option>
            <option>Олимпиады</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block font-medium text-slate-700">Ученик</span>
        <span className="relative block">
          <select value={grade} onChange={(event) => setGrade(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 outline-none focus:border-blue-500">
            <option>Любой класс</option>
            <option>1–4 класс</option>
            <option>5–9 класс</option>
            <option>10–11 класс</option>
            <option>Студент</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
        </span>
      </label>

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-2 font-medium text-slate-700">Цена за 60 минут, ₸</p>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="min-price">Минимальная цена</label>
          <input id="min-price" type="number" min="0" max={maxPrice} value={minPrice} onChange={(event) => { setMinPrice(Number(event.target.value)); setPage(1); }} className="w-1/2 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" />
          <label className="sr-only" htmlFor="max-price">Максимальная цена</label>
          <input id="max-price" type="number" min={minPrice} value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} className="w-1/2 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" />
        </div>
        <input aria-label="Максимальная цена" type="range" min="500" max="5000" step="100" value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} className="mt-3 w-full accent-blue-600" />
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-3 font-medium text-slate-700">Опыт преподавания</p>
        {[0, 3, 5].map((years) => (
          <label key={years} className="mb-2 flex cursor-pointer items-center gap-2 text-slate-600">
            <input type="radio" name="experience" checked={minExperience === years} onChange={() => { setMinExperience(years); setPage(1); }} className="accent-blue-600" />
            {years === 0 ? 'Любой' : `От ${years} лет`}
          </label>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-4">
        <label className="mb-3 flex cursor-pointer items-center gap-2 text-slate-600">
          <input type="checkbox" checked={verifiedOnly} onChange={(event) => { setVerifiedOnly(event.target.checked); setPage(1); }} className="accent-blue-600" />
          Документы проверены
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-slate-600">
          <input type="checkbox" checked={freeTimeOnly} onChange={(event) => { setFreeTimeOnly(event.target.checked); setPage(1); }} className="accent-blue-600" />
          Есть свободное время
        </label>
      </div>

      <button type="button" onClick={() => setFiltersOpen(false)} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700">
        Показать {formatTutorCount(filteredTutors.length)}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-slate-800">
      <SiteHeader
        activePage="tutors"
        favoritesActive={favoritesOnly}
        favoriteCount={favorites.length}
        onFavoritesClick={() => { setFavoritesOnly(!favoritesOnly); setPage(1); }}
      />

      <main className="mx-auto max-w-7xl px-5 pb-10 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-2 text-xs text-slate-400">
          <a href="/" className="hover:text-blue-600">Главная</a>
          <span className="px-1.5">/</span>
          <span>Репетиторы</span>
          <span className="px-1.5">/</span>
          <span>{query || 'Все предметы'}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Репетиторы по {query ? query.toLocaleLowerCase('ru') : 'всем предметам'}</h1>
        <p className="mt-1 text-sm text-slate-500">Понятные объяснения, уверенность на экзамене и поддержка на каждом шаге.</p>

        <form action="/tutors" method="get" className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
          <input name="subject" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Предмет или цель занятий" className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-slate-400" />
          <button type="submit" className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-6">Найти репетитора</button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
          {['ЕНТ', 'До 2 500 ₸', grade, 'Занятия онлайн'].map((tag) => (
            <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-600">{tag}</span>
          ))}
        </div>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Фильтры</h2>
              <button type="button" onClick={resetFilters} className="text-xs text-blue-600 hover:underline">Сбросить</button>
            </div>
            <div className="hidden lg:block">{filters}</div>
            <div className="lg:hidden">
              <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium">
                <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Настроить фильтры</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </button>
              {filtersOpen && <div className="pt-5">{filters}</div>}
            </div>
          </aside>

          <section aria-label="Список репетиторов">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">Найдено {formatTutorCount(filteredTutors.length)}</p>
              <label className="flex items-center gap-2 text-xs text-slate-500">
                Сначала
                <span className="relative">
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="appearance-none bg-transparent pr-5 font-medium text-slate-700 outline-none">
                    <option value="recommended">рекомендуемые</option>
                    <option value="rating">с высоким рейтингом</option>
                    <option value="price-low">сначала дешевле</option>
                    <option value="price-high">сначала дороже</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 top-0.5 h-3.5 w-3.5" />
                </span>
              </label>
            </div>

            <div className="space-y-3">
              {visibleTutors.map((tutor) => (
                <article key={tutor.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex gap-3 sm:gap-4">
                        <img src={tutor.image} alt={tutor.name} className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-800">{tutor.name}</h3>
                          <p className="mt-1 text-xs text-slate-500">{tutor.subjects} · Опыт {tutor.experience} лет</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{tutor.rating.toFixed(1).replace('.', ',')}</span>
                            <span className="text-slate-400">{tutor.reviews} отзывов</span>
                          </div>
                          {tutor.verified && <span className="mt-1.5 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">Документы проверены</span>}
                        </div>
                        <button type="button" aria-label={favorites.includes(tutor.id) ? 'Убрать из избранного' : 'Добавить в избранное'} aria-pressed={favorites.includes(tutor.id)} onClick={() => toggleFavorite(tutor.id)} className="h-fit text-slate-400 transition hover:text-rose-500" >
                          <Heart className={`h-5 w-5 ${favorites.includes(tutor.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-500">{tutor.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:min-w-32 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <div className="sm:text-right">
                        <p className="text-lg font-bold text-slate-800">{formatPrice(tutor.price)}</p>
                        <p className="text-[10px] text-slate-400">за 60 минут</p>
                        <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">Онлайн</span>
                      </div>
                      <a href={`/tutors/${tutor.id}`} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:mt-3">Выбрать репетитора</a>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-[11px] text-emerald-700">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Ближайшее занятие: {tutor.nextLesson}
                  </div>
                </article>
              ))}
              {visibleTutors.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-slate-300" />
                  <h3 className="mt-3 font-semibold">Репетиторы не найдены</h3>
                  <p className="mt-1 text-sm text-slate-500">Измените предмет или сбросьте фильтры.</p>
                  <button type="button" onClick={resetFilters} className="mt-4 text-sm font-medium text-blue-600 hover:underline">Сбросить фильтры</button>
                </div>
              )}
            </div>

            {filteredTutors.length > pageSize && (
              <nav aria-label="Страницы репетиторов" className="mt-5 flex items-center justify-center gap-2">
                <button type="button" aria-label="Предыдущая страница" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <button key={pageNumber} type="button" aria-current={currentPage === pageNumber ? 'page' : undefined} onClick={() => setPage(pageNumber)} className={`h-9 min-w-9 rounded-lg px-2 text-sm ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{pageNumber}</button>
                ))}
                <button type="button" aria-label="Следующая страница" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
              </nav>
            )}

            <button type="button" onClick={() => setSelectedTutor('Помощь с выбором')} className="mt-5 flex w-full items-center gap-3 rounded-xl bg-[#eaf0ff] p-4 text-left text-sm transition hover:bg-[#e2eaff]">
              <MessageSquareText className="h-5 w-5 shrink-0 text-blue-600" />
              <span><strong className="block text-slate-800">Не знаете, кого выбрать?</strong><span className="mt-0.5 block text-xs text-slate-500">Поможем найти репетитора под вашу цель и бюджет.</span><span className="mt-1 block text-xs font-medium text-blue-600">Помогите мне с выбором →</span></span>
            </button>
          </section>
        </div>
      </main>

      <footer className="mt-4 border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-sm sm:px-8">
          <a href="/" aria-label="TutorGo.kz — главная"><BrandLogo className="text-lg" /></a>
          <span className="text-xs text-slate-400">Учиться — значит расти.</span>
        </div>
      </footer>

      {selectedTutor && (
        <div role="dialog" aria-modal="true" aria-labelledby="selection-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5" onClick={() => setSelectedTutor(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <h2 id="selection-title" className="text-lg font-bold">
              {selectedTutor === 'Вход в аккаунт' ? 'Вход в TutorGo' : 'Не знаете, кого выбрать?'}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {selectedTutor === 'Вход в аккаунт'
                ? 'Авторизация появится после подключения серверной части.'
                : 'Заполните фильтры, чтобы подобрать преподавателя. Консультация с менеджером появится после подключения серверной части.'}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setSelectedTutor(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600">Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorListing;
