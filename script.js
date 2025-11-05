const words = [
  { word: "volcán", hint: "lugar natural" },
  { word: "pizza", hint: "comida" },
  { word: "astronauta", hint: "profesión" },
  { word: "robot", hint: "tecnología" },
  { word: "nieve", hint: "fenómeno meteorológico" },
  { word: "castillo", hint: "estructura antigua" },
  { word: "sirena", hint: "criatura mítica" },
  { word: "fútbol", hint: "deporte" },
  { word: "biblioteca", hint: "lugar con libros" },
  { word: "tiburón", hint: "animal marino" },
  { word: "bruja", hint: "personaje mágico" },
  { word: "radio", hint: "medio de comunicación" },
  { word: "tren", hint: "transporte" },
  { word: "planeta", hint: "cuerpo celeste" },
  { word: "sol", hint: "estrella" },
  { word: "dinosaurio", hint: "animal extinto" },
  { word: "payaso", hint: "personaje de circo" },
  { word: "mariposa", hint: "insecto colorido" },
  { word: "hospital", hint: "institución" },
  { word: "león", hint: "animal" },
];

let players = [];
let currentPlayer = 0;
let impostorIndexes = [];
let secretWord, hint;

const numPlayersInput = document.getElementById("numPlayers");
const numImpostorsSelect = document.getElementById("numImpostors");
const impostorWarning = document.getElementById("impostorWarning");

numPlayersInput.addEventListener("input", checkImpostorLimit);
numImpostorsSelect.addEventListener("change", checkImpostorLimit);

function checkImpostorLimit() {
  const numPlayers = parseInt(numPlayersInput.value);
  const impostors = parseInt(numImpostorsSelect.value);

  if (numPlayers < 5 && impostors === 2) {
    impostorWarning.classList.remove("hidden");
    numImpostorsSelect.value = "1";
  } else {
    impostorWarning.classList.add("hidden");
  }
}

/* === ELEMENTOS === */
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const results = document.getElementById("results");
const playerTitle = document.getElementById("playerTitle");
const secretCard = document.getElementById("secretCard");
const secretText = document.getElementById("secretText");
const toggleWord = document.getElementById("toggleWord");
const nextPlayer = document.getElementById("nextPlayer");
const startRound = document.getElementById("startRound");
const showResults = document.getElementById("showResults");
const restart = document.getElementById("restart");
const resultsText = document.getElementById("resultsText");

document.getElementById("startGame").addEventListener("click", startGame);
toggleWord.addEventListener("click", toggleSecret);
nextPlayer.addEventListener("click", showNextPlayer);
startRound.addEventListener("click", startDiscussion);
showResults.addEventListener("click", showFinalResults);
restart.addEventListener("click", () => location.reload());
document.getElementById("playAgain").addEventListener("click", () => location.reload());

/* === INICIO === */
function startGame() {
  const numPlayers = parseInt(numPlayersInput.value);
  const numImpostors = parseInt(numImpostorsSelect.value);
  const random = words[Math.floor(Math.random() * words.length)];

  secretWord = random.word;
  hint = random.hint;

  players = Array.from({ length: numPlayers }, (_, i) => i);

  impostorIndexes = [];
  while (impostorIndexes.length < numImpostors) {
    const rand = Math.floor(Math.random() * numPlayers);
    if (!impostorIndexes.includes(rand)) impostorIndexes.push(rand);
  }

  setup.classList.add("hidden");
  game.classList.remove("hidden");
  game.classList.add("slide");

  showPlayer();
}

function showPlayer() {
  playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
  secretCard.classList.add("hidden");
  toggleWord.classList.remove("hidden");
  nextPlayer.classList.add("hidden");
  startRound.classList.add("hidden");
}

function toggleSecret() {
  secretCard.classList.toggle("hidden");
  secretCard.classList.add("fade");

  if (!secretCard.classList.contains("hidden")) {
    if (impostorIndexes.includes(currentPlayer)) {
      secretText.innerHTML = `<strong>PISTA GENERAL:</strong> ${hint}`;
    } else {
      secretText.innerHTML = `<strong>PALABRA SECRETA:</strong> ${secretWord}`;
    }
    toggleWord.textContent = "🙈 Ocultar palabra";
  } else {
    toggleWord.textContent = "👁️ Mostrar palabra";
  }

  nextPlayer.classList.remove("hidden");
}

function showNextPlayer() {
  secretCard.classList.add("hidden");
  toggleWord.textContent = "👁️ Mostrar palabra";

  currentPlayer++;

  if (currentPlayer < players.length) {
    playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
    secretCard.classList.add("slide");
  } else {
    playerTitle.textContent = "Todos los jugadores han visto su rol 🎬";
    secretText.textContent = "Prepárense para la fase de pistas.";
    secretCard.classList.remove("hidden");
    toggleWord.classList.add("hidden");
    nextPlayer.classList.add("hidden");
    startRound.classList.remove("hidden");
  }
}

function startDiscussion() {
  playerTitle.textContent = "🗣️ Fase de Pistas";
  secretText.innerHTML =
    "Cada jugador debe dar una pista sobre su palabra sin decirla directamente. Luego voten quién creen que es el impostor.";
  startRound.classList.add("hidden");
  showResults.classList.remove("hidden");
}

function showFinalResults() {
  game.classList.add("hidden");
  results.classList.remove("hidden");

  const impostorList = impostorIndexes.map(i => `Jugador ${i + 1}`).join(", ");

  resultsText.innerHTML = `
    🔤 <strong>Palabra secreta:</strong> ${secretWord}<br>
    🕵️ <strong>Impostor(es):</strong> ${impostorList}<br><br>
    ¡Gracias por jugar! 🎉
  `;
}
