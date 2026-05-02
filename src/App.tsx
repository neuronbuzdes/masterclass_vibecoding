import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Zap, 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  Rocket, 
  Bot, 
  Github, 
  Youtube, 
  Send, 
  ArrowRight, 
  Layers, 
  CheckCircle2,
  Menu,
  X,
  Instagram,
  MessageCircle,
  ChevronDown,
  Layout,
  Terminal,
  Cpu,
  Monitor,
  Share2,
  CreditCard,
  Target,
  ArrowUpRight,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Constants & Data ---

const KNOWLEDGE_BASE = `
# КУРС «ВАЙБКОДИНГ: ОТ НУЛЯ ДО СВОИХ ПРОЕКТОВ И ДЕНЕГ»

Предобучение. МОДУЛЬ 1. Старт и понимание базы
Урок 1. Вайбкодинг простыми словами: изменения в программировании с ИИ, старт без 3 лет обучения, проекты для новичков.
Урок 2. Инструменты: Google Gemini, Google AI Studio, Lovable AI, Claude Code. Экономия на подписках.
Урок 3. Сервер и API: как сайт общается с сервером, запросы/ответы, реальные примеры.
Результат: понимание логики вайбкодинга.

МОДУЛЬ 2. Создание сайтов
Урок 1. Первый сайт: генерация структуры, контент, стили, запуск.
Урок 2. Дизайн: визуал, адаптация под телефон, анимации.
Урок 3. Публикация: GitHub, Vercel, Render.
Результат: первый опубликованный сайт.

МОДУЛЬ 3. Первый AI-проект
Урок 1. Google AI Studio: интерфейс, настройки, работа с моделью.
Урок 2. Связка Google AI Studio: генерация интерфейса, структура, экспорт.
Урок 3. Публикация: GitHub, Vercel, Render.
Результат: первый рабочий AI-проект.

МОДУЛЬ 4. Lovable AI — проекты средней сложности
Урок 1. Интерфейс Lovable AI: навигация, настройки, логика.
Урок 2. Интеграция Claude AI и Lovable: подключение модели, запросы.
Урок 3. Полноценные проекты: структура, данные, авторизация.
Урок 4. Проект CRM: управление складом, отдел продаж, учет менеджеров.
Урок 5. Проект мини-платформа: каталог продуктов, личный кабинет, аналог обучающей платформы.
Результат: серьезные проекты в портфолио.

МОДУЛЬ 5. Claude code и боты
Урок 1. Telegram-боты: структура, команды, интеграция ИИ.
Урок 2. Настройка и публикация: платформы, тестирование.
Результат: рабочий AI-бот.

МОДУЛЬ 6. Монетизация и упаковка
Блок 1. Стратегия: ниша, позиционирование, оффер.
Блок 2. Контент: контент-план, лид-магниты, соцсети (Instagram, Telegram, YouTube).
Блок 3. Инфраструктура: лендинг, воронка, автоматизация, аналитика.
Блок 4. Деньги: модели монетизации, продажи, масштабирование.
Блок 5. Claude Code + Claude design: разбор от А до Я, рефакторинг, улучшение интерфейса.

Результаты курса:
- Опубликованный сайт.
- Первый AI-проект.
- Рабочий бот.
- CRM или мини-платформа.
- Понимание монетизации.
- Портфолио проектов.

Для кого:
1. Новичкам: старт с нуля без навыков кода.
2. Предпринимателям: создание лендингов, CRM и автоматизаций для бизнеса.
3. Маркетологам и экспертам: упаковка услуг и воронки.
4. Фрилансерам: новые AI-услуги для клиентов.

Что можно создать: лендинги, интернет-магазины, боты, формы, чаты, CRM, онлайн-школы, дашборды, мини-приложения.
`;

const SUGGESTED_QUESTIONS = [
  "Подойдет ли курс новичку?",
  "Какие проекты я соберу?",
  "Будет ли Telegram-бот?",
  "Что такое Lovable AI?",
  "Как проходит обучение?",
  "Будет ли модуль про деньги?"
];

const AUDIENCE = [
  {
    title: "Новичкам",
    desc: "Если вы никогда не писали код, но хотите создавать сайты, приложения и AI-инструменты.",
    icon: <BrainCircuit className="w-8 h-8" />
  },
  {
    title: "Предпринимателям",
    desc: "Если хотите быстро собирать лендинги, CRM, формы, автоматизации и MVP для бизнеса.",
    icon: <Rocket className="w-8 h-8" />
  },
  {
    title: "Маркетологам",
    desc: "Если нужно упаковывать услуги, запускать воронки, лид-магниты и контент-проекты.",
    icon: <Share2 className="w-8 h-8" />
  },
  {
    title: "Фрилансерам",
    desc: "Если хотите добавить AI-разработку в свои услуги и брать проекты дороже.",
    icon: <Zap className="w-8 h-8" />
  }
];

const PROJECTS = [
  {
    title: "CRM для бизнеса",
    desc: "Система управления клиентами, статусы, менеджеры и отчетность.",
    tag: "Сложный проект"
  },
  {
    title: "AI-Ассистент",
    desc: "Умный помощник для сайта, отвечающий по базе знаний.",
    tag: "AI Модуль"
  },
  {
    title: "Telegram Бот",
    desc: "Автоматизированный бот с интеграцией нейросетей.",
    tag: "Автоматизация"
  },
  {
    title: "Онлайн-школа",
    desc: "Платформа с личным кабинетом и видео-уроками.",
    tag: "Продукт"
  },
  {
    title: "Лендинг услуг",
    desc: "Конверсионная страница с формами и анимациями.",
    tag: "Base"
  },
  {
    title: "Дашборд аналитики",
    desc: "Визуализация данных и графики в реальном времени.",
    tag: "Frontend"
  }
];

const FAQ = [
  {
    q: "Курс подойдет новичку?",
    a: "Да, обучение начинается с модуля 'Предобучение', где мы разбираем базу: что такое вайбкодинг, как работают API и серверы. Вам не нужно быть программистом."
  },
  {
    q: "Какие инструменты нужны?",
    a: "Мы работаем с Google Gemini, AI Studio, Lovable AI, Claude Code и Cursor. Эти инструменты позволяют создавать профессиональные продукты быстрее классической разработки."
  },
  {
    q: "Будет ли блок про монетизацию?",
    a: "Конечно! Шестой модуль полностью посвящен упаковке ваших навыков, поиску ниши, созданию офферов и продажам ваших AI-решений."
  },
  {
    q: "Что такое сервер и API?",
    a: "На курсе мы объясняем это на пальцах: сервер — это компьютер, где живет логика вашего сайта, а API — это способ общения вашего сайта с другими сервисами (например, с нейросетью)."
  }
];

// --- Sub-components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 ${className}`}>
    {children}
  </span>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Для кого", href: "#audience" },
    { label: "Проекты", href: "#projects" },
    { label: "Программа", href: "#curriculum" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">Вайбкодинг</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-tight">
          {menuItems.map(item => (
            <a key={item.label} href={item.href} className="hover:text-cyan-400 transition-colors">{item.label}</a>
          ))}
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button className="text-slate-300 hover:text-white transition-colors">Войти</button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/10">
            Забронировать
          </button>
        </div>

        <button className="lg:hidden text-white w-10 h-10 flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-slate-950 border-b border-white/10 lg:hidden overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6 text-xl font-bold text-white uppercase tracking-tighter">
              {menuItems.map(item => (
                <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="p-4 bg-white/5 border border-white/10 rounded-2xl">Войти</button>
                <button className="p-4 bg-cyan-500 rounded-2xl">Записаться</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MockEditor = () => {
  return (
    <div className="w-full bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="h-10 bg-[#161b22] px-4 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="px-3 py-1 bg-white/5 rounded text-[10px] text-slate-500 font-mono flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          vibecoding_project
        </div>
        <div className="w-8" />
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
        <div className="flex gap-4">
          <span className="text-slate-600 shrink-0">1</span>
          <span className="text-purple-400">Пользователь:</span> <span className="text-slate-300 italic">"Сделай лендинг с AI-чатом"</span>
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-slate-600 shrink-0">2</span>
          <span className="text-cyan-400">Вайб-AI:</span> <span className="text-slate-400">Проектирую структуру...</span>
        </div>
        <div className="flex gap-4 mt-2 animate-pulse">
          <span className="text-slate-600 shrink-0">3</span>
          <span className="text-cyan-400">Вайб-AI:</span> <span className="text-slate-400">✓ Генерация Hero секции</span>
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-slate-600 shrink-0">4</span>
          <span className="text-cyan-400">Вайб-AI:</span> <span className="text-slate-400">✓ Подключение базы данных</span>
        </div>
        <div className="flex gap-4 mt-4 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
          <span className="text-emerald-400 font-bold shrink-0">DONE</span>
          <span className="text-emerald-300">Проект опубликован за 1 день. Твой вайб — результат!</span>
        </div>
        <div className="mt-6 flex gap-2">
          <div className="h-2 w-20 bg-slate-800 rounded" />
          <div className="h-2 w-32 bg-slate-800 rounded" />
          <div className="h-2 w-12 bg-slate-800 rounded" />
        </div>
      </div>
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 blur-[80px] -z-10" />
    </div>
  );
}

const AIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
        config: {
          systemInstruction: `Ты — AI-ассистент курса «Вайбкодинг». Работай строго по этой базе знаний: ${KNOWLEDGE_BASE}. 
          Отвечай кратко, дружелюбно, на русском. Если информации нет в базе — скажи об этом и предложи оставить заявку. 
          Не выдумывай цену, даты и гарантии дохода.`,
         }
      });
      setMessages(prev => [...prev, { role: "bot", text: response.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", text: "Простите, мой ИИ-двигатель немного перегрелся. Попробуйте еще раз!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[90vw] sm:w-[420px] h-[600px] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-slate-800/50 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-2xl flex items-center justify-center">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-tight">Вайб-Ассистент</h4>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Онлайн</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.length === 0 && (
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-2xl text-slate-300 text-sm leading-relaxed">
                    Привет! Я AI-ассистент курса «Вайбкодинг». Могу рассказать про программу, проекты и кому это подходит. С чего начнем?
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {SUGGESTED_QUESTIONS.map(q => (
                      <button 
                        key={q}
                        onClick={() => handleSend(q)}
                        className="text-left p-3 rounded-xl bg-slate-800 border border-white/5 text-xs text-slate-400 hover:border-cyan-400/30 hover:text-white transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20' : 'bg-slate-800 text-slate-200 border border-white/5'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-4 rounded-2xl flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-950/50 border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Задать вопрос ИИ..."
                  className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:ring-1 focus:ring-cyan-500/50"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group h-14 pl-5 pr-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center gap-3 shadow-2xl shadow-cyan-500/40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageCircle className="text-white w-6 h-6" />
        <span className="text-white font-bold text-sm hidden sm:block">Спросить AI</span>
        {isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950" />}
      </motion.button>
    </div>
  );
};

// --- Main Page Sections ---

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-40 overflow-hidden bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge>AI-курс для тех, кто не хочет годами учить код</Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            Твори с ИИ — <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              без границ
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium mb-12 max-w-xl">
            Пошаговый путь от первого сайта до CRM, ботов и первых денег на ваших цифровых продуктах.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-10 py-5 bg-white text-slate-950 font-black text-xl rounded-2xl shadow-xl shadow-white/5 active:scale-95 transition-all overflow-hidden relative group">
              <span className="relative z-10 flex items-center gap-3">
                Забронировать
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-10 py-5 border-2 border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/5 transition-all">
              Посмотреть программу
            </button>
          </div>
          
          <div className="mt-8 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i + 40}/80/80`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              <span className="text-cyan-400 font-bold">150+</span> участников уже в потоке
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:scale-110 xl:scale-125"
        >
          <MockEditor />
          {/* Floating elements */}
          <div className="absolute -top-10 -right-10 p-5 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl animate-bounce-slow">
            <Bot className="text-cyan-400 w-8 h-8" />
          </div>
          <div className="absolute -bottom-6 -left-6 p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-emerald-500 rounded-full" />
               <span className="text-[10px] font-bold text-slate-400 uppercase">Live Preview</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const AudienceSection = () => {
  return (
    <section id="audience" className="py-32 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="mb-4">Для кого это?</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Курс для создателей <br /> <span className="text-slate-500">нового поколения</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUDIENCE.map((item, i) => (
            <motion.div 
              key={item.title}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[32px] bg-slate-950 border border-white/5 hover:border-cyan-500/40 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 italic uppercase tracking-tighter">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 bg-slate-950 border-y border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <Badge>Твое портфолио</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mt-4">
              Проекты, которые ты <span className="text-cyan-400">соберешь за курс</span>
            </h2>
          </div>
          <div className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] italic">
            9+ полноценных кейсов
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="group relative p-8 bg-slate-900 rounded-[40px] border border-white/5 overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Layout className="w-12 h-12 text-cyan-400" />
               </div>
               <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">{p.tag}</span>
               <h3 className="text-2xl font-bold text-white mt-4 mb-3">{p.title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
               <div className="mt-8 pt-6 border-t border-white/5">
                 <button className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-cyan-400 transition-colors">
                   Подробнее <ArrowUpRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CurriculumSection = () => {
  const modules = [
    { title: "Предобучение", desc: "Старт, философия вайбкодинга, настройка всех инструментов и понимание API.", result: "Готовность к разработке." },
    { title: "Создание сайтов", desc: "Генерация структуры через ИИ, адаптив, анимации и публикация в сети.", result: "Твой первый живой сайт." },
    { title: "AI-проекты", desc: "Работа с Google AI Studio, интеграция нейронки в интерфейс и экспорт.", result: "Собственный AI инструмент." },
    { title: "Lovable & CRM", desc: "Создание сложных систем, работа с данными, CRM для бизнеса, базы данных.", result: "Архитектура продукта." },
    { title: "Claude Code & Боты", desc: "Сверхмощный кодинг черех терминал, Telegram-боты и автоматизации.", result: "AI-агенты в деле." },
    { title: "Монетизация", desc: "Упаковка, оффер, контент-план и продажи своих решений.", result: "Первый доход." }
  ];

  return (
    <section id="curriculum" className="py-32 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <Badge>Roadmap</Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">План твоего <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">апгрейда</span></h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {modules.map((m, i) => (
            <div key={m.title} className="p-8 bg-slate-950 rounded-[32px] border border-white/5 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-3xl font-black text-cyan-400 shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{m.title}</h3>
                <p className="text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
              <div className="px-5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                {m.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <Badge>FAQ</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Остались вопросы?</h2>
        </div>

        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="rounded-3xl border border-white/5 transition-all overflow-hidden bg-white/[0.02]">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className="text-xl font-bold text-white">{item.q}</span>
                <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-8 pt-0 text-slate-400 text-lg leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-20 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20 text-center md:text-left">
          <div className="max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <BrainCircuit className="text-cyan-400 w-10 h-10" />
              <span className="text-3xl font-black text-white tracking-tight uppercase italic">Вайбкодинг</span>
            </div>
            <p className="text-slate-500 font-medium">
              Научись создавать сайты, AI-проекты и ботов с помощью ИИ — даже если ты не программист.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-20">
            <div>
              <h5 className="text-white font-black uppercase text-xs tracking-widest mb-6">Продукт</h5>
              <ul className="space-y-4 text-slate-500 font-bold text-sm uppercase italic">
                <li><a href="#audience" className="hover:text-cyan-400 transition-colors">Для кого</a></li>
                <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Проекты</a></li>
                <li><a href="#curriculum" className="hover:text-cyan-400 transition-colors">Программа</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-black uppercase text-xs tracking-widest mb-6">Сообщество</h5>
              <div className="flex gap-4 items-center justify-center lg:justify-start">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all hover:bg-white/10"><Send className="w-5 h-5"/></a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all hover:bg-white/10"><Youtube className="w-5 h-5"/></a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all hover:bg-white/10"><Instagram className="w-5 h-5"/></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <div className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em]">
            © 2026 Вайбкодинг Academy. Built with AI.
          </div>
          <div className="flex gap-8 text-slate-600 font-bold text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-slate-400">Политика</a>
            <a href="#" className="hover:text-slate-400">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main App ---

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-400/30 selection:text-white">
      <Navbar />
      <Hero />
      
      {/* Trust Bar */}
      <div className="py-10 bg-slate-900 border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee items-center gap-20">
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} className="flex items-center gap-4 text-slate-500 font-black uppercase text-xl italic tracking-tighter opacity-50 shrink-0">
              <Cpu className="w-6 h-6" /> Artificial Intelligence
              <Rocket className="w-6 h-6" /> Zero to MVP
              <Target className="w-6 h-6" /> Digital Product
            </div>
          ))}
        </div>
      </div>

      <AudienceSection />
      <ProjectsSection />

      {/* Trust Mini Section: No professional JS needed */}
      <section className="py-24 relative overflow-hidden bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto p-12 bg-white/[0.02] border border-white/10 rounded-[60px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-8 leading-none">
                Старт не требует <br /> специальных <span className="text-cyan-400 text-5xl">знаний</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Знать JS на профи уровне",
                  "Иметь опыт в IT",
                  "Понимать бэкенд",
                  "Тратить годы на учебу"
                ].map(txt => (
                  <div key={txt} className="flex items-center gap-3 text-slate-500 font-medium">
                    <ZapOff className="w-5 h-5 text-red-500/50" />
                    Не нужно: <span className="text-slate-400">{txt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
               {[
                 "Желание создавать проекты",
                 "Базовая грамотность",
                 "Интерес к AI инструментам",
                 "Готовность к практике"
               ].map(txt => (
                 <div key={txt} className="p-6 bg-slate-900 border border-white/5 rounded-3xl flex items-center gap-4">
                   <ShieldCheck className="w-6 h-6 text-emerald-400" />
                   <span className="text-white font-bold">{txt}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <CurriculumSection />

      {/* AI Assistant Promo Section */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto inline-block p-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-[44px]">
             <div className="bg-slate-950 rounded-[43px] p-12 md:p-20 relative overflow-hidden">
                <Bot className="w-20 h-20 text-cyan-400 mx-auto mb-10" />
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
                  Не уверен, подойдет ли курс? <br /> <span className="text-cyan-400">Спроси Вайб-Ассистента</span>
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
                  Он знает всю программу до мелочей и поможет разобраться, какой модуль будет для тебя самым полезным.
                </p>
                <button 
                  onClick={() => { (document.querySelector('button[aria-label="Спросить AI"]') as HTMLElement)?.click(); }}
                  className="px-12 py-5 bg-cyan-500 text-white font-black text-xl rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-cyan-500/20"
                >
                  Задать свой вопрос
                </button>
             </div>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-cyan-500/10 blur-[150px] rounded-full -z-10" />
        <div className="container mx-auto px-6 text-center">
          <Badge>Tвой ход</Badge>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10">Твой путь к <span className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-[10px]">результату</span></h2>
          <p className="text-2xl text-slate-400 max-w-2xl mx-auto mb-16 font-medium">
            Твой первый AI-проект начнется уже на первой неделе обучения. Готов поймать вайб?
          </p>
          <button className="px-16 py-7 bg-white text-slate-950 font-black text-2xl rounded-3xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all">
            Забронировать место
          </button>
          <div className="mt-12 flex justify-center items-center gap-10 opacity-30 grayscale contrast-125">
            <div className="flex items-center gap-2 text-white font-black italic"><Cpu className="w-5 h-5"/> AI Powered</div>
            <div className="flex items-center gap-2 text-white font-black italic"><Github className="w-5 h-5"/> Dev Ready</div>
            <div className="flex items-center gap-2 text-white font-black italic"><Terminal className="w-5 h-5"/> Code Free</div>
          </div>
        </div>
      </section>

      <Footer />
      <AIWidget />

      {/* Sticky Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-[90] bg-slate-950/80 backdrop-blur-xl border-t border-white/10 flex gap-4">
        <button 
          onClick={() => { (document.querySelector('button[aria-label="Спросить AI"]') as HTMLElement)?.click(); }}
          className="flex-1 px-4 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-sm"
        >
          Задать вопрос AI
        </button>
        <button className="flex-[1.5] px-4 py-4 bg-cyan-500 text-white font-bold rounded-2xl text-sm shadow-xl shadow-cyan-500/20">
          Забронировать место
        </button>
      </div>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
