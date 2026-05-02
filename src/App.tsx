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
  ZapOff,
  Briefcase,
  TrendingUp,
  Globe,
  ClipboardList,
  MonitorPlay,
  MousePointer2,
  HandCoins,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Constants & Data ---

const KNOWLEDGE_BASE = `
# КУРС «ВАЙБКОДИНГ: ТВОРИ С ИИ» — ПОЛНАЯ ПРОГРАММА И ИНФОРМАЦИЯ

ЦЕЛЬ КУРСА:
Научить создавать сайты, AI-проекты и ботов с помощью ИИ даже без навыков программирования. Показать путь от идеи до монетизации.

ПРЕДОБУЧЕНИЕ. МОДУЛЬ 0. Старт и понимание базы
- Что такое вайбкодинг простыми словами.
- Какие проекты реально собрать новичку.
- Регистрация и подготовка инструментов: Google Gemini, Google AI Studio, Lovable AI, Claude Code.
- Что такое сервер и API простыми словами.
Результат: Полное понимание логики и готовность к практике.

МОДУЛЬ 1. Создание сайтов
- Генерация структуры через ИИ.
- Добавление контента и настройка стилей.
- Адаптация под мобильные устройства.
- Мини-анимации и визуальные эффекты.
- Публикация: GitHub, Vercel, Render.
Результат: Собственный опубликованный адаптивный сайт.

МОДУЛЬ 2. Первый AI-проект
- Инструмент Google AI Studio: настройки и модели.
- Генерация интерфейса AI-приложения.
- Подготовка структуры и экспорт кода.
Результат: Первый рабочий AI-инструмент в портфолио.

МОДУЛЬ 3. Lovable AI — проекты средней сложности
- Интерфейс и возможности Lovable AI.
- Интеграция Claude AI и Lovable.
- Работа с данными, авторизация пользователей.
- Проекты: CRM-система, мини-платформа (аналог GetCourse).
Результат: Сложные веб-приложения с логикой и базами данных.

МОДУЛЬ 4. Claude Code и боты
- Создание Telegram-ботов с ИИ.
- Логика команд и бизнес-сценарии.
- Настройка и публикация ботов.
Результат: Свой умный Telegram-бот.

МОДУЛЬ 5. Монетизация и упаковка
- Исследование ниши и позиционирование.
- Формирование оффера и контент-плана (IG, TG, YT).
- Лид-магниты, воронки продаж и автоматизация.
- Модели монетизации и масштабирование.
Результат: Четкий план заработка на своих навыках.

МОДУЛЬ 6. Claude Code + Claude Design
- Глубокий разбор Claude Code от А до Я.
- Работа с проектом через AI-команды в терминале.
- Рефакторинг, улучшение интерфейса и логики.
Результат: Навык профессиональной доработки приложений.

ДЛЯ КОГО КУРС:
- Новичкам (без опыта в коде).
- Предпринимателям (для MVP, CRM, лендингов).
- Маркетологам и экспертам (воронки, упаковка).
- Фрилансерам (новые дорогие услуги).

ЧТО ВЫ СОЗДАДИТЕ:
Лендинги, AI-чаты, Telegram-ботов, CRM, онлайн-школы, дашборды, автоматизации бизнес-процессов.
`;

const SUGGESTED_QUESTIONS = [
  "Подойдет ли курс новичку?",
  "Какие проекты я соберу?",
  "Будет ли Telegram-бот?",
  "Что такое Lovable AI?",
  "Про монетизацию расскажешь?",
  "Нужно ли уметь кодить?"
];

const AUDIENCE = [
  {
    title: "Новичкам",
    desc: "Если вы никогда не писали код, но хотите создавать сайты, приложения и AI-инструменты.",
    icon: BrainCircuit
  },
  {
    title: "Предпринимателям",
    desc: "Если хотите быстро собирать лендинги, CRM, формы, автоматизации и MVP для бизнеса.",
    icon: Briefcase
  },
  {
    title: "Маркетологам",
    desc: "Если нужно упаковывать услуги, запускать воронки, лид-магниты и контент-проекты.",
    icon: TrendingUp
  },
  {
    title: "Фрилансерам",
    desc: "Если хотите добавить AI-разработку в свои услуги и брать проекты дороже.",
    icon: Zap
  }
];

const PROJECTS = [
  {
    title: "Лендинг для бизнеса",
    desc: "Конверсионная страница с формами, анимациями и аналитикой.",
    tag: "Модуль 1",
    icon: Globe
  },
  {
    title: "AI-Ассистент",
    desc: "Умный чат-бот для сайта, отвечающий на вопросы по вашей базе знаний.",
    tag: "Модуль 2",
    icon: Bot
  },
  {
    title: "Telegram AI-Бот",
    desc: "Автоматизированный бот с интеграцией нейросетей для бизнеса.",
    tag: "Модуль 4",
    icon: Send
  },
  {
    title: "CRM-система",
    desc: "Управление клиентами, статусы, менеджеры и дашборды продаж.",
    tag: "Модуль 3",
    icon: ClipboardList
  },
  {
    title: "Онлайн-школа",
    desc: "Платформа с личным кабинетом, курсами и доступом по ролям.",
    tag: "Модуль 3",
    icon: Monitor
  },
  {
    title: "Бизнес-автоматизация",
    desc: "Связка сервисов, обработка данных и уведомления без участия человека.",
    tag: "Модуль 4",
    icon: Layers
  }
];

const CURRICULUM = [
  { title: "Модуль 0. Предобучение", desc: "Что такое вайбкодинг, регистрация в AI-инструментах, понимание API и серверов.", result: "Фундамент заложен" },
  { title: "Модуль 1. Сайты", desc: "Генерация структуры через ИИ, контент, адаптация, анимации и запуск на Vercel.", result: "Первый живой сайт" },
  { title: "Модуль 2. AI-Проект", desc: "Работа с Google AI Studio, создание интерфейса и интеграция LLM-моделей.", result: "Свой AI-софт" },
  { title: "Модуль 3. Lovable AI", desc: "Сложные приложения, CRM, базы данных и авторизация через Claude + Lovable.", result: "Product-level навыки" },
  { title: "Модуль 4. Боты", desc: "Telegram-боты с ИИ, сложная логика команд и интеграция внешних сервисов.", result: "Рабочие боты" },
  { title: "Модуль 5. Монетизация", desc: "Упаковка навыка, поиск ниши, оффер, воронки продаж и контент-стратегия.", result: "План на 1-е деньги" },
  { title: "Модуль 6. Claude Code", desc: "Разбор Claude Code + Claude Design: рефакторинг и профессиональная поддержка.", result: "Pro уровень" }
];

const RESULTS = [
  { title: "Опубликованный сайт", desc: "Ваш проект доступен по ссылке в интернете.", icon: Globe },
  { title: "Первый AI-проект", desc: "Инструмент, который реально 'думает' и помогает.", icon: BrainCircuit },
  { title: "Рабочий бот", desc: "Telegram-бот для автоматизации любых задач.", icon: Send },
  { title: "CRM-платформа", desc: "Сложное приложение для бизнеса с базой данных.", icon: Layout },
  { title: "План монетизации", desc: "Понимание как именно превратить навыки в деньги.", icon: CreditCard },
  { title: "Портфолио проектов", desc: "Набор кейсов, которые не стыдно показать клиенту.", icon: Rocket }
];

const FAQ_DATA = [
  { q: "Курс подойдет новичку?", a: "Да, обучение начинается с модуля 'Предобучение', где мы разбираем базу: что такое вайбкодинг, как работают API и серверы. Вам не нужно быть программистом." },
  { q: "Нужно ли уметь программировать?", a: "Нет. Мы используем ИИ-ассистентов, чтобы они писали код за нас. Вы выступаете в роли архитектора и заказчика." },
  { q: "Какие инструменты используются?", a: "Google Gemini, AI Studio, Lovable AI, Claude Code и Cursor. Это современный стек вайбкодинга." },
  { q: "Что я создам во время обучения?", a: "Минимум 5 реальных проектов: лендинг, AI-инструмент, Telegram-бот, CRM-систему и свою воронку продаж." },
  { q: "Будет ли блок про монетизацию?", a: "Конечно! Пятый модуль полностью посвящен упаковке навыков, поиску ниши и продажам ваших решений." },
  { q: "Можно ли применять это для бизнеса?", a: "Это идеальный курс для бизнеса. Вы научитесь собирать MVP и автоматизации в 10 раз быстрее и дешевле." },
  { q: "Как проходит обратная связь?", a: "Вам помогает AI-ассистент, а также предусмотрена поддержка в закрытом сообществе." },
  { q: "Есть ли ограничения по времени?", a: "Обучение проходит в вашем темпе, доступ к материалам остается у вас." },
  { q: "Нужный ли мощный компьютер?", a: "Нет, большинство инструментов работают в браузере или через легкие терминальные приложения." },
  { q: "Что делать, если я не понимаю API и сервер?", a: "В Модуле 0 мы объясняем это на бытовых примерах. Вы поймете механику за 30 минут." }
];


// --- Sub-components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 ${className}`}>
    {children}
  </span>
);

const SectionHeader = ({ badge, title, sub, center = false }: { badge: string, title: string | React.ReactNode, sub?: string, center?: boolean }) => (
  <div className={`mb-16 ${center ? 'text-center mx-auto max-w-3xl' : ''}`}>
    <Badge className="mb-6">{badge}</Badge>
    <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-6" dangerouslySetInnerHTML={{ __html: String(title) }} />
    {sub && <p className="text-xl text-slate-400 font-medium leading-relaxed">{sub}</p>}
  </div>
);

const Navbar = ({ onOpenAssistant }: { onOpenAssistant: () => void }) => {
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
    { label: "Результаты", href: "#results" },
    { label: "Монетизация", href: "#money" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">Вайбкодинг</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-tight">
          {menuItems.map(item => (
            <a key={item.label} href={item.href} className="hover:text-cyan-400 transition-colors">{item.label}</a>
          ))}
          <button 
            onClick={onOpenAssistant}
            className="hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            Задать вопрос ИИ
          </button>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button className="text-slate-300 hover:text-white transition-colors">Войти</button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/10">
            Забронировать место
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
              <button 
                onClick={() => { setIsOpen(false); onOpenAssistant(); }}
                className="text-left text-cyan-400"
              >
                Вопрос ИИ
              </button>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-base">Войти</button>
                <button className="p-4 bg-cyan-500 rounded-2xl text-base">Забронировать</button>
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
    <div className="w-full bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group">
      <div className="h-10 bg-[#161b22] px-4 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 group-hover:bg-red-500/70 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500/70 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 group-hover:bg-green-500/70 transition-colors" />
        </div>
        <div className="px-3 py-1 bg-white/5 rounded text-[10px] text-slate-500 font-mono flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          project_generator.ts
        </div>
        <div className="w-8" />
      </div>
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-hidden">
        <div className="flex gap-4">
          <span className="text-slate-600 shrink-0">01</span>
          <span className="text-purple-400">User:</span> <span className="text-slate-300 italic">"Сделай лендинг для онлайн-школы"</span>
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-slate-600 shrink-0">02</span>
          <span className="text-cyan-400">AI:</span> <span className="text-slate-400">Создаю структуру: Hero, Программа, Кейсы...</span>
        </div>
        <div className="flex gap-4 mt-2 animate-pulse">
          <span className="text-slate-600 shrink-0">03</span>
          <span className="text-cyan-400">AI:</span> <span className="text-slate-400">✓ Генерация UI-компонентов</span>
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-slate-600 shrink-0">04</span>
          <span className="text-cyan-400">AI:</span> <span className="text-slate-400">✓ Настройка формы заявки и базы данных</span>
        </div>
        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
               <CheckCircle2 className="w-5 h-5" />
             </div>
             <div>
               <p className="text-emerald-400 font-bold text-xs uppercase">Готово!</p>
               <p className="text-slate-300 text-xs">Проект опубликован за 1 день. Проверяй результат.</p>
             </div>
           </div>
        </div>
      </div>
      {/* Decorative Orbs */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full" />
    </div>
  );
};

const AIWidget = ({ forceOpen, onClose }: { forceOpen?: boolean, onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

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
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: text,
        config: {
          systemInstruction: `Ты — AI-ассистент курса «Вайбкодинг». Работай строго по этой базе знаний: ${KNOWLEDGE_BASE}. 
          Отвечай кратко, дружелюбно, на русском. Если информации нет в базе — скажи честно об этом и предложи оставить заявку. 
          Не выдумывай цену, даты и гарантии дохода. Мягко веди к покупке курса.`,
         }
      });
      setMessages(prev => [...prev, { role: "bot", text: response.text || "Извините, не удалось получить ответ." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", text: "Простите, мой ИИ-двигатель немного перегрелся. Попробуйте еще раз!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[100vw] h-[100dvh] sm:w-[420px] sm:h-[620px] bottom-[-24px] right-[-24px] sm:static bg-slate-900 border-x border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-slate-800/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-tight">Вайб-Ассистент</h4>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    Онлайн • Ответ по программе
                  </p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide bg-slate-950/20">
              {messages.length === 0 && (
                <div className="space-y-6">
                  <div className="p-5 bg-white/5 border border-white/5 rounded-2xl text-slate-300 text-sm leading-relaxed">
                    Привет! 👋 Я AI-ассистент курса <span className="text-cyan-400 font-bold">«Вайбкодинг»</span>. 
                    Знаю всё о модулях, проектах и инструментах. Помогу понять, подходит ли вам курс. С чего начнем?
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {SUGGESTED_QUESTIONS.map(q => (
                      <button 
                        key={q}
                        onClick={() => handleSend(q)}
                        className="text-left p-4 rounded-2xl bg-slate-800/50 border border-white/5 text-xs text-slate-400 hover:border-cyan-400/30 hover:text-white hover:bg-slate-800 transition-all font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-cyan-600/90 text-white shadow-xl shadow-cyan-900/10' : 'bg-slate-800/80 text-slate-200 border border-white/10'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/50 p-4 rounded-2xl flex gap-1.5 border border-white/5">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-900 border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex gap-3"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Задать вопрос ИИ..."
                  className="flex-1 bg-slate-800/50 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white disabled:opacity-50 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-600 mt-4 font-bold uppercase tracking-widest">
                Ассистент отвечает по программе курса
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="group h-16 pl-6 pr-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center gap-4 shadow-2xl shadow-cyan-500/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <MessageCircle className="text-white w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <span className="text-white font-bold text-base hidden sm:block">Спросить ИИ</span>
        </motion.button>
      )}
    </div>
  );
};

// --- Main Page Sections ---

const WhyVibeCodingSection = () => {
  const features = [
    { title: "Скорость x10", desc: "То, на что у программиста уходит неделя, ты соберешь за один вечер с помощью ИИ.", icon: Zap },
    { title: "AI как напарник", desc: "Тебе не нужно гуглить ошибки часами. Твой ИИ-ментор всегда подскажет верное решение.", icon: Sparkles },
    { title: "Без зубрежки", desc: "Мы не учим синтаксис языков. Мы учим архитектуре, логике и правильным промптам.", icon: BrainCircuit },
    { title: "Профессиональный стек", desc: "Ты используешь те же инструменты, что и топовые разработчики в Кремниевой долине.", icon: Layers },
    { title: "Сообщество", desc: "Ты попадаешь в тусовку людей, которые создают продукты будущего прямо сейчас.", icon: Share2 },
    { title: "Результат сразу", desc: "Твой первый рабочий сайт будет опубликован уже в первый день обучения.", icon: Rocket },
  ];

  return (
    <section className="py-24 bg-slate-900/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Преимущества"
          title="Почему вайбкодинг — это <br/> чит-код для жизни?"
          sub="Технология, которая меняет правила игры в IT и бизнесе"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-950 border border-white/5 rounded-[32px] hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MonetizationSection = () => {
  const models = [
    { title: "Фриланс 2.0", desc: "Создавай сайты и ботов в 10 раз быстрее конкурентов и бери больше проектов.", icon: Briefcase, profit: "от $1,500/мес" },
    { title: "AI-Агентство", desc: "Автоматизируй бизнес-процессы других компаний и получай оплату за результат.", icon: TrendingUp, profit: "от $3,000/мес" },
    { title: "Свои микро-SAAS", desc: "Запускай собственные сервисы с подпиской — от AI-чатов до CRM.", icon: Rocket, profit: "Неограниченно" },
  ];

  return (
    <section id="money" className="py-24 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            badge="Заработок"
            title="Как ты будешь <br/> монетизировать навыки?"
            sub="Вайбкодинг — это не только про творчество, но и про твердые деньги в новой экономике"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((m, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-slate-900 border border-white/10 rounded-[40px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <m.icon className="w-20 h-20 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{m.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{m.desc}</p>
                <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-black text-sm">
                  {m.profit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Hero = ({ onOpenAssistant }: { onOpenAssistant: () => void }) => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[30%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge>AI-курс для тех, кто хочет создавать сайты, приложения и ботов без классического пути программиста</Badge>
            
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
              Научись создавать <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                AI-продукты
              </span>{' '}
              — даже если ты не программист
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-semibold mb-12 max-w-xl italic">
              Пошаговый курс по вайбкодингу: от первого сайта и Telegram-бота до CRM, мини-платформ, автоматизаций и первых денег на цифровых продуктах.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 group flex items-center justify-center gap-3">
                Забронировать место
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => { document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-10 py-5 border-2 border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/5 transition-all"
              >
                Посмотреть программу
              </button>
            </div>

            <button 
              onClick={onOpenAssistant}
              className="mt-6 flex items-center gap-2 text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors group"
            >
              <Sparkles className="w-4 h-4" />
              Задать вопрос ИИ-ассистенту
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:pl-10"
          >
            <MockEditor />
            {/* Trust labels */}
            <div className="absolute -top-12 -right-8 p-6 bg-slate-900/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-400 rounded-2xl flex items-center justify-center">
                  <Bot className="text-slate-950 w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Проекты</p>
                  <p className="text-xl font-black text-white">9+ полноценных кейсов</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const AudienceSection = () => {
  return (
    <section id="audience" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Для кого курс"
          title="Кому подойдет вайбкодинг?"
          sub="Технология, которая уравнивает шансы творцов и технарей"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUDIENCE.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-cyan-500/20">
                <item.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TrustMiniSection = () => {
  return (
    <section className="py-16 border-y border-white/5 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Тебе <span className="text-red-400">НЕ</span> нужно:
            </h2>
            <div className="space-y-4">
              {[
                { icon: ZapOff, text: "Учить синтаксис языков программирования месяцами" },
                { icon: ZapOff, text: "Разбираться в сложных алгоритмах и структурах данных" },
                { icon: ZapOff, text: "Иметь техническое образование или опыт в IT" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-400">
                  <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Тебе <span className="text-cyan-400">НУЖНО</span>:
            </h2>
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Уметь четко формулировать свои мысли на русском языке" },
                { icon: ShieldCheck, text: "Иметь компьютер, интернет и жгучее желание создавать" },
                { icon: ShieldCheck, text: "Понимать логику продукта и потребности людей" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-400">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const LearningFlowSection = () => {
  const steps = [
    { title: "Смотришь урок", desc: "Короткие, емкие видео по 15-20 минут без воды.", icon: MonitorPlay },
    { title: "Повторяешь за ИИ", desc: "Используешь наши промпты для генерации кода.", icon: Cpu },
    { title: "Правишь «руками»", desc: "Учимся делать точечные правки через AI-чат.", icon: MousePointer2 },
    { title: "Запускаешь проект", desc: "Публикуешь сайт или бота в сеть за пару кликов.", icon: Rocket },
    { title: "Получаешь результат", desc: "Используешь проект для себя или продаешь клиенту.", icon: HandCoins },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Процесс"
          title="Как проходит обучение?"
          sub="От идеи до рабочего продукта всего за несколько шагов"
          center
        />

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-slate-900 border-4 border-slate-950 rounded-full flex items-center justify-center mb-8 relative group-hover:border-cyan-500 transition-all shadow-xl group-hover:shadow-cyan-500/20">
                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 text-slate-950 font-black rounded-full flex items-center justify-center text-sm">
                     {i + 1}
                   </div>
                   <step.icon className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-slate-950 border-y border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <Badge>Твое портфолио</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mt-4">
              Проекты, которые ты <span className="text-cyan-400">соберешь за курс</span>
            </h2>
          </div>
          <div className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">
            9+ полноценных кейсов
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-slate-900 rounded-[40px] border border-white/5 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <p.icon className="w-24 h-24 text-cyan-400" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.tag}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">{p.desc}</p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Ready to deploy
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CurriculumSection = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  return (
    <section id="curriculum" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Программа"
          title="Пошаговый план <br/> твоего апгрейда"
          sub="6 модулей: от настройки софта до запуска своего бизнеса"
        />

        <div className="max-w-4xl space-y-4">
          {CURRICULUM.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-3xl transition-all duration-500 overflow-hidden ${expandedModule === i ? 'bg-slate-900 border-cyan-500/30' : 'bg-slate-900/50 border-white/5'}`}
            >
              <button 
                onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                className="w-full p-8 flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-colors ${expandedModule === i ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-500 group-hover:text-white'}`}>
                    0{i}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white tracking-tight">{m.title}</h3>
                    <p className="text-cyan-400 text-xs font-black uppercase tracking-widest">{m.result}</p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform ${expandedModule === i ? 'rotate-180 bg-white/5' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
              </button>

              <AnimatePresence>
                {expandedModule === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="px-8 pb-8 pt-2">
                       <p className="text-slate-400 font-medium leading-relaxed mb-8 border-l-2 border-cyan-500/30 pl-6">
                         {m.desc}
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Практическое задание</p>
                            <p className="text-sm font-bold text-white">Создание структуры и базового кода проекта через AI</p>
                         </div>
                         <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Бонус модуля</p>
                            <p className="text-sm font-bold text-cyan-400">Набор готовых AI-промптов для быстрой генерации</p>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ResultsSection = () => {
  return (
    <section id="results" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="Результаты"
          title="Что ты получишь <br/> после курса?"
          sub="Твердые навыки и готовые инструменты для работы"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESULTS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-purple-500/20">
                <r.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{r.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-medium">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const AIAssistantSection = ({ onOpenAssistant }: { onOpenAssistant: () => void }) => {
  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto p-12 bg-slate-950 border border-white/5 rounded-[48px] text-center shadow-2xl">
          <Badge className="mb-6">AI-помощник</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Остались вопросы <br /> по программе?
          </h2>
          <p className="text-xl text-slate-400 mb-10 font-medium">
            Наш ИИ-ассистент знает всё о курсе: от стоимости до деталей каждого модуля. Спроси его прямо сейчас!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
            {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
              <button 
                key={i}
                onClick={onOpenAssistant}
                className="p-4 bg-slate-900 border border-white/5 rounded-2xl text-slate-400 text-sm font-bold hover:border-cyan-500/50 hover:text-white transition-all flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                </div>
                {q}
              </button>
            ))}
          </div>

          <button 
            onClick={onOpenAssistant}
            className="px-12 py-6 bg-cyan-400 text-slate-950 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-400/20"
          >
            Задать свой вопрос
          </button>
        </div>
      </div>
    </section>
  );
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <SectionHeader 
          badge="FAQ"
          title="Часто задаваемые <br/> вопросы"
          center
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div 
              key={i} 
              className={`border rounded-2xl transition-all duration-300 ${openIndex === i ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between group"
              >
                <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors text-left">{item.q}</span>
                <div className={`shrink-0 ml-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-400 font-medium leading-relaxed">
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

const FinalCTASection = ({ onOpenAssistant }: { onOpenAssistant: () => void }) => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter italic uppercase leading-[0.8] scale-y-110">
            Твое будущее <br /> <span className="text-cyan-400">начинается здесь</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 font-bold max-w-2xl mx-auto italic">
            Старт следующего потока: <span className="text-white">Через 3 дня</span>. Набор ограничен для качества обучения.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto px-12 py-6 bg-white text-slate-950 font-black text-2xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10">
              Забронировать место
            </button>
            <button 
              onClick={onOpenAssistant}
              className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white border border-white/10 font-bold text-xl rounded-2xl hover:bg-slate-800 transition-all"
            >
              Спросить AI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <BrainCircuit className="w-10 h-10 text-cyan-400" />
              <span className="text-3xl font-black text-white uppercase italic tracking-tight">Вайбкодинг</span>
            </div>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mb-8">
              Первая в СНГ академия вайбкодинга. Обучаем создателей нового поколения, которые используют ИИ как суперсилу.
            </p>
            <div className="flex gap-4">
              {[Send, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center text-white hover:border-cyan-400 hover:text-cyan-400 transition-all">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Навигация</h4>
            <ul className="space-y-4">
              {['Программа', 'Результаты', 'Для кого', 'FAQ'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 font-bold text-sm uppercase italic hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-8">Курс</h4>
            <p className="text-slate-500 font-bold text-sm italic mb-4">Старт потока: 3 дня</p>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              Забронировать
            </button>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
          <p>© 2026 Вайбкодинг. Built with AI in record time.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main App ---

export default function App() {
  const [forceOpenAssistant, setForceOpenAssistant] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenAssistant = () => {
    setForceOpenAssistant(true);
    // Reset after a short delay
    setTimeout(() => setForceOpenAssistant(false), 500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-400/30 selection:text-white">
      <Navbar onOpenAssistant={handleOpenAssistant} />
      <Hero onOpenAssistant={handleOpenAssistant} />
      
      <TrustMiniSection />
      <WhyVibeCodingSection />
      <AudienceSection />
      <LearningFlowSection />
      <ProjectsSection />
      <CurriculumSection />
      <ResultsSection />
      <MonetizationSection />
      <AIAssistantSection onOpenAssistant={handleOpenAssistant} />
      <FAQSection />
      <FinalCTASection onOpenAssistant={handleOpenAssistant} />
      <Footer />

      <AIWidget forceOpen={forceOpenAssistant} onClose={() => setForceOpenAssistant(false)} />

      {/* Sticky Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-[90] bg-slate-950/80 backdrop-blur-xl border-t border-white/10 flex gap-4">
        <button 
          onClick={handleOpenAssistant}
          className="flex-1 px-4 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest"
        >
          Задать вопрос AI
        </button>
        <button className="flex-[1.5] px-4 py-4 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-white/10">
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
