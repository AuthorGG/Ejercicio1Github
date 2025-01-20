"use strict";

const listaDePalabras = ["botella", "escritorio", "paraguas", "chimpance"];

let palabraAdivinar = [];
let palabraMostrar = [];
let logLetrasUser = [];
let numIntentos = 6; //por decir un numero

function prepJuego() {
  let pickListaPalabras = Math.floor(Math.random() * listaDePalabras.length);
  console.log(pickListaPalabras);
  let palabraAleatoria = listaDePalabras[pickListaPalabras];
  console.log(palabraAleatoria);

  palabraAdivinar = palabraAleatoria.split("");
}
