const words = [
  { word: "nevera", hint: "electrodoméstico" },
  { word: "volcán", hint: "lugar natural" },
  { word: "guitarra", hint: "instrumento musical" },
  { word: "astronauta", hint: "profesión" },
  { word: "pizza", hint: "comida" },
  { word: "playa", hint: "lugar al aire libre" },
];

let players = [];
let currentPlayer = 0;
let secretWord, hint, impostorIndex;

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("nextPlayer").addEventListener("click", nextPlayer);
document.getElementById("restart").addEventListener("click", () => location.reload());

function startGame() {
  const numPlayers = parseInt(document.getElementById("numPlayers").value);
  const random = words[Math.floor(Math.random() * words.length)];

  secretWord = random.word;
  hint = random.hint;
  impostorIndex = Math.floor(Math.random() * numPlayers);
  players = Array.from({ length: numPlayers }, (_, i) => i);

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  showPlayerInfo();
}

function showPlayerInfo() {
  const playerTitle = document.getElementById("playerTitle");
  const secretInfo = document.getElementById("secretInfo");
  const nextBtn = document.getElementById("nextPlayer");
  const restartBtn = document.getElementById("restart");

  if (currentPlayer < players.length) {
    playerTitle.textContent = `Jugador ${currentPlayer + 1}`;

    // Texto de relleno largo
    let fillerText = "";
    for (let i = 0; i < 35; i++) {
      fillerText +=
        "Este texto no contiene información útil, solo sirve para evitar trampas al desplazarse hacia arriba. " +
        "Imagina sonidos de fondo, luces, conversaciones triviales y pensamientos aleatorios que llenan el espacio del mensaje. ";
    }

    if (currentPlayer === impostorIndex) {
      secretInfo.innerHTML = `<strong>PISTA GENERAL:</strong> ${hint}<br><br>${fillerText}`;
    } else {
      secretInfo.innerHTML = `<strong>PALABRA SECRETA:</strong> ${secretWord}<br><br>${fillerText}`;
    }

    currentPlayer++;
  } else {
    playerTitle.textContent = "Todos los jugadores han visto su información.";
    secretInfo.textContent = "¡Que empiece la ronda de descripciones!";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  }
}

function nextPlayer() {
  showPlayerInfo();
}
