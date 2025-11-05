const words = [
  { word: "nevera", hint: "electrodoméstico" },
  { word: "volcán", hint: "lugar natural" },
  { word: "guitarra", hint: "instrumento musical" },
  { word: "astronauta", hint: "profesión" },
  { word: "pizza", hint: "comida" },
  { word: "playa", hint: "lugar al aire libre" },
  { word: "robot", hint: "tecnología" },
  { word: "león", hint: "animal" },
  { word: "biblioteca", hint: "lugar con libros" },
  { word: "fútbol", hint: "deporte" },
  { word: "diamante", hint: "gema" },
  { word: "avión", hint: "transporte" },
  { word: "castillo", hint: "construcción antigua" },
  { word: "bosque", hint: "entorno natural" },
  { word: "montaña", hint: "paisaje" },
  { word: "micrófono", hint: "objeto de escenario" },
  { word: "nieve", hint: "fenómeno meteorológico" },
  { word: "helado", hint: "postre frío" },
  { word: "reloj", hint: "objeto cotidiano" },
  { word: "sirena", hint: "criatura mítica" },
  { word: "dinosaurio", hint: "animal extinto" },
  { word: "hospital", hint: "institución" },
  { word: "murciélago", hint: "animal nocturno" },
  { word: "radio", hint: "medio de comunicación" },
  { word: "televisión", hint: "aparato electrónico" },
  { word: "caracol", hint: "animal lento" },
  { word: "semáforo", hint: "objeto urbano" },
  { word: "tren", hint: "medio de transporte" },
  { word: "libélula", hint: "insecto" },
  { word: "mapa", hint: "herramienta geográfica" },
  { word: "reptil", hint: "categoría animal" },
  { word: "espacio", hint: "concepto científico" },
  { word: "luna", hint: "astro" },
  { word: "sol", hint: "estrella" },
  { word: "planeta", hint: "cuerpo celeste" },
  { word: "camisa", hint: "ropa" },
  { word: "vampiro", hint: "ser de fantasía" },
  { word: "bruja", hint: "figura mágica" },
  { word: "payaso", hint: "personaje de circo" },
  { word: "mariposa", hint: "insecto colorido" },
  { word: "tiburón", hint: "animal marino" },
  { word: "estrella", hint: "objeto del cielo" },
];

let players = [];
let currentPlayer = 0;
let secretWord, hint, impostorIndex;

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

function startDiscussion() {
  playerTitle.textContent = "🗣️ Fase de Pistas";
  secretText.innerHTML =
    "Cada jugador debe decir una palabra o pista relacionada con su palabra (sin decirla). Después, voten quién creen que es el impostor.";
  startRound.classList.add("hidden");
  showResults.classList.remove("hidden");
}

function showFinalResults() {
  game.classList.add("hidden");
  results.classList.remove("hidden");

  resultsText.innerHTML = `
    🔤 <strong>Palabra secreta:</strong> ${secretWord}<br>
    🕵️ <strong>El impostor era:</strong> Jugador ${impostorIndex + 1}<br><br>
    ¡Gracias por jugar! 🎉
  `;
}
