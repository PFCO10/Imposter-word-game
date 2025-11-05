const words = [
  { word: "nevera", hint: "electrodoméstico" },
  { word: "volcán", hint: "lugar natural" },
  { word: "guitarra", hint: "instrumento musical" },
  { word: "astronauta", hint: "profesión" },
  { word: "pizza", hint: "comida" },
  { word: "playa", hint: "lugar al aire libre" },
  { word: "robot", hint: "tecnología" },
  { word: "león", hint: "animal" },
];

let players = [];
let currentPlayer = 0;
let secretWord, hint, impostorIndex;

const setup = document.getElementById("setup");
const game = document.getElementById("game");
const playerTitle = document.getElementById("playerTitle");
const secretCard = document.getElementById("secretCard");
const secretText = document.getElementById("secretText");
const toggleWord = document.getElementById("toggleWord");
const nextPlayer = document.getElementById("nextPlayer");
const startRound = document.getElementById("startRound");
const restart = document.getElementById("restart");

document.getElementById("startGame").addEventListener("click", startGame);
toggleWord.addEventListener("click", toggleSecret);
nextPlayer.addEventListener("click", showNextPlayer);
restart.addEventListener("click", () => location.reload());
startRound.addEventListener("click", () => {
  playerTitle.textContent = "¡Comienza la ronda!";
  secretCard.classList.add("slide");
  secretCard.innerHTML = `<p>🗣️ Ahora cada jugador debe dar una pista sobre su palabra (sin decirla directamente).</p>`;
  toggleWord.classList.add("hidden");
  nextPlayer.classList.add("hidden");
  startRound.classList.add("hidden");
  restart.classList.remove("hidden");
});

function startGame() {
  const numPlayers = parseInt(document.getElementById("numPlayers").value);
  const random = words[Math.floor(Math.random() * words.length)];

  secretWord = random.word;
  hint = random.hint;
  impostorIndex = Math.floor(Math.random() * numPlayers);
  players = Array.from({ length: numPlayers }, (_, i) => i);

  setup.classList.add("hidden");
  game.classList.remove("hidden");
  showPlayer();
}

function showPlayer() {
  playerTitle.textContent = `Jugador ${currentPlayer + 1}`;
  secretCard.classList.add("hidden");
  toggleWord.classList.remove("hidden");
  nextPlayer.classList.add("hidden");
  startRound.classList.add("hidden");
  secretCard.classList.remove("slide");
}

function toggleSecret() {
  secretCard.classList.toggle("hidden");
  secretCard.classList.add("fade");

  if (!secretCard.classList.contains("hidden")) {
    if (currentPlayer === impostorIndex) {
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
