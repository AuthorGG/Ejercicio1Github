"use strict";

const listaDePalabras = ["botella", "escritorio", "paraguas", "chimpance"];
const palabraOcultaDiv = document.getElementById("palabra-oculta");
const intentosRestantesDiv = document.getElementById("intentosRestantes");
const botonesTeclado = document.querySelectorAll(".tecla");

let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let intentosRestantes = 6;
let botonInicio = document.querySelector("#inicio");
let botonReiniciar = document.querySelector("#reinicio");
console.log(botonReiniciar);

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
    boton.disabled = false; // Habilita el botón
    boton.classList.remove("correcta", "incorrecta"); // Elimina las clases de estilo
  });
});

// function procesarLetra(letra) {
//   if (palabraAdivinar.includes(letra)) {
//     palabraAdivinar.forEach((letr, index) => {
//       if (letr === letra) {
//         palabraMostrar[index] = letra;
//       }
//     });
//     actualizarPalabra();
//   } else {
//     if (intentosRestantes > 0) {
//       intentosRestantes--;
//       logLetrasUser.push(letra);
//       actualizarIntentos();
//       enseñarAhorcado();
//     }
//     if (intentosRestantes === 0) {
//       alert("LO SIENTO! NO HAY MÁS INTENTOS!");
//     }
//   }
// }

function procesarLetra(letra) {
  if (palabraAdivinar.includes(letra)) {
    palabraAdivinar.forEach((letr, index) => {
      if (letr === letra) {
        palabraMostrar[index] = letra;
      }
    });
    actualizarPalabra();

    if (palabraMostrar.join("") === palabraAdivinar.join("")) {
      alert("ENHORABUENA!! HAS ACERTADO!!");
      finalizarJuego(); // Detener el juego al acertar
    }
  } else {
    if (intentosRestantes > 0) {
      intentosRestantes--;
      logLetrasUser.push(letra);
      actualizarIntentos();
      enseñarAhorcado();
    }

    if (intentosRestantes === 0) {
      alert(
        `LO SIENTO! NO HAY MÁS INTENTOS. LA PALABRA ERA: ${palabraAdivinar.join(
          ""
        )}`
      );
      finalizarJuego();
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

  botonesTeclado.forEach((boton) => {
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
    boton.classList.add("tecla");
  });
  mostrarLineas(palabraAdivinar);
  actualizarIntentos();
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

  // botonesTeclado.forEach((boton) => {
  //   boton.disabled = false;
  //   boton.classList.remove("correcta", "incorrecta");
  //   boton.classList.add("tecla");
  // });
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

botonInicio.addEventListener("click", prepJuego); //al hacerle click al botón con clase Inicio genera una palabra y empieza el juego

botonReiniciar.addEventListener("click", reiniciarJuego);
