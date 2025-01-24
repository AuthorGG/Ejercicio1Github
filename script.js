"use strict";

const palabrasPorCategoria = {
  simpsons: [
    "Homer",
    "lisa",
    "Marge",
    "Bart",
    "Maggie",
    "Barney",
    "Moe",
    "Otto",
    "Ralph",
    "Nelson",
    "Seymour",
    "Milhouse",
    "Apu",
    "Krusty",
    "Lenny",
    "Carl",
    "Ned",
    "Maude",
    "Edna",
    "Patty",
    "Selma",
    "Montgomery",
  ],
  digimon: [
    "Agumon",
    "Gabumon",
    "Patamon",
    "Tentomon",
    "Biyomon",
    "Gatomon",
    "Greymon",
    "Angemon",
    "MetalGarurumon",
    "Gomamon",
    "Palmon",
    "kabuterimon",
  ],
  pokemon: [
    "Pikachu",
    "Charmander",
    "Bulbasaur",
    "Squirtle",
    "Eevee",
    "Jigglypuff",
    "Snorlax",
    "Mewtwo",
    "Gengar",
  ],
};

//elementos del DOM
const palabraOcultaDiv = document.getElementById("palabra-oculta");
const intentosRestantesDiv = document.getElementById("intentosRestantes");
const botonesTeclado = document.querySelectorAll(".tecla");
const audioVictoria = document.getElementById("audioVictoria");
const audioDerrota = document.getElementById("audioDerrota");
//variables globales
let listaDePalabras = [];
let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let intentosRestantes = 6;

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  mainContent.classList.add("hidden");
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("modal-iniciar-juego");
  const audioElemento = document.getElementById("audio-categoria");
  const botonSilenciar = document.getElementById("boton-silenciar");
  const teclado = document.getElementById("teclado");
  teclado.style.display = "none";
  const categoriaSeleccion = document.getElementById("categoria-seleccion");
  let audioSilenciado = false;

  const alternarAudio = () => {
    if (audioSilenciado) {
      audioElemento.muted = false;
      botonSilenciar.textContent = "🔊";
    } else {
      audioElemento.muted = true;
      botonSilenciar.textContent = "🔇";
    }
    audioSilenciado = !audioSilenciado;
  };
  // Mostrar el modal al cargar
  modal.style.display = "block";

  // Cerrar el modal y seleccionar categoría
  closeModalButton.addEventListener("click", () => {
    const categoriaElegida = categoriaSeleccion.value;
    listaDePalabras = palabrasPorCategoria[categoriaElegida];
    modal.style.display = "none";
    mainContent.classList.remove("hidden");
    modal.style.display = "none";
    teclado.style.display = "flex";
    botonSilenciar.classList.remove("hidden");
    botonSilenciar.classList.add("boton-silenciar");

    if (audioPorCategoria[categoriaElegida]) {
      audioElemento.src = audioPorCategoria[categoriaElegida];
      audioElemento.play();
      audioElemento.loop = true; // Hacer que el audio se repita
    }
    reiniciarTeclado();
    prepJuego(); // Inicia el juego
  });
  botonSilenciar.classList.remove("hidden");

  botonSilenciar.addEventListener("click", alternarAudio);
});

botonesTeclado.forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.textContent;
    boton.disabled = true; // Deshabilita el botón al usarlo
    procesarLetra(letra);
  });
});

// Función para reiniciar el estado de los botones
function reiniciarTeclado() {
  const botonesTeclado = document.querySelectorAll(".tecla");
  botonesTeclado.forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });
}

// Función para mostrar el popup
function mostrarPopup(mensaje) {
  const popup = document.getElementById("mensaje-popup");
  const mensajeResultado = document.getElementById("mensaje-resultado");
  const cerrarPopup = document.getElementById("cerrar-popup");
  const audioElemento = document.getElementById("audio-categoria");

  if (!audioElemento.paused) {
    audioElemento.pause();
    audioElemento.currentTime = 0; // Reinicia el audio
  }

  mensajeResultado.textContent = mensaje;
  popup.style.display = "flex";

  cerrarPopup.addEventListener("click", () => {
    popup.style.display = "none";
    audioVictoria.pause();
    audioVictoria.currentTime = 0;
    audioDerrota.pause();
    audioDerrota.currentTime = 0;
    mostrarModalInicial();
  });
}

function mostrarModalInicial() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
}
// Cerrar el popup si está abierto
const popup = document.getElementById("mensaje-popup");
popup.style.display = "none";

document.addEventListener("keydown", (evento) => {
  const letraPresionada = evento.key.toUpperCase();
  const botonCorrespondiente = Array.from(botonesTeclado).find(
    (boton) => boton.textContent === letraPresionada
  );

  if (botonCorrespondiente && !botonCorrespondiente.disabled) {
    procesarLetra(letraPresionada, botonCorrespondiente);
  }
});

function procesarLetra(letra) {
  const botonCorrespondiente = Array.from(botonesTeclado).find(
    (boton) => boton.textContent === letra
  );

  if (palabraAdivinar.includes(letra)) {
    // Añade la clase correcta al botón
    if (botonCorrespondiente) botonCorrespondiente.classList.add("correcta");

    palabraAdivinar.forEach((letr, index) => {
      if (letr === letra) {
        palabraMostrar[index] = letra;
      }
    });
    actualizarPalabra();

    if (palabraMostrar.join("") === palabraAdivinar.join("")) {
      mostrarPopup("¡Enhorabuena! ¡Has acertado! 🎉");
      audioVictoria.play();
      audioVictoria.volume = 0.8; // Ajustar el volumen

      finalizarJuego();
      reiniciarJuego();
    }
  } else {
    // Añade la clase incorrecta al botón
    if (botonCorrespondiente) botonCorrespondiente.classList.add("incorrecta");

    if (intentosRestantes > 0) {
      intentosRestantes--;
      logLetrasUser.push(letra);
      actualizarIntentos();
      enseñarAhorcado();
    }

    if (intentosRestantes === 0) {
      mostrarPopup(
        `¡Lo siento! No hay más intentos. 😞 La palabra oculta era: ${palabraAdivinar.join(
          ""
        )}`
      );
      audioDerrota.play();
      audioDerrota.volume = 0.8;
      finalizarJuego();
      reiniciarJuego();
    }
  }

  // Deshabilita el botón tras usarlo
  if (botonCorrespondiente) botonCorrespondiente.disabled = true;
}

function finalizarJuego() {
  botonesTeclado.forEach((boton) => {
    boton.disabled = true;
  });
}

function enseñarAhorcado() {
  const partes = document.querySelectorAll(".parte");
  const indice = 5 - intentosRestantes;
  partes.forEach((parte) => (parte.style.display = "none"));
  if (indice >= 0 && indice < partes.length) {
    partes[indice].style.display = "block";
  }
}

function actualizarPalabra() {
  const letrasDivs = document.querySelectorAll(".palabra-oculta div");
  palabraMostrar.forEach((letr, index) => {
    letrasDivs[index].textContent = letr;
  });
}
function reiniciarJuego() {
  intentosRestantes = 6;
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  console.log(pickListaPalabras);
  const palabraAleatoria = listaDePalabras[pickListaPalabras].toUpperCase();
  console.log(palabraAleatoria);
  palabraAdivinar = palabraAleatoria.split("");
  palabraMostrar = Array(palabraAdivinar.length).fill("");
  console.log(palabraAdivinar);
  let letrasCorrectas = Array(palabraAdivinar.length).fill("");
  console.log(letrasCorrectas);

  botonesTeclado.forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
    boton.classList.add("tecla");
  });
  mostrarLineas(palabraAdivinar);
  actualizarIntentos();
  reiniciarAhorcado();
}

function prepJuego() {
  intentosRestantes = 6;
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  console.log(pickListaPalabras);
  const palabraAleatoria = listaDePalabras[pickListaPalabras].toUpperCase();
  console.log(palabraAleatoria);
  palabraAdivinar = palabraAleatoria.split("");
  palabraMostrar = Array(palabraAdivinar.length).fill("");
  console.log(palabraAdivinar);
  let letrasCorrectas = Array(palabraAdivinar.length).fill("");
  console.log(letrasCorrectas);

  mostrarLineas(palabraAdivinar);
  actualizarIntentos();
}

function mostrarLineas(palabra) {
  palabraOcultaDiv.innerHTML = "";
  palabra.forEach(() => {
    const letraDiv = document.createElement("div");
    letraDiv.classList.add("letra");
    letraDiv.textContent = "";
    palabraOcultaDiv.appendChild(letraDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("modal-iniciar-juego");

  // Mostrar el modal
  modal.style.display = "flex";

  // Cerrar el modal al hacer clic en el botón
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";

    reiniciarTeclado();
    prepJuego();
  });
});

function actualizarIntentos() {
  intentosRestantesDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
}
function reiniciarAhorcado() {
  const partesAhorcado = document.querySelectorAll("#ahorcado .parte");
  partesAhorcado.forEach((parte) => {
    parte.style.display = "none"; // Oculta cada parte
  });
  prepJuego(); // Inicia el juego
}

const audioPorCategoria = {
  simpsons: "resources/audios/simpsons.mp3",
  digimon: "resources/audios/digimon.mp3",
  pokemon: "resources/audios/pokemon.mp3",
};

function gameOver() {
  if (document.querySelector(".state-nodisplay") != null) {
    let gameOver = document.querySelector(".state-nodisplay");
    gameOver.classList.remove("state-nodisplay");

    const game = document.createElement("div");
    game.textContent = "GAME"; /*palabra[i].toUpperCase()*/

    const over = document.createElement("div");
    over.textContent = "OVER"; /*palabra[i].toUpperCase()*/

    gameOver.append(game);
    gameOver.append(over);

    gameOver.classList.add("stateAnimation", "gameOver");

    window.endgame = true;
    play("audio/lose.mp3");
  }
  return;
}
