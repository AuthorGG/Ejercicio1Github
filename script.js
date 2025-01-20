"use strict";

const listaDePalabras = ["botella", "escritorio", "paraguas", "chimpance"];
const palabraOcultaDiv = document.getElementById("palabraOculta");
const intentosRestantesDiv = document.getElementById("intentosRestantes");

let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let intentosRestantes = 6;

let palabrasPorGuiones = function prepJuego() {
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  console.log(pickListaPalabras);
  const palabraAleatoria = listaDePalabras[pickListaPalabras].toUpperCase();
  console.log(palabraAleatoria);
  let palabraAdivinar = palabraAleatoria.split("");
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
=======
  palabraAdivinar = palabraAleatoria.split("");
};

