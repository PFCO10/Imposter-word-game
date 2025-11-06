/* =======================
   Impostor Word Game v1.1
   Features:
   - categories
   - duration selector + timer
   - 1 or 2 impostors (2 only if players >= 5)
   - enable/disable hints toggle for impostors
   - preview/confirm screen
   - per-player reveal with spoiler button
   - results screen
   ======================= */

/* ------------------------------
   WORD DATABASE (categories)
   ------------------------------ */
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

/* utility: flatten all categories */
function getAllWordsArray(){
  return Object.values(CATEGORIES).flat();
}

/* ------------------------------
   DOM elements
   ------------------------------ */
const numPlayersInput = document.getElementById("numPlayers");
const numImpostorsSelect = document.getElementById("numImpostors");
const impostorWarning = document.getElementById("impostorWarning");
const categorySelect = document.getElementById("categorySelect");
const durationSelect = document.getElementById("durationSelect");
const enableHintsCheckbox = document.getElementById("enableHints");

const previewBtn = document.getElementById("previewBtn");
const confirmPanel = document.getElementById("confirm");
const setupPanel = document.getElementById("setup");
const summaryDiv = document.getElementById("summary");
const backToSetupBtn = document.getElementById("backToSetup");
const startGameBtn = document.getElementById("startGame");

const gamePanel = document.getElementById("game");
const playerTitle = document.getElementById("playerTitle");
const secretCard = document.getElementById("secretCard");
const secretText = document.getElementById("secretText");
const toggleWordBtn = document.getElementById("toggleWord");
const nextPlayerBtn = document.getElementById("nextPlayer");
const afterAllDiv = document.getElementById("afterAll");
const startRoundBtn = document.getElementById("startRound");
const showResultsBtn = document.getElementById("showResults");

const resultsPanel = document.getElementById("results");
const resultsText = document.getElementById("resultsText");
const playAgainBtn = document.getElementById("playAgain");

const progressFill = document.getElementById("progressFill");
const timeLeftEl = document.getElementById("timeLeft");
const timerLabel = document.getElementById("timerLabel");

/* ------------------------------
   state
   ------------------------------ */
let players = [];
let currentPlayer = 0;
let impostorIndexes = [];
let chosenPair = null; // {word, hint}
let wordsPool = [];
let durationSeconds = 90;
let timerInterval = null;
let timeRemaining = 0;

/* ------------------------------
   validation: limit impostors
   ------------------------------ */
numPlayersInput.addEventListener("input", checkImpostorLimit);
numImpostorsSelect.addEventListener("change", checkImpostorLimit);
function checkImpostorLimit(){
  const numPlayers = parseInt(numPlayersInput.value) || 0;
  const selected = parseInt(numImostorsSafe()) || 1;
  if(numPlayers < 5 && selected === 2){
    impostorWarning.classList.remove("hidden");
    numImpostorsSelect.value = "1";
  } else {
    impostorWarning.classList.add("hidden");
  }
}
function numImostorsSafe(){ return numImpostorsSelect.value; }

/* ------------------------------
   preview / confirm screen
   ------------------------------ */
previewBtn.addEventListener("click", () => {
  const np = parseInt(numPlayersInput.value) || 4;
  const ni = parseInt(numImostorsSelect.value) || 1;
  const cat = categorySelect.value;
  const dur = parseInt(durationSelect.value) || 90;
  const hints = enableHintsCheckbox.checked;

  // enforce rule: if <5 players, force 1 impostor
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

/* back & start from confirm */
backToSetupBtn.addEventListener("click", () => {
  confirmPanel.classList.add("hidden");
  setupPanel.classList.remove("hidden");
});

/* ------------------------------
   start game
   ------------------------------ */
startGameBtn.addEventListener("click", () => {
  const np = parseInt(numPlayersInput.value) || 4;
  let ni = parseInt(numImpostorsSelect.value) || 1;
  const cat = categorySelect.value;
  durationSeconds = parseInt(durationSelect.value) || 90;
  const hintsEnabled = enableHintsCheckbox.checked;

  // enforce rule about impostors
  if(np < 5 && ni === 2) { ni = 1; }

  // choose words pool based on category
  if(cat === "aleatorio"){
    wordsPool = shuffleArray(getAllWordsArray());
  } else {
    wordsPool = shuffleArray(CATEGORIES[cat].slice());
  }

  // choose a (single) chosenPair for whole round (word + hint)
  chosenPair = wordsPool[Math.floor(Math.random() * wordsPool.length)];

  // init players & impostors
  players = Array.from({length: np}, (_,i) => i);
  impostorIndexes = [];
  while(impostorIndexes.length < ni){
    const r = Math.floor(Math.random() * np);
    if(!impostorIndexes.includes(r)) impostorIndexes.push(r);
  }

  // set flags on DOM for later (store in dataset)
  gamePanel.dataset.hintsEnabled = hintsEnabled ? "1" : "0";

  // reset state
  currentPlayer = 0;

  // show game panel
  confirmPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  gamePanel.classList.add("slide");
  afterAllDiv.classList.add("hidden");
  showPlayer();
});

/* ------------------------------
   per-player reveal flow
   ------------------------------ */
function showPlayer(){
  playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
  secretCard.classList.add("hidden");
  toggleWordBtn.classList.remove("hidden");
  nextPlayerBtn.classList.add("hidden");
  secretText.innerHTML = "";
  // reset toggle text
  toggleWordBtn.textContent = "👁️ Mostrar palabra";
}

/* toggle secret (spoiler-like) */
toggleWordBtn.addEventListener("click", () => {
  const hintsEnabled = gamePanel.dataset.hintsEnabled === "1";
  // show card
  if(secretCard.classList.contains("hidden")){
    secretCard.classList.remove("hidden");
    secretCard.classList.add("fade");
    // show content depending if impostor
    if(impostorIndexes.includes(currentPlayer)){
      // impostor
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
    // hide
    secretCard.classList.add("hidden");
    toggleWordBtn.textContent = "👁️ Mostrar palabra";
  }
  nextPlayerBtn.classList.remove("hidden");
});

/* next player click */
nextPlayerBtn.addEventListener("click", () => {
  // hide card and go to next
  secretCard.classList.add("hidden");
  toggleWordBtn.textContent = "👁️ Mostrar palabra";
  currentPlayer++;
  if(currentPlayer < players.length){
    // animate title change slightly
    playerTitle.classList.remove("fade"); void playerTitle.offsetWidth; playerTitle.classList.add("fade");
    playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
  } else {
    // all players done -> show afterAll
    playerTitle.textContent = "Todos los jugadores han visto su rol 🎬";
    afterAllDiv.classList.remove("hidden");
    // show pre-round texts
    document.getElementById("preRoundText").textContent = "Prepárense para la fase de pistas. Cuando estén listos, inicien el temporizador.";
    toggleWordBtn.classList.add("hidden");
    nextPlayerBtn.classList.add("hidden");
    startRoundBtn.classList.remove("hidden");
    // reset progress bar to full
    progressFill.style.width = "100%";
    timeLeftEl.textContent = formatTime(durationSeconds);
  }
});

/* ------------------------------
   discussion / timer
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
      // auto show results when time's up
      showFinalResults();
    }
  }, 1000);
}
function updateProgress(){
  const pct = Math.max(0, (timeRemaining / durationSeconds) * 100);
  progressFill.style.width = pct + "%";
  timeLeftEl.textContent = formatTime(timeRemaining);
}

/* ------------------------------
   results
   ------------------------------ */
showResultsBtn.addEventListener("click", () => {
  // stop timer if running
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

/* play again */
playAgainBtn.addEventListener("click", () => location.reload());

/* ------------------------------
   helpers
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

/* make sure UI initial state is correct */
checkImpostorLimit();
