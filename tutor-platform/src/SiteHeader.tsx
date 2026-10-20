import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

type SiteHeaderProps = {
  activePage?: 'home' | 'tutors' | 'become-tutor';
  onFavoritesClick?: () => void;
  favoritesActive?: boolean;
  favoriteCount?: number;
};

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-600 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
        <span className="h-[18px] w-[18px] rounded-[5px] bg-white" />
      </span>
      <span>TutorGo.kz</span>
    </span>
  );
}

function SiteHeader({ activePage, onFavoritesClick, favoritesActive = false, favoriteCount = 0 }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navClass = (page: SiteHeaderProps['activePage']) =>
    `block rounded-lg px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600 md:bg-transparent md:p-0 md:hover:bg-transparent ${
      activePage === page ? 'font-semibold text-blue-600' : 'text-slate-600'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <a href="/" aria-label="TutorGo.kz — главная" className="shrink-0">
          <BrandLogo className="text-xl sm:text-2xl" />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="/tutors" className={navClass('tutors')}>Найти репетитора</a>
          <a href="/#how-it-works" className="text-slate-600 transition hover:text-blue-600">Как это работает</a>
          <a href="/become-tutor" className={navClass('become-tutor')}>Стать репетитором</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {onFavoritesClick && (
            <button
              type="button"
              onClick={onFavoritesClick}
              aria-label={favoritesActive ? 'Показать всех репетиторов' : `Избранное: ${favoriteCount}`}
              aria-pressed={favoritesActive}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-500"
            >
              <Heart className={`h-5 w-5 ${favoritesActive ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          )}
          <button type="button" className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 sm:px-5">
            Войти
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Мобильная навигация" className="border-t border-slate-100 bg-white px-5 py-3 md:hidden">
          <a href="/tutors" className={navClass('tutors')}>Найти репетитора</a>
          <a href="/#how-it-works" className="block rounded-lg px-3 py-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">Как это работает</a>
          <a href="/become-tutor" className={navClass('become-tutor')}>Стать репетитором</a>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
