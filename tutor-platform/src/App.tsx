import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Play, ChevronDown, CheckCircle2, 
  ArrowRight, Sigma, Globe, BookText, Atom, Star, 
  SearchCheck, CalendarDays, Video 
} from 'lucide-react';
import TutorListing from './TutorListing';
import TutorPages from './TutorPages';
import TutorSignup from './TutorSignup';
import SiteHeader, { BrandLogo } from './SiteHeader';

const App: React.FC = () => {
  const currentPath = window.location.pathname.replace(/\/+$/, '');
  if (currentPath.startsWith('/booking/')) {
    return <TutorPages />;
  }
  if (currentPath.startsWith('/tutors/')) {
    return <TutorPages />;
  }
  if (currentPath === '/become-tutor') {
    return <TutorSignup />;
  }
  if (currentPath === '/tutors') {
    return <TutorListing />;
  }

  // Анимация для элементов, появляющихся при скролле
  const fadeUpScroll = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const staggerScroll = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-900 overflow-x-hidden">
      
      <SiteHeader activePage="home" />

      {/* 1. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-8 pt-16 pb-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div className="md:w-1/2" variants={staggerScroll} initial="hidden" animate="visible">
          <motion.p variants={fadeUpScroll} className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 bg-blue-50 inline-block px-3 py-1 rounded-md">
            Знания, которые меняют всё
          </motion.p>
          
          <motion.h1 variants={fadeUpScroll} className="text-5xl md:text-[3.5rem] font-extrabold leading-tight mb-6 text-gray-900">
            Ваш человек.<br />
            Ваш путь к <span className="text-blue-600">знаниям.</span>
          </motion.h1>
          
          <motion.p variants={fadeUpScroll} className="text-gray-500 text-lg mb-8 max-w-md">
            Найдите репетитора, с которым понятно и спокойно. От первого вопроса до поступления на грант.
          </motion.p>

          <motion.div variants={fadeUpScroll} className="flex items-center gap-3 text-sm text-gray-600 mb-10">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
            <span><strong className="text-gray-900">12 000+ учеников уже нашли своего</strong><br/><span className="text-gray-400">Проверенные преподаватели. Настоящие отзывы.</span></span>
          </motion.div>

          {/* Строка поиска */}
          <motion.form action="/tutors" method="get" variants={fadeUpScroll} className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center gap-4 border border-gray-100 w-full max-w-2xl">
            <div className="flex-1 flex items-center gap-3 pl-4 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
              <Search className="w-5 h-5 text-gray-400" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Предмет</span>
                <input name="subject" type="text" placeholder="Что хотите изучать?" className="outline-none text-sm font-medium w-full text-gray-900 placeholder-gray-800" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-between px-4 w-full">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Цель</span>
                <span className="text-sm font-medium text-gray-900">Выберите цель занятий</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-3.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-md w-full md:w-auto justify-center group">
              Найти репетитора
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>

          <motion.div variants={fadeUpScroll} className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-gray-400 items-center">
            <span>Популярное:</span>
            <a href="/tutors?subject=Математика" className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">Математика</a>
            <a href="/tutors?subject=Английский" className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">Английский</a>
            <a href="/tutors?subject=Подготовка%20к%20ЕНТ" className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">Подготовка к ЕНТ</a>
            <a href="/tutors?subject=НИШ%20%2F%20БИЛ" className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">НИШ / БИЛ</a>
          </motion.div>
        </motion.div>

        <motion.div className="md:w-1/2 relative w-full max-w-md md:max-w-none" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }}>
          <div className="absolute inset-0 bg-[#ffe8d6] rounded-[2rem] transform rotate-3 scale-105 -z-10 transition-transform hover:rotate-6 duration-500"></div>
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Репетитор" className="rounded-[2rem] shadow-2xl w-full h-[400px] md:h-[500px] object-cover" />

          <motion.div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-4 w-72" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
            <div>
              <p className="font-bold text-gray-900 text-sm">«У вас всё получится»</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Мария — преподаватель математики</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition flex-shrink-0">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
          </motion.div>

           <motion.div className="absolute top-8 -left-4 md:-left-8 bg-white p-3 rounded-xl shadow-lg font-bold text-blue-600 flex items-center gap-2 text-lg" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}>
            x² + y² = 💙
            <span className="block text-[8px] text-gray-400 absolute -bottom-4 left-2 font-normal whitespace-nowrap">Сложное станет понятным</span>
          </motion.div>
        </motion.div>
      </main>

      {/* 2. SUBJECTS SECTION */}
      <motion.section id="how-it-works" className="max-w-7xl mx-auto px-8 py-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerScroll}>
        <div className="flex justify-between items-end mb-8">
          <motion.h2 variants={fadeUpScroll} className="text-3xl font-extrabold text-gray-900">Что будем изучать?</motion.h2>
          <motion.a variants={fadeUpScroll} href="#" className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">Все 30+ предметов <ArrowRight className="w-4 h-4" /></motion.a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Математика", count: "1 240 репетиторов", icon: <Sigma className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50" },
            { title: "Английский язык", count: "980 репетиторов", icon: <Globe className="w-6 h-6 text-orange-500" />, bg: "bg-orange-50" },
            { title: "Казахский язык", count: "850 репетиторов", icon: <BookText className="w-6 h-6 text-green-600" />, bg: "bg-green-50" },
            { title: "Физика", count: "540 репетиторов", icon: <Atom className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50" }
          ].map((subj, i) => (
            <motion.div key={i} variants={fadeUpScroll} className={`${subj.bg} rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-transform border border-transparent hover:border-white hover:shadow-lg`}>
              <div className="mb-8">{subj.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{subj.title}</h3>
              <p className="text-xs text-gray-500">{subj.count}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. TUTORS SECTION */}
      <motion.section className="max-w-7xl mx-auto px-8 py-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerScroll}>
        <motion.div variants={fadeUpScroll} className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">С ними хочется учиться</h2>
          <p className="text-gray-500">Знакомьтесь с преподавателями, которым доверяют ученики.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Айгерим Касымова", exp: "Математика • Опыт 8 лет", rating: "4,9", reviews: "48 отзывов", desc: "Объясняю сложное простыми словами. Помогаю поднять баллы ЕНТ и поступить на грант.", price: "8 000 ₸", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" },
            { name: "Данияр Беков", exp: "Физика и Математика • Опыт 6 лет", rating: "5,0", reviews: "32 отзыва", desc: "Подготовка к ЕНТ, НИШ и РФМШ. Учимся логически мыслить, а не зазубривать формулы.", price: "10 000 ₸", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" },
            { name: "Асель Жумагулова", exp: "Английский язык • Опыт 12 лет", rating: "4,9", reviews: "61 отзыв", desc: "IELTS, разговорная практика и подготовка к экзаменам. Спокойные занятия в комфортном темпе.", price: "7 500 ₸", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" }
          ].map((tutor, i) => (
            <motion.div key={i} variants={fadeUpScroll} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={tutor.img} alt={tutor.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{tutor.name}</h3>
                    <p className="text-[11px] text-gray-500 mb-1">{tutor.exp}</p>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-900 font-bold">{tutor.rating}</span>
                      <span className="text-gray-400">{tutor.reviews}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">{tutor.desc}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <div>
                  <p className="font-bold text-gray-900">{tutor.price}</p>
                  <p className="text-[10px] text-gray-400">за 60 минут</p>
                </div>
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                  Подробнее
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. HOW IT WORKS SECTION */}
      <motion.section className="max-w-7xl mx-auto px-8 py-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerScroll}>
        <motion.h2 variants={fadeUpScroll} className="text-3xl font-extrabold text-gray-900 mb-12">От «не понимаю» до «я могу»</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { num: "01", title: "Найдите своего", desc: "Выберите предмет и цель. Сравните опыт, отзывы и подход преподавателей.", icon: <SearchCheck className="w-5 h-5 text-blue-600" /> },
            { num: "02", title: "Выберите время", desc: "Откройте расписание и забронируйте удобное занятие — без звонков.", icon: <CalendarDays className="w-5 h-5 text-blue-600" /> },
            { num: "03", title: "Учитесь с комфортом", desc: "Встречайтесь онлайн, задавайте вопросы и двигайтесь к своей цели.", icon: <Video className="w-5 h-5 text-blue-600" /> }
          ].map((step, i) => (
            <motion.div key={i} variants={fadeUpScroll} className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-gray-200 text-4xl font-bold">{step.num}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. CTA SECTION */}
      <motion.section className="max-w-7xl mx-auto px-8 py-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerScroll}>
        <motion.div variants={fadeUpScroll} className="bg-[#1e293b] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
          
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Большие перемены<br/>начинаются с одного занятия.</h2>
            <p className="text-blue-200 text-sm">Ваш следующий шаг — найти человека, который поможет.</p>
          </div>
          
          <a href="/tutors" className="z-10 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition flex items-center gap-2 shadow-lg w-full md:w-auto justify-center group whitespace-nowrap">
            Найти своего репетитора
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 px-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" aria-label="TutorGo.kz — главная"><BrandLogo className="text-xl" /></a>
          <p className="text-xs text-gray-400">Учиться — значит расти.</p>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-[10px] text-gray-400 font-medium">
          <p>© 2026 TutorGo.kz</p>
          <a href="#" className="hover:text-gray-600 transition">Политика конфиденциальности</a>
          <p>Поддержка: help@tutorgo.kz</p>
        </div>
      </footer>

    </div>
  );
};

export default App;