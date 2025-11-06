// script.js - versión con inicialización segura y logs de depuración

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo — inicializando juego");

  /* =======================
     Base de palabras (igual que antes)
     ======================= */
  const CATEGORIES = {
    comida: [
      { word: "pizza", hint: "comida italiana" },
      { word: "hamburguesa", hint: "comida rápida" },
      { word: "helado", hint: "postre frío" },
      { word: "sopa", hint: "se toma con cuchara" },
      { word: "pan", hint: "se hornea" },
      { word: "arroz", hint: "grano comestible" },
      { word: "queso", hint: "producto lácteo" },
      { word: "ensalada", hint: "fresco y verde" }
    ],
    animales: [
      { word: "gato", hint: "mascota" },
      { word: "perro", hint: "amigo fiel" },
      { word: "elefante", hint: "animal grande" },
      { word: "tiburón", hint: "marino" },
      { word: "loro", hint: "colorido" },
      { word: "serpiente", hint: "reptil" },
      { word: "delfín", hint: "inteligente" },
      { word: "camello", hint: "desierto" }
    ],
    lugares: [
      { word: "playa", hint: "arena" },
      { word: "montaña", hint: "naturaleza" },
      { word: "desierto", hint: "seco y caliente" },
      { word: "biblioteca", hint: "libros" },
      { word: "escuela", hint: "estudiantes" },
      { word: "aeropuerto", hint: "viajes" },
      { word: "estadio", hint: "deportes" },
      { word: "parque", hint: "verde y público" }
    ],
    objetos: [
      { word: "llave", hint: "metal" },
      { word: "cuchara", hint: "utensilio" },
      { word: "telefono", hint: "comunicación" },
      { word: "linterna", hint: "luz" },
      { word: "libro", hint: "leer" },
      { word: "reloj", hint: "tiempo" },
      { word: "ordenador", hint: "tecnología" },
      { word: "mochila", hint: "llevar cosas" }
    ],
    profesiones: [
      { word: "medico", hint: "salud" },
      { word: "policia", hint: "autoridad" },
      { word: "astronauta", hint: "espacio" },
      { word: "profesor", hint: "enseña" },
      { word: "carpintero", hint: "madera" },
      { word: "piloto", hint: "avión" },
      { word: "cocinero", hint: "comida" },
      { word: "enfermero", hint: "cuidado" }
    ],
    naturaleza: [
      { word: "arbol", hint: "hojas" },
      { word: "rio", hint: "agua" },
      { word: "volcan", hint: "montaña caliente" },
      { word: "flor", hint: "colorida" },
      { word: "nube", hint: "cielo" },
      { word: "viento", hint: "aire" },
      { word: "fuego", hint: "calor" },
      { word: "bosque", hint: "árboles" }
    ],
    tecnologia: [
      { word: "robot", hint: "máquina" },
      { word: "ordenador", hint: "digital" },
      { word: "internet", hint: "red" },
      { word: "camara", hint: "imagen" },
      { word: "dron", hint: "vuelo" },
      { word: "impresora", hint: "papel" },
      { word: "microchip", hint: "pequeño" },
      { word: "smartphone", hint: "móvil" }
    ]
  };

  function getAllWordsArray(){ return Object.values(CATEGORIES).flat(); }

  /* ------------------------------
     DOM references (seguras)
     ------------------------------ */
  const $ = id => document.getElementById(id);
  const numPlayersInput = $("numPlayers");
  const numImpostorsSelect = $("numImpostors");
  const impostorWarning = $("impostorWarning");
  const categorySelect = $("categorySelect");
  const durationSelect = $("durationSelect");
  const enableHintsCheckbox = $("enableHints");

  const previewBtn = $("previewBtn");
  const confirmPanel = $("confirm");
  const setupPanel = $("setup");
  const summaryDiv = $("summary");
  const backToSetupBtn = $("backToSetup");
  const startGameBtn = $("startGame");

  const gamePanel = $("game");
  const playerTitle = $("playerTitle");
  const secretCard = $("secretCard");
  const secretText = $("secretText");
  const toggleWordBtn = $("toggleWord");
  const nextPlayerBtn = $("nextPlayer");
  const afterAllDiv = $("afterAll");
  const startRoundBtn = $("startRound");
  const showResultsBtn = $("showResults");

  const resultsPanel = $("results");
  const resultsText = $("resultsText");
  const playAgainBtn = $("playAgain");

  const progressFill = $("progressFill");
  const timeLeftEl = $("timeLeft");

  // sanity-check DOM
  if(!previewBtn || !startGameBtn || !numPlayersInput){
    console.error("Elementos esenciales no encontrados. ID's comprobados: previewBtn, startGame, numPlayers");
    return; // no seguimos si faltan elementos clave
  }

  /* ------------------------------
     estado interno
     ------------------------------ */
  let players = [];
  let currentPlayer = 0;
  let impostorIndexes = [];
  let chosenPair = null;
  let wordsPool = [];
  let durationSeconds = 90;
  let timerInterval = null;
  let timeRemaining = 0;

  /* ------------------------------
     validación impostores
     ------------------------------ */
  numPlayersInput.addEventListener("input", checkImpostorLimit);
  numImpostorsSelect.addEventListener("change", checkImpostorLimit);

  function checkImpostorLimit(){
    const numPlayers = parseInt(numPlayersInput.value) || 0;
    const selected = parseInt(numImpostorsSelect.value) || 1;
    if(numPlayers < 5 && selected === 2){
      impostorWarning.classList.remove("hidden");
      numImpostorsSelect.value = "1";
    } else {
      impostorWarning.classList.add("hidden");
    }
  }

  /* ------------------------------
     preview / confirm handlers
     ------------------------------ */
  previewBtn.addEventListener("click", () => {
    console.log("Preview clicado");
    const np = parseInt(numPlayersInput.value) || 4;
    const ni = parseInt(numImpostorsSelect.value) || 1;
    const cat = categorySelect.value;
    const dur = parseInt(durationSelect.value) || 90;
    const hints = enableHintsCheckbox.checked;

    let effectiveImpostors = ni;
    if(np < 5 && ni === 2){ effectiveImpostors = 1; }

    summaryDiv.innerHTML = `
      <p><strong>Jugadores:</strong> ${np}</p>
      <p><strong>Impostores:</strong> ${effectiveImpostors}</p>
      <p><strong>Categoría:</strong> ${cat === 'aleatorio' ? 'Aleatorio' : capitalize(cat)}</p>
      <p><strong>Duración:</strong> ${dur} segundos</p>
      <p><strong>Mostrar pistas a impostores:</strong> ${hints ? 'Sí' : 'No'}</p>
    `;
    setupPanel.classList.add("hidden");
    confirmPanel.classList.remove("hidden");
  });

  backToSetupBtn.addEventListener("click", () => {
    confirmPanel.classList.add("hidden");
    setupPanel.classList.remove("hidden");
  });

  /* ------------------------------
     iniciar partida desde confirm
     ------------------------------ */
  startGameBtn.addEventListener("click", () => {
    console.log("Iniciar partida — click confirmado");
    const np = parseInt(numPlayersInput.value) || 4;
    let ni = parseInt(numImpostorsSelect.value) || 1;
    const cat = categorySelect.value;
    durationSeconds = parseInt(durationSelect.value) || 90;
    const hintsEnabled = enableHintsCheckbox.checked;

    if(np < 5 && ni === 2) { ni = 1; }

    if(cat === "aleatorio"){
      wordsPool = shuffleArray(getAllWordsArray());
    } else {
      const list = CATEGORIES[cat];
      if(!list || !list.length){
        wordsPool = shuffleArray(getAllWordsArray());
      } else {
        wordsPool = shuffleArray(list.slice());
      }
    }

    chosenPair = wordsPool[Math.floor(Math.random() * wordsPool.length)];

    players = Array.from({length: np}, (_,i) => i);
    impostorIndexes = [];
    while(impostorIndexes.length < ni){
      const r = Math.floor(Math.random() * np);
      if(!impostorIndexes.includes(r)) impostorIndexes.push(r);
    }

    gamePanel.dataset.hintsEnabled = hintsEnabled ? "1" : "0";
    currentPlayer = 0;

    confirmPanel.classList.add("hidden");
    gamePanel.classList.remove("hidden");
    gamePanel.classList.add("slide");
    afterAllDiv.classList.add("hidden");
    showPlayer();
  });

  /* ------------------------------
     flujo por jugador
     ------------------------------ */
  function showPlayer(){
    playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
    secretCard.classList.add("hidden");
    toggleWordBtn.classList.remove("hidden");
    nextPlayerBtn.classList.add("hidden");
    secretText.innerHTML = "";
    toggleWordBtn.textContent = "👁️ Mostrar palabra";
  }

  toggleWordBtn.addEventListener("click", () => {
    const hintsEnabled = gamePanel.dataset.hintsEnabled === "1";
    if(secretCard.classList.contains("hidden")){
      secretCard.classList.remove("hidden");
      secretCard.classList.add("fade");
      if(impostorIndexes.includes(currentPlayer)){
        if(hintsEnabled){
          secretText.innerHTML = `<strong>PISTA GENERAL:</strong> ${escapeHtml(chosenPair.hint)}`;
        } else {
          secretText.innerHTML = `<strong>ERES EL IMPOSTOR.</strong> No conoces la palabra. Intenta improvisar según la conversación.`;
        }
      } else {
        secretText.innerHTML = `<strong>PALABRA SECRETA:</strong> ${escapeHtml(chosenPair.word)}`;
      }
      toggleWordBtn.textContent = "🙈 Ocultar palabra";
    } else {
      secretCard.classList.add("hidden");
      toggleWordBtn.textContent = "👁️ Mostrar palabra";
    }
    nextPlayerBtn.classList.remove("hidden");
  });

  nextPlayerBtn.addEventListener("click", () => {
    secretCard.classList.add("hidden");
    toggleWordBtn.textContent = "👁️ Mostrar palabra";
    currentPlayer++;
    if(currentPlayer < players.length){
      playerTitle.classList.remove("fade"); void playerTitle.offsetWidth; playerTitle.classList.add("fade");
      playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
    } else {
      playerTitle.textContent = "Todos los jugadores han visto su rol 🎬";
      afterAllDiv.classList.remove("hidden");
      const pre = $("preRoundText");
      if(pre) pre.textContent = "Prepárense para la fase de pistas. Cuando estén listos, inicien el temporizador.";
      toggleWordBtn.classList.add("hidden");
      nextPlayerBtn.classList.add("hidden");
      startRoundBtn.classList.remove("hidden");
      if(progressFill) progressFill.style.width = "100%";
      if(timeLeftEl) timeLeftEl.textContent = formatTime(durationSeconds);
    }
  });

  /* ------------------------------
     temporizador y resultados
     ------------------------------ */
  startRoundBtn.addEventListener("click", () => {
    startRoundBtn.classList.add("hidden");
    showResultsBtn.classList.remove("hidden");
    runTimer(durationSeconds);
  });

  function runTimer(seconds){
    clearInterval(timerInterval);
    timeRemaining = seconds;
    updateProgress();
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateProgress();
      if(timeRemaining <= 0){
        clearInterval(timerInterval);
        timeRemaining = 0;
        updateProgress();
        showFinalResults();
      }
    }, 1000);
  }
  function updateProgress(){
    if(!progressFill || !timeLeftEl) return;
    const pct = Math.max(0, (timeRemaining / durationSeconds) * 100);
    progressFill.style.width = pct + "%";
    timeLeftEl.textContent = formatTime(timeRemaining);
  }

  showResultsBtn.addEventListener("click", () => {
    if(timerInterval) clearInterval(timerInterval);
    showFinalResults();
  });

  function showFinalResults(){
    gamePanel.classList.add("hidden");
    resultsPanel.classList.remove("hidden");
    const impostorList = impostorIndexes.map(i => `Jugador ${i+1}`).join(", ");
    resultsText.innerHTML = `
      <p><strong>🔤 Palabra secreta:</strong> ${escapeHtml(chosenPair.word)}</p>
      <p><strong>🕵️ Impostor(es):</strong> ${impostorList}</p>
      <p style="margin-top:10px;">Gracias por jugar — si quieres otra ronda, pulsa <strong>Nueva partida</strong>.</p>
    `;
  }

  playAgainBtn.addEventListener("click", () => location.reload());

  /* ------------------------------
     util helpers
     ------------------------------ */
  function shuffleArray(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
  function formatTime(sec){
    const s = Math.max(0, Math.floor(sec));
    return `${s}s`;
  }
  function escapeHtml(str){
    return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  }

  /* inicial */
  checkImpostorLimit();
  console.log("Inicialización completa.");
});
