import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Planetas.module.css";
import "./Planetas.tailwind.css";

const Planetas = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);

  // Perguntas do quiz
  const questions = [
    {
      question: "Qual é o planeta mais quente do Sistema Solar?",
      answers: [
        { text: "Mercúrio", correct: false },
        { text: "Vênus", correct: true },
        { text: "Marte", correct: false },
        { text: "Júpiter", correct: false },
      ],
    },
    {
      question: "Qual planeta é conhecido como 'Planeta Vermelho'?",
      answers: [
        { text: "Vênus", correct: false },
        { text: "Marte", correct: true },
        { text: "Júpiter", correct: false },
        { text: "Saturno", correct: false },
      ],
    },
    {
      question: "Qual planeta gira 'de lado'?",
      answers: [
        { text: "Urano", correct: true },
        { text: "Netuno", correct: false },
        { text: "Saturno", correct: false },
        { text: "Júpiter", correct: false },
      ],
    },
    {
      question: "Qual é o maior planeta do Sistema Solar?",
      answers: [
        { text: "Saturno", correct: false },
        { text: "Netuno", correct: false },
        { text: "Júpiter", correct: true },
        { text: "Urano", correct: false },
      ],
    },
    {
      question: "Quantos planetas existem no Sistema Solar?",
      answers: [
        { text: "7", correct: false },
        { text: "8", correct: true },
        { text: "9", correct: false },
        { text: "10", correct: false },
      ],
    },
  ];

  // Adicionar Tailwind CSS via CDN
  useEffect(() => {
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    // Configurar Tailwind
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'orbitron': ['Orbitron', 'monospace'],
              'space': ['Space Grotesk', 'sans-serif']
            }
          }
        }
      }
    `;
    document.head.appendChild(configScript);

    return () => {
      if (document.head.contains(tailwindScript)) {
        document.head.removeChild(tailwindScript);
      }
      if (document.head.contains(configScript)) {
        document.head.removeChild(configScript);
      }
    };
  }, []);

  // Gerar estrelas no fundo
  useEffect(() => {
    const starsBg = document.getElementById("stars-bg");
    if (starsBg && starsBg.children.length === 0) {
      const numStars = 150;
      for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.className = styles.stars;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsBg.appendChild(star);
      }
    }
  }, []);

  // Scroll suave para planeta
  const scrollToPlanet = (planetId) => {
    const element = document.getElementById(planetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Iniciar quiz
  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setShowNext(false);
  };

  // Selecionar resposta
  const selectAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const correct =
      questions[currentQuestionIndex].answers[answerIndex].correct;
    if (correct) {
      setScore(score + 1);
    }
    setShowNext(true);
  };

  // Próxima pergunta
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowNext(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Reiniciar quiz
  const restartQuiz = () => {
    setShowQuiz(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowNext(false);
  };

  return (
    <div className={`${styles.planetasPage} bg-black text-white`}>
      <div className={styles.starsBg} id="stars-bg"></div>

      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-10 text-white px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6 border border-white border-opacity-20 backdrop-blur-md">
                <i className="fas fa-globe"></i>
                <span>Sistema Solar</span>
              </div>

              <h1 className="font-orbitron text-5xl lg:text-7xl font-black mb-6 text-white leading-tight">
                Planetas do Sistema Solar
              </h1>

              <p className="text-xl lg:text-2xl font-light mb-8 text-white text-opacity-80 font-orbitron">
                Explore Nossos Mundos Vizinhos
              </p>

              <p className="text-lg mb-10 text-white text-opacity-70 leading-relaxed">
                Descubra os oito mundos fascinantes que orbitam nosso Sol. Cada
                planeta possui características únicas que o tornam especial.
                Clique nos planetas para explorar suas particularidades.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#planetas"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-200 text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-white/30 hover:-translate-y-1"
                >
                  <i className="fas fa-rocket"></i>
                  <span>Explorar Planetas</span>
                </a>
                <a
                  href="#quiz"
                  className="inline-flex items-center gap-3 bg-transparent text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wider border-2 border-white border-opacity-50 transition-all hover:bg-white hover:bg-opacity-10 hover:border-opacity-100 hover:-translate-y-1 backdrop-blur-md"
                >
                  <i className="fas fa-question-circle"></i>
                  <span>Fazer Quiz</span>
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className={styles.solarSystem}>
                <div
                  className={styles.sun}
                  onClick={() => scrollToPlanet("sol")}
                  title="Sol"
                ></div>

                <div className={`${styles.orbit} ${styles.orbit1}`}>
                  <div
                    className={`${styles.planet} ${styles.mercury}`}
                    onClick={() => scrollToPlanet("mercurio")}
                    title="Mercúrio"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit2}`}>
                  <div
                    className={`${styles.planet} ${styles.venus}`}
                    onClick={() => scrollToPlanet("venus")}
                    title="Vênus"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit3}`}>
                  <div
                    className={`${styles.planet} ${styles.earth}`}
                    onClick={() => scrollToPlanet("terra")}
                    title="Terra"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit4}`}>
                  <div
                    className={`${styles.planet} ${styles.mars}`}
                    onClick={() => scrollToPlanet("marte")}
                    title="Marte"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit5}`}>
                  <div
                    className={`${styles.planet} ${styles.jupiter}`}
                    onClick={() => scrollToPlanet("jupiter")}
                    title="Júpiter"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit6}`}>
                  <div
                    className={`${styles.planet} ${styles.saturn}`}
                    onClick={() => scrollToPlanet("saturno")}
                    title="Saturno"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit7}`}>
                  <div
                    className={`${styles.planet} ${styles.uranus}`}
                    onClick={() => scrollToPlanet("urano")}
                    title="Urano"
                  ></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit8}`}>
                  <div
                    className={`${styles.planet} ${styles.neptune}`}
                    onClick={() => scrollToPlanet("netuno")}
                    title="Netuno"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planetas Section */}
      <section id="planetas" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-orbitron text-4xl lg:text-6xl font-bold mb-5 text-white uppercase tracking-wider">
              Nossos Mundos
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mb-5 rounded"></div>
            <p className="text-lg text-white text-opacity-80">
              Conheça as características únicas de cada planeta
            </p>
          </div>

          {/* Sol */}
          <div
            id="sol"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:col-span-1">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #ffd700, #ff8c00)",
                    boxShadow: "0 0 50px rgba(255, 215, 0, 0.6)",
                  }}
                ></div>
              </div>
              <div className="md:col-span-2">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-yellow-300 ${styles.glowText}`}
                >
                  Sol
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  O coração do nosso sistema solar, o Sol é uma estrela do tipo
                  G que contém 99.8% de toda a massa do sistema. Sua energia é a
                  fonte de luz e vida na Terra.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 1.39 milhões de km
                    </p>
                    <p className="text-white">
                      <strong>Idade:</strong> 4.6 bilhões de anos
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Temperatura:</strong> 5.500°C (superfície)
                    </p>
                    <p className="text-white">
                      <strong>Composição:</strong> 74% Hidrogênio, 24% Hélio
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> A luz do Sol leva cerca de 8
                  minutos e 20 segundos para chegar à Terra.
                </p>
              </div>
            </div>
          </div>

          {/* Mercúrio */}
          <div
            id="mercurio"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:col-span-1">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #a0a0a0, #606060)",
                  }}
                ></div>
              </div>
              <div className="md:col-span-2">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-gray-300 ${styles.glowText}`}
                >
                  Mercúrio
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  O menor e mais veloz planeta, Mercúrio completa uma volta ao
                  redor do Sol em apenas 88 dias terrestres.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 4.879 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 88 dias
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 59 dias terrestres
                    </p>
                    <p className="text-white">
                      <strong>Temperatura:</strong> -173°C a 427°C
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> Possui um enorme núcleo de ferro
                  que compõe cerca de 75% do seu diâmetro.
                </p>
              </div>
            </div>
          </div>

          {/* Vênus */}
          <div
            id="venus"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-yellow-400 ${styles.glowText}`}
                >
                  Vênus
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  Envolto em nuvens de ácido sulfúrico, Vênus é o planeta mais
                  quente do sistema solar devido a um efeito estufa extremo.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 12.104 km
                    </p>
                    <p className="text-white">
                      <strong>Temperatura:</strong> 462°C
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 243 dias (retrógrado)
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 225 dias
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> Um dia em Vênus é mais longo que
                  seu ano!
                </p>
              </div>
              <div className="flex justify-center md:col-span-1 order-1 md:order-2">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #ffc649, #cc9900)",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Terra */}
          <div
            id="terra"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:col-span-1">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #1e90ff, #228b22, #1e90ff)",
                  }}
                ></div>
              </div>
              <div className="md:col-span-2">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-blue-400 ${styles.glowText}`}
                >
                  Terra
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  Nosso lar, um mundo único com oceanos de água líquida e uma
                  atmosfera rica em oxigênio que sustenta toda forma de vida
                  conhecida.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 12.742 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 365,25 dias
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 24 horas
                    </p>
                    <p className="text-white">
                      <strong>Atmosfera:</strong> 78% Nitrogênio, 21% Oxigênio
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> É o único planeta conhecido com
                  vida e que não foi nomeado em homenagem a uma divindade
                  greco-romana.
                </p>
              </div>
            </div>
          </div>

          {/* Marte */}
          <div
            id="marte"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-red-400 ${styles.glowText}`}
                >
                  Marte
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  O "Planeta Vermelho" fascina com suas calotas polares e
                  evidências de que pode ter abrigado vida no passado.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 6.779 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 687 dias
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 24.6 horas
                    </p>
                    <p className="text-white">
                      <strong>Luas:</strong> 2 (Fobos e Deimos)
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> Marte abriga o Monte Olimpo, o
                  maior vulcão do Sistema Solar.
                </p>
              </div>
              <div className="flex justify-center md:col-span-1 order-1 md:order-2">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #cd5c5c, #8b0000)",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Júpiter */}
          <div
            id="jupiter"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:col-span-1">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #daa520, #b8860b)",
                  }}
                ></div>
              </div>
              <div className="md:col-span-2">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-orange-400 ${styles.glowText}`}
                >
                  Júpiter
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  O rei dos planetas, um gigante gasoso tão massivo que poderia
                  conter todos os outros planetas dentro de si.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 139.820 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 12 anos terrestres
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 9.9 horas
                    </p>
                    <p className="text-white">
                      <strong>Luas:</strong> Mais de 90
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> Sua Grande Mancha Vermelha é uma
                  tempestade colossal ativa há séculos.
                </p>
              </div>
            </div>
          </div>

          {/* Saturno */}
          <div
            id="saturno"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-yellow-200 ${styles.glowText}`}
                >
                  Saturno
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  A joia do Sistema Solar, famoso por seu deslumbrante sistema
                  de anéis de gelo e rocha.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 116.460 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 29 anos terrestres
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 10.7 horas
                    </p>
                    <p className="text-white">
                      <strong>Luas:</strong> Mais de 140
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> Saturno é o planeta menos denso;
                  se houvesse uma banheira grande o suficiente, ele flutuaria.
                </p>
              </div>
              <div className="flex justify-center items-center md:col-span-1 order-1 md:order-2">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #fad5a5, #daa520)",
                    }}
                  ></div>
                  <div
                    className="absolute top-1/2 left-1/2 w-[150%] h-[150%] border-8 border-yellow-200/60 rounded-full"
                    style={{
                      transform: "translate(-50%, -50%) rotateX(80deg)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Urano */}
          <div
            id="urano"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:col-span-1">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #4fd0e4, #00ced1)",
                  }}
                ></div>
              </div>
              <div className="md:col-span-2">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-cyan-400 ${styles.glowText}`}
                >
                  Urano
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  Este gigante de gelo se destaca por sua inclinação axial
                  extrema, fazendo com que ele gire "de lado".
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 50.724 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 84 anos terrestres
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 17.2 horas
                    </p>
                    <p className="text-white">
                      <strong>Temperatura:</strong> -224°C
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> É o planeta mais frio do Sistema
                  Solar.
                </p>
              </div>
            </div>
          </div>

          {/* Netuno */}
          <div
            id="netuno"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 mb-16 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-opacity-8 hover:border-opacity-20"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <h3
                  className={`font-orbitron text-4xl font-bold mb-4 text-blue-500 ${styles.glowText}`}
                >
                  Netuno
                </h3>
                <p className="mb-4 text-white text-opacity-80">
                  O mundo mais distante e ventoso do Sistema Solar, um gigante
                  de gelo de um azul vibrante.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Diâmetro:</strong> 49.244 km
                    </p>
                    <p className="text-white">
                      <strong>Período Orbital:</strong> 165 anos terrestres
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-white">
                      <strong>Duração do Dia:</strong> 16.1 horas
                    </p>
                    <p className="text-white">
                      <strong>Ventos:</strong> até 2.100 km/h
                    </p>
                  </div>
                </div>
                <p className="text-white text-opacity-80">
                  <strong>Curiosidade:</strong> Sua existência foi prevista
                  matematicamente antes de ser observado.
                </p>
              </div>
              <div className="flex justify-center md:col-span-1 order-1 md:order-2">
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #4169e1, #191970)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-black bg-opacity-60">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-orbitron text-4xl lg:text-6xl font-bold mb-5 text-white uppercase tracking-wider">
              Quiz Espacial
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mb-5 rounded"></div>
            <p className="text-lg text-white text-opacity-80">
              Teste seus conhecimentos sobre os planetas
            </p>
          </div>

          <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-10 backdrop-blur-md">
            {!showQuiz ? (
              <div className="text-center">
                <h3 className="font-orbitron text-3xl font-bold mb-6 text-white">
                  Pronto para o Desafio?
                </h3>
                <p className="text-lg mb-8 text-white text-opacity-80">
                  Responda perguntas sobre os planetas do Sistema Solar
                </p>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-200 text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-white/30 hover:-translate-y-1"
                >
                  <i className="fas fa-play"></i>
                  <span>Iniciar Quiz</span>
                </button>
              </div>
            ) : (
              <div>
                {!quizFinished ? (
                  <>
                    <h3 className="text-2xl font-bold mb-8 text-white">
                      {questions[currentQuestionIndex].question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {questions[currentQuestionIndex].answers.map(
                        (answer, index) => (
                          <button
                            key={index}
                            onClick={() => selectAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={`p-4 rounded-xl font-medium text-left transition-all ${
                              selectedAnswer === null
                                ? "bg-white bg-opacity-10 border border-white border-opacity-20 text-white hover:bg-opacity-20 hover:border-opacity-40"
                                : selectedAnswer === index
                                ? answer.correct
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "bg-red-500 border-red-500 text-white"
                                : answer.correct
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-white bg-opacity-10 border border-white border-opacity-20 text-white opacity-50"
                            }`}
                          >
                            {answer.text}
                          </button>
                        )
                      )}
                    </div>
                    {showNext && (
                      <div className="text-center">
                        <button
                          onClick={nextQuestion}
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-200 text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-white/30 hover:-translate-y-1"
                        >
                          <i className="fas fa-arrow-right"></i>
                          <span>Próxima</span>
                        </button>
                      </div>
                    )}
                    <div className="text-center mt-6 text-white text-opacity-80">
                      Pontuação: {score}/{questions.length}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-6 text-white">
                      Quiz Concluído!
                    </h3>
                    <p className="text-xl mb-8 text-white text-opacity-80">
                      Você acertou {score} de {questions.length} perguntas.
                    </p>
                    <button
                      onClick={restartQuiz}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-200 text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-white/30 hover:-translate-y-1"
                    >
                      <i className="fas fa-redo"></i>
                      <span>Recomeçar</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Planetas;
