// script.js - versión con inicialización segura y logs de depuración

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo — inicializando juego");

/* ===========================
   BLOQUE 1 — BASE DE PALABRAS
   (categorías ampliadas, >=20 items c/u)
   =========================== */
const CATEGORIES = {
  comida: [
    { word: "pizza", hint: "comida italiana" },
    { word: "hamburguesa", hint: "comida rápida" },
    { word: "helado", hint: "postre frío" },
    { word: "sopa", hint: "se toma con cuchara" },
    { word: "pan", hint: "se hornea" },
    { word: "arroz", hint: "grano comestible" },
    { word: "queso", hint: "producto lácteo" },
    { word: "ensalada", hint: "fresco y verde" },
    { word: "tortilla", hint: "plato a base de huevo" },
    { word: "sushi", hint: "comida japonesa" },
    { word: "pasta", hint: "plato hecho con harina" },
    { word: "pollo", hint: "carne blanca" },
    { word: "pescado", hint: "alimento del mar" },
    { word: "chocolate", hint: "dulce popular" },
    { word: "galleta", hint: "pequeño y crujiente" },
    { word: "café", hint: "bebida estimulante" },
    { word: "té", hint: "infusión caliente" },
    { word: "mantequilla", hint: "grasa para cocinar" },
    { word: "mermelada", hint: "dulce para untar" },
    { word: "croissant", hint: "bollería hojaldrada" }
  ],

  animales: [
    { word: "gato", hint: "mascota común" },
    { word: "perro", hint: "mejor amigo del hombre" },
    { word: "elefante", hint: "animal grande" },
    { word: "tiburón", hint: "depredador marino" },
    { word: "loro", hint: "ave que puede repetir" },
    { word: "serpiente", hint: "reptil sin patas" },
    { word: "delfín", hint: "mamífero marino inteligente" },
    { word: "camello", hint: "animal del desierto" },
    { word: "caballo", hint: "usado para montar" },
    { word: "vaca", hint: "produce leche" },
    { word: "cerdo", hint: "animal de granja" },
    { word: "oveja", hint: "lana" },
    { word: "ardilla", hint: "roedor de árboles" },
    { word: "mapache", hint: "animal con máscara" },
    { word: "ciervo", hint: "cornamenta" },
    { word: "búho", hint: "ave nocturna" },
    { word: "mariposa", hint: "insecto colorido" },
    { word: "abeja", hint: "produce miel" },
    { word: "pingüino", hint: "ave que no vuela" },
    { word: "gallina", hint: "pone huevos" }
  ],

  lugares: [
    { word: "playa", hint: "arena" },
    { word: "montaña", hint: "naturaleza elevada" },
    { word: "desierto", hint: "seco y caluroso" },
    { word: "biblioteca", hint: "lugar con libros" },
    { word: "escuela", hint: "centro de aprendizaje" },
    { word: "aeropuerto", hint: "viajes por avión" },
    { word: "estadio", hint: "eventos deportivos" },
    { word: "parque", hint: "zona verde pública" },
    { word: "restaurante", hint: "donde se come fuera" },
    { word: "hospital", hint: "cuidados médicos" },
    { word: "museo", hint: "exposiciones culturales" },
    { word: "iglesia", hint: "edificación religiosa" },
    { word: "puerto", hint: "entrada al mar para barcos" },
    { word: "campamento", hint: "zona para tiendas" },
    { word: "ciudad", hint: "zona urbana" },
    { word: "isla", hint: "tierra rodeada de agua" },
    { word: "aldea", hint: "población pequeña" },
    { word: "teatro", hint: "espectáculos en vivo" },
    { word: "estación", hint: "transporte público" },
    { word: "jardín", hint: "plantas y flores" }
  ],

  objetos: [
    { word: "llave", hint: "metal para abrir algo" },
    { word: "cuchara", hint: "utensilio para sopa" },
    { word: "telefono", hint: "comunicación a distancia" },
    { word: "linterna", hint: "luz portátil" },
    { word: "libro", hint: "leer" },
    { word: "reloj", hint: "mide el tiempo" },
    { word: "ordenador", hint: "máquina digital" },
    { word: "mochila", hint: "llevar cosas" },
    { word: "boligrafo", hint: "escribir sobre papel" },
    { word: "silla", hint: "para sentarse" },
    { word: "mesa", hint: "superficie plana" },
    { word: "televisor", hint: "ver programas" },
    { word: "ventilador", hint: "mover aire" },
    { word: "paraguas", hint: "protegerse de la lluvia" },
    { word: "cepillo", hint: "limpiar o peinar" },
    { word: "camara", hint: "captura imágenes" },
    { word: "auricular", hint: "sonido personal" },
    { word: "bolsa", hint: "transportar artículos" },
    { word: "almohada", hint: "apoyo para la cabeza" },
    { word: "linterna", hint: "ilumina en la oscuridad" }
  ],

  profesiones: [
    { word: "medico", hint: "salud" },
    { word: "policia", hint: "seguridad" },
    { word: "astronauta", hint: "espacio" },
    { word: "profesor", hint: "enseña" },
    { word: "carpintero", hint: "trabaja la madera" },
    { word: "piloto", hint: "conduce aviones" },
    { word: "cocinero", hint: "prepara comida" },
    { word: "enfermero", hint: "cuidado sanitario" },
    { word: "ingeniero", hint: "resuelve problemas técnicos" },
    { word: "abogado", hint: "leyes y juicios" },
    { word: "periodista", hint: "informa noticias" },
    { word: "arquitecto", hint: "diseña edificios" },
    { word: "mecanico", hint: "repara vehículos" },
    { word: "bombero", hint: "apaga incendios" },
    { word: "fotografo", hint: "captura imágenes" },
    { word: "electricista", hint: "trabaja con electricidad" },
    { word: "jardinero", hint: "cuida plantas" },
    { word: "farmaceutico", hint: "medicinas" },
    { word: "sastre", hint: "cose ropa" },
    { word: "barbero", hint: "corta el pelo" }
  ],

  naturaleza: [
    { word: "arbol", hint: "hojas y tronco" },
    { word: "rio", hint: "corriente de agua" },
    { word: "volcan", hint: "montaña que expulsa lava" },
    { word: "flor", hint: "colorida y fragante" },
    { word: "nube", hint: "en el cielo" },
    { word: "viento", hint: "aire en movimiento" },
    { word: "fuego", hint: "calor y llama" },
    { word: "bosque", hint: "muchos árboles" },
    { word: "cascada", hint: "agua que cae" },
    { word: "glaciar", hint: "hielo permanente" },
    { word: "oceano", hint: "gran masa de agua salada" },
    { word: "prado", hint: "hierba abierta" },
    { word: "cueva", hint: "hueco en la roca" },
    { word: "acantilado", hint: "roca junto al mar" },
    { word: "lluvia", hint: "gota desde el cielo" },
    { word: "relampago", hint: "luz en la tormenta" },
    { word: "granizo", hint: "precipitación de hielo" },
    { word: "estepa", hint: "llanura seca" },
    { word: "pantano", hint: "zona húmeda" },
    { word: "solar", hint: "relacionado con el sol" }
  ],

  tecnologia: [
    { word: "robot", hint: "máquina" },
    { word: "ordenador", hint: "digital" },
    { word: "internet", hint: "red global" },
    { word: "camara", hint: "imagen" },
    { word: "dron", hint: "vuelo" },
    { word: "impresora", hint: "papel" },
    { word: "microchip", hint: "pequeño y electrónico" },
    { word: "smartphone", hint: "teléfono avanzado" },
    { word: "aplicacion", hint: "programa" },
    { word: "servidor", hint: "almacena datos" },
    { word: "pantalla", hint: "muestra imágenes" },
    { word: "bateria", hint: "fuente de energía" },
    { word: "cable", hint: "conecta dispositivos" },
    { word: "bluetooth", hint: "conexión inalámbrica" },
    { word: "algoritmo", hint: "conjunto de reglas" },
    { word: "sensores", hint: "detectan cambios" },
    { word: "camara360", hint: "captura completa" },
    { word: "usb", hint: "conector" },
    { word: "router", hint: "distribuye red" },
    { word: "monitor", hint: "pantalla de ordenador" }
  ],

  peliculas: [
    { word: "titanic", hint: "drama y barco" },
    { word: "inception", hint: "sueños dentro de sueños" },
    { word: "godzilla", hint: "monstruo gigante" },
    { word: "gladiator", hint: "época romana" },
    { word: "matrix", hint: "realidad simulada" },
    { word: "avatar", hint: "mundo azul" },
    { word: "rocky", hint: "boxeo y superación" },
    { word: "casablanca", hint: "clásico romántico" },
    { word: "jaws", hint: "tiburón y playa" },
    { word: "elysium", hint: "futuro distópico" },
    { word: "et", hint: "amigo extraterrestre" },
    { word: "amadeus", hint: "música y biografía" },
    { word: "psicosis", hint: "suspense y baño" },
    { word: "up", hint: "globos y aventura" },
    { word: "frozen", hint: "princesas y hielo" },
    { word: "casper", hint: "fantasma amigable" },
    { word: "toy story", hint: "juguetes que cobran vida" },
    { word: "memento", hint: "memoria y notas" },
    { word: "el padrino", hint: "mafia y familia" },
    { word: "los intocables", hint: "prohibición y delincuencia" }
  ],

  paises: [
    { word: "españa", hint: "península ibérica" },
    { word: "francia", hint: "torre famosa" },
    { word: "japon", hint: "islas y tecnología" },
    { word: "brasil", hint: "carnaval y fútbol" },
    { word: "canada", hint: "clima frío y bosques" },
    { word: "australia", hint: "continente-isla" },
    { word: "egipto", hint: "pirámides" },
    { word: "india", hint: "diversidad cultural" },
    { word: "mexico", hint: "comida picante" },
    { word: "alemania", hint: "industria y cerveza" },
    { word: "italia", hint: "cultura y pasta" },
    { word: "china", hint: "gran población" },
    { word: "rusia", hint: "extensión enorme" },
    { word: "argentina", hint: "tango y asado" },
    { word: "grecia", hint: "antigua y mitos" },
    { word: "turquia", hint: "puente entre continentes" },
    { word: "sudafrica", hint: "diversidad y safaris" },
    { word: "noruega", hint: "fiordos" },
    { word: "islandia", hint: "paisaje volcánico" },
    { word: "tailandia", hint: "playas y templos" }
  ],

  deportes: [
    { word: "futbol", hint: "balón y estadio" },
    { word: "baloncesto", hint: "canasta y dribling" },
    { word: "tenis", hint: "raqueta" },
    { word: "natacion", hint: "piscina" },
    { word: "ciclismo", hint: "bicicleta" },
    { word: "boxeo", hint: "combate con guantes" },
    { word: "golf", hint: "hoyo y palo" },
    { word: "billar", hint: "bola y taco" },
    { word: "rugby", hint: "balón ovalado" },
    { word: "hockey", hint: "palo y disco/bola" },
    { word: "atletismo", hint: "carreras y salto" },
    { word: "esqui", hint: "nieve y pendientes" },
    { word: "surf", hint: "ola y tabla" },
    { word: "voleibol", hint: "red y remates" },
    { word: "esgrima", hint: "espada y duelo" },
    { word: "cricket", hint: "bat y campo" },
    { word: "boxeo", hint: "ring y rounds" },
    { word: "maraton", hint: "larga distancia" },
    { word: "triathlon", hint: "natación bici carrera" },
    { word: "skate", hint: "tabla y rampa" }
  ],

  hogar: [
    { word: "nevera", hint: "conserva comida fría" },
    { word: "sofá", hint: "sentarse y relajarse" },
    { word: "cama", hint: "dormir" },
    { word: "microondas", hint: "calentar rápido" },
    { word: "horno", hint: "hornear y cocinar" },
    { word: "lavadora", hint: "limpia ropa" },
    { word: "espalda", hint: "parte del cuerpo" }, // intentional variety
    { word: "cortina", hint: "tapado de ventanas" },
    { word: "alfombra", hint: "cubierta del suelo" },
    { word: "espejo", hint: "reflejo" },
    { word: "planta", hint: "verde en maceta" },
    { word: "lavabo", hint: "lavarse las manos" },
    { word: "grifos", hint: "agua que sale" },
    { word: "cuadro", hint: "decoración de pared" },
    { word: "armario", hint: "guardar ropa" },
    { word: "colchón", hint: "soporte para dormir" },
    { word: "toalla", hint: "secarse" },
    { word: "jabón", hint: "limpieza" },
    { word: "plato", hint: "recipiente para comer" },
    { word: "tostadora", hint: "tuesta pan" }
  ],

  conceptos: [
    { word: "amor", hint: "sentimiento fuerte" },
    { word: "libertad", hint: "ausencia de restricciones" },
    { word: "tiempo", hint: "medida y experiencia" },
    { word: "felicidad", hint: "estado de ánimo positivo" },
    { word: "miedo", hint: "emoción ante peligro" },
    { word: "memoria", hint: "recordar" },
    { word: "justicia", hint: "equidad" },
    { word: "ciencia", hint: "estudio sistemático" },
    { word: "arte", hint: "expresión creativa" },
    { word: "cultura", hint: "prácticas de una sociedad" },
    { word: "economia", hint: "recursos y dinero" },
    { word: "filosofia", hint: "pensamiento crítico" },
    { word: "educacion", hint: "proceso de aprendizaje" },
    { word: "tecnologia", hint: "herramientas avanzadas" },
    { word: "identidad", hint: "quién eres" },
    { word: "esperanza", hint: "expectativa positiva" },
    { word: "confianza", hint: "fe en alguien" },
    { word: "creatividad", hint: "generar ideas nuevas" },
    { word: "responsabilidad", hint: "cumplir con obligaciones" },
    { word: "cambio", hint: "transformación" }
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

    chosenPair = chooseWord();


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
   selección de palabra inteligente
   ------------------------------ */
function chooseWord() {
  const categorySelect = document.getElementById("categorySelect");
  const selectedCategory = categorySelect.value;

  let categoryWords;

  if (selectedCategory === "aleatorio") {
    const allCategories = Object.keys(CATEGORIES);
    const randomCat = allCategories[Math.floor(Math.random() * allCategories.length)];
    categoryWords = CATEGORIES[randomCat];
    console.log("Categoría aleatoria elegida:", randomCat);
  } else {
    categoryWords = CATEGORIES[selectedCategory];
    console.log("Categoría seleccionada:", selectedCategory);
  }

  const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
  console.log("Palabra elegida:", randomWord);
  return randomWord;
}

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
    
      // 🎉 Efecto multicolor y confeti
  triggerCelebration();
    
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
