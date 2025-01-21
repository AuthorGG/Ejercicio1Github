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

function procesarLetra(letra) {
  if (palabraAdivinar.includes(letra)) {
    palabraAdivinar.forEach((letr, index) => {
      if (letr === letra) {
        palabraMostrar[index] = letra;
      }
    });
    actualizarPalabra();
  } else {
    intentosRestantes--;
    logLetrasUser.push(letra);
    actualizarIntentos();
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

function mostrarLineas(palabra) {
  palabraOcultaDiv.innerHTML = "";
  palabra.forEach(() => {
    const letraDiv = document.createElement("div");
    letraDiv.classList.add("letra");
    letraDiv.textContent = "";
    palabraOcultaDiv.appendChild(letraDiv);
  });
}

function actualizarIntentos() {
  intentosRestantesDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
}

botonInicio.addEventListener("click", prepJuego); //al hacerle click al botón con clase Inicio genera una palabra y empieza el juego

botonReiniciar.addEventListener("click", reiniciarJuego);
