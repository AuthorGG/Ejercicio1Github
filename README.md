Instrucciones del juego

Al hacer click en "Generar palabra", se generará una palabra aleatoria oculta.

Haz clic en las letras del teclado virtual para intentar adivinar la palabra.

Cada letra correcta se mostrará en su posición correspondiente.

Cada letra incorrecta reducirá el número de intentos restantes y se mostrará en una lista de "letras usadas".

El juego terminará cuando:

Descubras todas las letras de la palabra (Ganaste).

Te quedes sin intentos (Has perdido).

@media (max-width: 800px) {
#ahorcado {
width: 120px;
height: 200px;
}

.palabra-oculta div {
font-size: 28px;
width: 40px;
height: 40px;
}

#teclado .tecla {
width: 45px;
height: 45px;
font-size: 20px;
}

#titulo-categoria {
font-size: 24px;
}

main {
gap: 15px;
}

.modal-content {
padding: 15px;
font-size: 14px;
}
}

@media (max-width: 600px) {
#ahorcado {
width: 100px;
height: 180px;
}

.palabra-oculta div {
font-size: 24px;
width: 35px;
height: 35px;
}

#teclado .tecla {
width: 40px;
height: 40px;
font-size: 18px;
}

#titulo-categoria {
font-size: 20px;
}

main {
gap: 10px;
padding: 10px;
}

.modal-content {
padding: 10px;
font-size: 12px;
}

.popup-contenido p {
font-size: 14px;
}

#cerrar-popup {
font-size: 12px;
padding: 6px 12px;
}

#boton-silenciar {
font-size: 18px;
padding: 8px;
}
}
