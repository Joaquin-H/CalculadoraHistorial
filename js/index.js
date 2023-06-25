const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const historial = document.querySelector(".btnH");
const panelH = document.querySelector(".panelH");
const maxResultados = 10; // Número máximo de resultados en el historial
let historialR = [];
let historialO = [];
let historialV = false;

function Inicio() {
historial.addEventListener("click", () => {
    if (historialV) {
    ActualizarH(historialO);
    panelH.classList.remove("show");
    } else {
    panelH.classList.add("show");
    ActualizarH(historialR);
    }
    historialV = !historialV;
});

botones.forEach(boton => {
    boton.addEventListener("click", () => {
    const seleccion = boton.textContent;
    realizarOperacion(seleccion);
    });
});

document.addEventListener("keydown", (event) => {
    const teclaPresionada = event.key;
    const botonCorrespondiente = Array.from(botones).find(boton => boton.textContent === teclaPresionada);
    if(teclaPresionada === "Backspace"){
        realizarOperacion("←");
    }
    if(teclaPresionada === "Enter"){
        realizarOperacion("=");
    }
    if (botonCorrespondiente) {
    realizarOperacion(botonCorrespondiente.textContent);
    }
});
}

function realizarOperacion(seleccion) {
if (seleccion === "C") {
    pantalla.textContent = "0";
    return;
}

if (seleccion === "←") {
    if (pantalla.textContent.length === 1 || pantalla.textContent === "ERROR!") {
    pantalla.textContent = "0";
    } else {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
    }
    return;
}

if (seleccion === "=") {
    try {
    let resultado = eval(pantalla.textContent);
    if (isNaN(resultado) || resultado === Infinity) {
        pantalla.textContent = "ERROR!";
    } else {
        pantalla.textContent = resultado;
        historialR.push(pantalla.textContent);
        if (historialR.length > maxResultados) {
          historialR.shift(); // Elimina el primer valor si se supera el límite
        }
        if (historialV) {
        ActualizarH(historialR);
        }
    }
    } catch {
    pantalla.textContent = "ERROR!";
    }
    return;
}

if (pantalla.textContent === "0" || pantalla.textContent === "ERROR!") {
    pantalla.textContent = seleccion;
} else {
    pantalla.textContent += seleccion;
}
}

function ActualizarH(h) {
  panelH.innerHTML = ""; // Limpia el contenido anterior del historial

for (let i = 0; i < h.length; i++) {
    const operation = h[i];
    const operationElement = document.createElement("p");
    operationElement.textContent = operation;
    panelH.appendChild(operationElement);
}
}

Inicio();
