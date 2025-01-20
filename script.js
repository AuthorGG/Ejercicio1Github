"use strict";

const listaDePalabras = ["botella", "escritorio", "paraguas", "chimpance"];
const palabraOcultaDiv = document.getElementById("palabra-oculta");
const intentosRestantesDiv = document.getElementById("intentosRestantes");
const botonesTeclado = document.querySelectorAll(".tecla");


let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let intentosRestantes = 6;

botonesTeclado.forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.textContent;
    procesarLetra(letra);
    boton.disabled = true;
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

function prepJuego() {
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  console.log(pickListaPalabras);
  const palabraAleatoria = listaDePalabras[pickListaPalabras].toUpperCase();
  console.log(palabraAleatoria);
  palabraAdivinar = palabraAleatoria.split("");
  console.log(palabraAdivinar);
  let letrasCorrectas = Array(palabraAdivinar.length).fill("");
  console.log(letrasCorrectas);
  mostrarLineas(palabraAdivinar);
  actualizarIntentos();
}
prepJuego();

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
