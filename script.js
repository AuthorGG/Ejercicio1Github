"use strict";

const palabrasPorCategoria = {
  simpsons: [
    "Homer",
    "Lisa",
    "Marge",
    "Bart",
    "Maggie",
    "Barney",
    "Moe",
    "Otto",
    "Ralph",
    "Nelson",
    "Seymour",
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

// elementos del DOM
const palabraOcultaDiv = document.getElementById("palabra-oculta");
const intentosRestantesDiv = document.getElementById("intentosRestantes");
const botonesTeclado = document.querySelectorAll(".tecla");
const audioVictoria = document.getElementById("audioVictoria");
const audioDerrota = document.getElementById("audioDerrota");
const tituloCategoria = document.getElementById("titulo-categoria");

// variables globales
let listaDePalabras = [];
let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let intentosRestantes = 8;

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
  modal.style.display = "flex";

  // Cerrar el modal y seleccionar categoría
  closeModalButton.addEventListener("click", () => {
    const categoriaElegida = categoriaSeleccion.value;
    if (!palabrasPorCategoria[categoriaElegida]) {
      alert("Categoría no válida. Por favor, selecciona una categoría válida.");
      return;
    }
    listaDePalabras = palabrasPorCategoria[categoriaElegida];
    tituloCategoria.textContent = categoriaElegida.toUpperCase();
    modal.style.display = "none";
    mainContent.classList.remove("hidden");
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
  mensajeResultado.innerHTML = mensaje;
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
      audioVictoria.volume = 0.6; // Ajustar el volumen
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
      mostrarAhorcado();
    }

    if (intentosRestantes === 0) {
      setTimeout(() => {
        mostrarPopup(
          `¡Lo siento! No hay más intentos. 😞 La palabra oculta era: <strong>${palabraAdivinar.join(
            ""
          )}</strong>`
        );
        audioDerrota.play();
        audioDerrota.volume = 0.6;
        finalizarJuego();
        reiniciarJuego();
      }, 200);
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

function mostrarAhorcado() {
  const partes = document.querySelectorAll(".parte");
  partes.forEach((parte) => (parte.style.display = "none"));
  const indice = 8 - intentosRestantes;
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
  intentosRestantes = 8;
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  const palabraAleatoria = listaDePalabras[pickListaPalabras].toUpperCase();
  palabraAdivinar = palabraAleatoria.split("");
  palabraMostrar = Array(palabraAdivinar.length).fill("");
  let letrasCorrectas = Array(palabraAdivinar.length).fill("");

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
  intentosRestantes = 8;
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  const palabraAleatoria = listaDePalabras[pickListaPalabras].toUpperCase();
  console.log(pickListaPalabras);
  palabraAdivinar = palabraAleatoria.split("");
  palabraMostrar = Array(palabraAdivinar.length).fill("");
  console.log(palabraAdivinar);
  let letrasCorrectas = Array(palabraAdivinar.length).fill("");
  console.log(letrasCorrectas);

  mostrarLineas(palabraAdivinar);
  actualizarIntentos();

  const partesAhorcado = document.querySelectorAll("#ahorcado .parte");
  partesAhorcado.forEach((parte, index) => {
    if (index === 0) {
      // Solo mostramos la BASE
      parte.style.display = "block";
    } else {
      parte.style.display = "none";
    }
  });
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
  partesAhorcado.forEach((parte, index) => {
    if (index === 0) {
      parte.style.display = "block"; // Muestra la base
    } else {
      parte.style.display = "none"; // Oculta el resto
    }
  });
}

const audioPorCategoria = {
  simpsons: "resources/audios/simpsons.mp3",
  digimon: "resources/audios/digimon.mp3",
  pokemon: "resources/audios/pokemon.mp3",
};
