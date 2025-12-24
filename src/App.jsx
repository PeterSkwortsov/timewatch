import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHeartbeat,
  FaWater,
  FaBolt,
  FaSun,
  FaShieldAlt,
  FaMobileAlt,
  FaBatteryFull,
  FaBrain,
} from "react-icons/fa";
import { GiWeightLiftingUp, GiWaterDrop } from "react-icons/gi";
import { WiThermometer } from "react-icons/wi";
import Scene from "./assets/Scene.jsx";

// Регистрируем плагин GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/time1.jpeg",
      
    },
    {
      id: 2,
      image: "/time2.jpeg",
      
    },
    {
      id: 3,
      image: "/time3.jpeg",
      
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Автопрокрутка (опционально)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide])




  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const featuresRef = useRef([]);

  useEffect(() => {
    // Анимация часов
    gsap
      .timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      })
      .to(sceneRef.current, { x: "25vw", y: "100vh", ease: "none" })
      .to(sceneRef.current, { x: "-25vw", y: "250vh", ease: "none" })
      .to(sceneRef.current, { x: "25vw", y: "350vh", ease: "none" })
      .to(sceneRef.current, { x: "-25vw", y: "450vh", ease: "none" })
      .to(sceneRef.current, { x: "25vw", y: "550vh", ease: "none" })
      .to(sceneRef.current, { x: "-25vw", y: "650vh", ease: "none" })
      .to(sceneRef.current, { x: "25vw", y: "800vh", ease: "none" })
      // .to(sceneRef.current, { x: "-25vw", y: "600vh", ease: "none" })

    // Анимация фич при скролле
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        gsap.fromTo(
          feature,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: feature,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          }
        );
      }
    });
  }, []);

  // Преимущества часов
  const features = [
    {
      icon: <FaHeartbeat className="text-red-500" />,
      title: "Мониторинг здоровья 24/7",
      description:
        "Автоматическое обнаружение падений, ЭКГ, измерение SpO₂ и уведомления о нарушениях сердечного ритма",
      color: "from-red-500/20 to-red-900/10",
    },
    {
      icon: <FaWater className="text-blue-500" />,
      title: "Водонепроницаемость 50м",
      description:
        "Погружение до 50 метров, отслеживание плавания и дайвинга с определением температуры воды",
      color: "from-blue-500/20 to-blue-900/10",
    },
    {
      icon: <FaBolt className="text-yellow-500" />,
      title: "Быстрая зарядка",
      description:
        "Всего 45 минут до 100% заряда, работа до 36 часов в активном режиме",
      color: "from-yellow-500/20 to-yellow-900/10",
    },
    {
      icon: <FaSun className="text-orange-500" />,
      title: "Экстремальная яркость",
      description: "Дисплей 3000 нит — видимость даже под прямым солнцем",
      color: "from-orange-500/20 to-orange-900/10",
    },
  ];

  const healthFeatures = [
    {
      icon: <GiWeightLiftingUp className="text-purple-500" />,
      title: "Фитнес-трекер",
      description:
        "30+ видов тренировок, автоматическое распознавание упражнений",
    },
    {
      icon: <FaBrain className="text-indigo-500" />,
      title: "Умный сон",
      description:
        "Анализ фаз сна, уведомления об апноэ, рекомендации по улучшению",
    },
    {
      icon: <FaMobileAlt className="text-green-500" />,
      title: "Интеграция",
      description: "Полная синхронизация с экосистемой Eon Watch, быстрые ответы",
    },
    {
      icon: <WiThermometer className="text-pink-500" />,
      title: "Температура тела",
      description: "Ночной мониторинг для отслеживания овуляции и здоровья",
    },
  ];

  return (
    <main
      ref={mainRef}
      className="overflow-x-hidden bg-gradient-to-br from-blue-900/30 via-black to-purple-900/20"
    >
      <Suspense
        fallback={
          <div className="fixed inset-0 grid place-items-center bg-black text-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl font-light">Загружаем будущее...</p>
            </div>
          </div>
        }
      >
        {/* Hero Section */}
        <section className="relative grid place-items-center min-h-screen ">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

          <div className="relative z-10 text-center px-4 max-w-6xl">
            <h1 className="text-white text-7xl md:text-9xl font-bold mb-6 tracking-tighter">
              Eon Watch
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-light mt-8 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-black/30 p-6 rounded-2xl border border-white/10">
              Революция на вашем запястье. Синхронизация уведомлений, быстрая
              зарядка, функция определения глубины и температуры воды.
              Совершенно новый уровень взаимодействия.
            </p>

            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-0 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Купить сейчас
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Узнать больше
              </button>
            </div>
          </div>

          <div ref={sceneRef} className="h-[100vh] w-[100vw] absolute">
            <Canvas>
              <Scene progress={progress} />
            </Canvas>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-white/60">↓</div>
          </div>
        </section>
        {/* Features Grid */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-white text-4xl relative font-bold text-center mb-4">
            Почему именно эти часы?
          </h2>
          <p className="text-gray-400 relative text-center text-xl mb-16 max-w-3xl mx-auto">
            8 ключевых преимуществ, которые меняют представление о носимых
            устройствах
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-0 
                transform hover:-translate-y-2`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white text-md font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-32">
            <div className="space-y-8">
              {healthFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="text-3xl mt-1 group-hover:scale-125 transition-transform duration-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-semibold group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
                <h3 className="text-white text-3xl font-bold mb-6">
                  Инвестиция в здоровье
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Снижение риска сердечных заболеваний на 34%
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Увеличение физической активности на 48%
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Улучшение качества сна на 67%
                  </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-gray-400 text-sm">
                    *По данным исследований пользователей Eon Watch за 2024 год
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            {/* Контейнер слайдов */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 md:h-[500px]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                   
                  </div>
                </div>
              ))}
            </div>

            {/* Кнопки навигации */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Предыдущий слайд"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Следующий слайд"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Индикаторы */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>

            {/* Счетчик слайдов */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>

          {/* Миниатюры (опционально) */}
          <div className="flex justify-center mt-6 space-x-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  index === currentSlide
                    ? "ring-2 ring-blue-500 ring-offset-2 transform scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Миниатюра ${slide.title}`}
                  className="w-24 h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      
        {/* Scroll Sections with 3D Model */}
        <section className="relative flex items-center justify-end min-h-screen px-8 md:px-16">
          <div className="w-full">
            <div className="max-w-lg">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 mb-6">
                <FaShieldAlt className="mr-2" />
                <span className="font-semibold">Прочность</span>
              </div>
              <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
                Созданы для приключений
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed">
                Ремешки повышенной прочности выдерживают экстремальные нагрузки,
                а сапфировое стекло устойчиво к царапинам. Часы прошли испытания
                в самых суровых условиях — от горных вершин до океанских глубин.
              </p>
              <div className="mt-8 flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl text-white font-bold">50м</div>
                  <div className="text-gray-400 text-sm">
                    Глубина погружения
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-white font-bold">-20°C</div>
                  <div className="text-gray-400 text-sm">
                    Минимальная температура
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-white font-bold">IP6X</div>
                  <div className="text-gray-400 text-sm">Защита от пыли</div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-1/2"></div>
        </section>
        <section className="relative flex items-center justify-between min-h-screen px-8 md:px-16">
          <div className="hidden md:block w-1/2"></div>
          <div className="w-full md:w-1/2">
            <div className="max-w-lg ml-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 mb-6">
                <FaBatteryFull className="mr-2" />
                <span className="font-semibold">Автономность</span>
              </div>
              <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
                Работает дольше, заряжается быстрее
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed">
                Благодаря новому энергоэффективному процессору часы работают до
                36 часов без подзарядки. А с быстрой зарядкой всего за 8 минут
                вы получаете заряд на весь день.
              </p>
              <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Зарядка 0-80%</span>
                  <span className="text-white font-bold">45 мин</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 w-4/5 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative flex items-center justify-between min-h-screen px-8 md:px-16">
          <div className="w-full md:w-1/2">
            <div className="max-w-lg">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 mb-6">
                <GiWaterDrop className="mr-2" />
                <span className="font-semibold">Экран</span>
              </div>
              <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
                Самый яркий дисплей Eon Watch
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed">
                Дисплей 3000 нит обеспечивает кристально четкое изображение даже
                под прямыми солнечными лучами. Технология LTPO позволяет плавно
                менять частоту обновления от 1 до 120 Гц, экономя заряд батареи.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-white text-xl font-bold">3000 нит</div>
                  <div className="text-gray-400 text-sm">Пиковая яркость</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-white text-xl font-bold">120 Гц</div>
                  <div className="text-gray-400 text-sm">
                    Частота обновления
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-1/2"></div>
        </section>
        {/* CTA Section */}
        <section className="relative flex items-center justify-center mt-8 px-4">
          <div className="max-w-4xl text-center">
            <h2 className="text-white text-4xl font-bold mb-8">
              Готовы изменить свою жизнь?
            </h2>
            <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
              Eon Watch — это не просто часы, это ваш персональный тренер,
              доктор и помощник в одном устройстве
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6">
                <div className="text-4xl text-white mb-4">🏆</div>
                <h4 className="text-white text-xl font-bold mb-2">
                  Лучший выбор 2024
                </h4>
                <p className="text-gray-400">По версии TechRadar и CNET</p>
              </div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6">
                <div className="text-4xl text-white mb-4">⭐</div>
                <h4 className="text-white text-xl font-bold mb-2">
                  4.9/5 оценка
                </h4>
                <p className="text-gray-400">Средняя оценка пользователей</p>
              </div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6">
                <div className="text-4xl text-white mb-4">📈</div>
                <h4 className="text-white text-xl font-bold mb-2">#1 в мире</h4>
                <p className="text-gray-400">Самые продаваемые умные часы</p>
              </div>
            </div>

            <button className="px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-0 animate-pulse-slow">
              Купить сейчас от 29 990 ₽
            </button>

            <p className="text-gray-500 mt-8 text-sm">
              Бесплатная доставка • 14 дней на возврат • Рассрочка 0%
            </p>
          </div>
        </section>
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500">Eon Watch. Все права защищены.</p>
          </div>
        </footer>
      </Suspense>

      {/* Custom animation for pulse */}
      <style>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </main>
  );
}

export default App;
