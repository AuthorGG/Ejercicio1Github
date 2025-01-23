"use strict";

const palabrasPorCategoria = {
  animales: ["perro", "gato", "murcielago", "elefante", "tigre"],
  objetos: ["botella", "escritorio", "paraguas", "televisor", "laptop"],
  lugares: ["playa", "desierto", "montaña", "bosque", "ciudad"],
};

let listaDePalabras = [];
const palabraOcultaDiv = document.getElementById("palabra-oculta");
const intentosRestantesDiv = document.getElementById("intentosRestantes");
const botonesTeclado = document.querySelectorAll(".tecla");

let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let intentosRestantes = 6;

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("close-modal");
  const categoriaSeleccion = document.getElementById("categoria-seleccion");

  // Mostrar el modal al cargar
  modal.style.display = "flex";

  // Cerrar el modal y seleccionar categoría
  closeModalButton.addEventListener("click", () => {
    const categoriaElegida = categoriaSeleccion.value;
    listaDePalabras = palabrasPorCategoria[categoriaElegida];
    modal.style.display = "none";
    prepJuego(); // Inicia el juego
  });
});

botonesTeclado.forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.textContent;
    if (palabraAdivinar.includes(letra)) {
      boton.classList.add("correcta");
      boton.classList.remove("tecla");
    } else {
      boton.classList.add("incorrecta");
      boton.classList.remove("tecla");
    }

    boton.disabled = true;
    procesarLetra(letra);
  });
  botonesTeclado.forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  });
});

// Función para mostrar el popup
function mostrarPopup(mensaje) {
  const popup = document.getElementById("mensaje-popup");
  const mensajeResultado = document.getElementById("mensaje-resultado");
  const cerrarPopup = document.getElementById("cerrar-popup");

  mensajeResultado.textContent = mensaje;
  popup.style.display = "flex";

  cerrarPopup.addEventListener("click", () => {
    popup.style.display = "none";
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
  if (palabraAdivinar.includes(letra)) {
    palabraAdivinar.forEach((letr, index) => {
      if (letr === letra) {
        palabraMostrar[index] = letra;
      }
    });
    actualizarPalabra();

    if (palabraMostrar.join("") === palabraAdivinar.join("")) {
      mostrarPopup("¡Enhorabuena! ¡Has acertado! 🎉");
      finalizarJuego();
      reiniciarJuego();
    }
  } else {
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
      finalizarJuego();
      reiniciarJuego();
    }
  }
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
  // const modal = document.getElementById("modal");
  // modal.style.display = "flex";
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
  const closeModalButton = document.getElementById("close-modal");

  // Mostrar el modal
  modal.style.display = "flex";

  // Cerrar el modal al hacer clic en el botón
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    prepJuego(); // Inicia el juego
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
}
